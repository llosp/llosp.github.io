#!/usr/bin/env node
// generates /index.html and /work/<slug>/index.html from content/.
// zero dependencies, run with: node tools/build.mjs
// see CONTENT_GUIDE.md for the authoring format.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const todos = [];
const warnings = [];

/* ── text helpers ─────────────────────────────────────────────────────── */

// a windows checkout turns the content files into crlf, and the parsers
// below split on \n
const readSource = (file) => readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// a [todo: ...] in the source becomes both an html comment (so it is greppable
// in the output) and a highlighted mark (so it cannot ship unnoticed).
function renderTodos(escaped, where) {
  return escaped.replace(/\[todo:\s*([^\]]+)\]/g, (_, body) => {
    const text = body.trim();
    todos.push({ where, text });
    return `<!-- TODO(pedro): ${text} --><mark class="todo">[todo: ${text}]</mark>`;
  });
}

// deliberately tiny inline markdown: todo markers, links, bold, code.
// em dashes are rejected at build time rather than silently rendered.
function inline(src, where = '') {
  if (src == null) return '';
  if (String(src).includes('—')) {
    warnings.push(`em dash in ${where || 'content'}: ${String(src).slice(0, 60)}`);
  }
  let out = renderTodos(escapeHtml(src), where);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const external = /^https?:/.test(href);
    const attrs = external ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${href}"${attrs}>${label}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  return out;
}

function paragraphs(src, where) {
  return String(src)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      if (p.startsWith('- ')) {
        const items = p
          .split('\n')
          .map((l) => l.replace(/^-\s*/, '').trim())
          .filter(Boolean)
          .map((l) => `<li>${inline(l, where)}</li>`)
          .join('\n');
        return `<ul class="prose-list">\n${items}\n</ul>`;
      }
      return `<p>${inline(p.replace(/\n/g, ' '), where)}</p>`;
    })
    .join('\n');
}

/* ── parsing ──────────────────────────────────────────────────────────── */

function parseFrontmatter(src, where) {
  const match = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) throw new Error(`${where}: missing frontmatter`);
  const data = {};
  for (const line of match[1].split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const kv = line.match(/^([a-z0-9_]+):\s?(.*)$/);
    if (!kv) throw new Error(`${where}: cannot parse frontmatter line "${line}"`);
    data[kv[1]] = kv[2].trim();
  }
  return { data, body: src.slice(match[0].length) };
}

// inside a ::: block, `key: value` starts a field and any following
// unprefixed lines append to it, so prose and diffs can span lines.
function parseFields(text) {
  const fields = {};
  let current = null;
  for (const line of text.split('\n')) {
    const kv = line.match(/^([a-z0-9_]+):\s?(.*)$/);
    if (kv) {
      current = kv[1];
      fields[current] = kv[2];
    } else if (current !== null) {
      fields[current] += '\n' + line;
    }
  }
  for (const key of Object.keys(fields)) fields[key] = fields[key].trim();
  return fields;
}

function splitSections(body) {
  const sections = [];
  const lines = body.split('\n');
  let current = null;
  for (const line of lines) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      current = { name: heading[1].trim(), text: '' };
      sections.push(current);
    } else if (current) {
      current.text += line + '\n';
    }
  }
  return sections;
}

function splitBlocks(text) {
  const parts = [];
  const lines = text.split('\n');
  let buffer = [];
  let block = null;

  const flushProse = () => {
    const prose = buffer.join('\n').trim();
    if (prose) parts.push({ kind: 'prose', text: prose });
    buffer = [];
  };

  for (const line of lines) {
    const open = line.match(/^:::\s*([a-z-]+)\s*(.*)$/);
    if (block === null && open) {
      flushProse();
      block = { kind: 'block', type: open[1], arg: open[2].trim(), lines: [] };
      continue;
    }
    if (block !== null && /^:::\s*$/.test(line)) {
      block.fields = parseFields(block.lines.join('\n'));
      delete block.lines;
      parts.push(block);
      block = null;
      continue;
    }
    if (block !== null) block.lines.push(line);
    else buffer.push(line);
  }
  if (block !== null) throw new Error('unclosed ::: block');
  flushProse();
  return parts;
}

/* ── media ────────────────────────────────────────────────────────────── */

const SHAPES = new Set(['wide', 'landscape', 'portrait', 'square', 'natural']);

function assetExists(src) {
  if (!src || src.startsWith('http')) return true;
  return existsSync(join(root, src.replace(/^\//, '')));
}

// the index covers sit at the shape of their own image rather than in one
// fixed box, which is what staggers the two columns. the shape is read out
// of the file so that swapping a cover never also means editing a number in
// the frontmatter. webp only, which is what the guide asks for anyway.
const sizeCache = new Map();

function webpSize(file) {
  let buf;
  try {
    buf = readFileSync(file);
  } catch {
    return null;
  }
  if (buf.length < 30) return null;
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null;

  const tag = buf.toString('ascii', 12, 16);
  // the three webp flavours each keep the size somewhere else
  if (tag === 'VP8X') return { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1 };
  if (tag === 'VP8 ') return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  if (tag === 'VP8L') {
    const bits = buf.readUInt32LE(21);
    return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
  }
  return null;
}

// webm keeps the pixel size inside Segment > Tracks > TrackEntry > Video, as
// two plain elements (0xB0 width, 0xBA height). a tiny EBML walk is enough to
// find them, so a video cover also keeps the shape of its own frames.
function webmSize(file) {
  let buf;
  try {
    buf = readFileSync(file);
  } catch {
    return null;
  }
  const readId = (pos) => {
    const first = buf[pos];
    if (first === undefined) return null;
    let len = 1;
    while (len <= 4 && !(first & (0x80 >> (len - 1)))) len++;
    if (len > 4) return null;
    let id = 0;
    for (let i = 0; i < len; i++) id = id * 256 + buf[pos + i];
    return { id, len };
  };
  const readSize = (pos) => {
    const first = buf[pos];
    if (first === undefined) return null;
    let len = 1;
    while (len <= 8 && !(first & (0x80 >> (len - 1)))) len++;
    if (len > 8) return null;
    let val = first & (0xff >> len);
    for (let i = 1; i < len; i++) val = val * 256 + buf[pos + i];
    const unknown = val === Math.pow(2, 7 * len) - 1;
    return { size: unknown ? Infinity : val, len };
  };
  const PARENTS = new Set([0x18538067, 0x1654ae6b, 0xae, 0xe0]);
  let w = null;
  let h = null;
  const walk = (start, end) => {
    let pos = start;
    while (pos < end && w === null || pos < end && h === null) {
      const id = readId(pos);
      if (!id) return;
      const sz = readSize(pos + id.len);
      if (!sz) return;
      const body = pos + id.len + sz.len;
      const stop = Math.min(end, body + sz.size);
      if (PARENTS.has(id.id)) walk(body, stop);
      else if (id.id === 0xb0) w = buf.readUIntBE(body, sz.size);
      else if (id.id === 0xba) h = buf.readUIntBE(body, sz.size);
      if (w !== null && h !== null) return;
      pos = stop;
    }
  };
  const head = readId(0);
  const headSize = head && readSize(head.len);
  if (!head || !headSize || head.id !== 0x1a45dfa3) return null;
  walk(head.len + headSize.len + headSize.size, buf.length);
  return w && h ? { w, h } : null;
}

// a missing file or one this cannot parse (an mp4, say) falls back to
// the ratio the case study hero uses, so a frame is never zero height.
function coverRatio(data) {
  if (data.cover_ratio) return data.cover_ratio;
  if (!data.cover || !assetExists(data.cover) || !/\.(webp|webm)$/i.test(data.cover)) return '16 / 9';

  const file = join(root, data.cover.replace(/^\//, ''));
  if (!sizeCache.has(file)) sizeCache.set(file, /\.webm$/i.test(file) ? webmSize(file) : webpSize(file));
  const size = sizeCache.get(file);
  return size ? `${size.w} / ${size.h}` : '16 / 9';
}

// case studies live at /work/<slug>/, so every asset path has to be
// root-absolute rather than relative to the page.
function assetUrl(src) {
  if (!src || src.startsWith('http') || src.startsWith('/')) return src;
  return '/' + src;
}

// a missing asset renders as a grey block carrying its own todo, so the
// layout and the transition still work before the image exists.
function mediaFrame({ src, alt = '', shape = 'wide', where, className = '' }) {
  const classes = ['frame', className].filter(Boolean).join(' ');
  if (!src) {
    return `<div class="${classes} frame--empty">${inline(`[todo: ${alt || 'image'}]`, where)}</div>`;
  }
  if (!assetExists(src)) {
    warnings.push(`${where}: missing asset ${src}`);
    return `<div class="${classes} frame--empty">${inline(`[todo: add ${src}]`, where)}</div>`;
  }
  const shapeClass = SHAPES.has(shape) ? shape : 'wide';
  const url = assetUrl(src);
  if (/\.(webm|mp4)$/.test(src)) {
    return `<div class="${classes} frame--video">
      <video class="media ${shapeClass}" playsinline muted loop preload="metadata" aria-label="${escapeHtml(alt)}">
        <source src="${url}" type="video/${src.endsWith('.webm') ? 'webm' : 'mp4'}">
      </video>
    </div>`;
  }
  return `<div class="${classes}">
      <img class="media ${shapeClass}" src="${url}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">
    </div>`;
}

// a cover may be a still or a clip, and the extension is the only thing that
// decides. both the index grid and the case study hero go through here, so
// swapping a .webp for a .webm never leaves one of the two broken.
const isVideo = (src) => /\.(webm|mp4)$/.test(src);
const videoType = (src) => (src.endsWith('.webm') ? 'webm' : 'mp4');

// the cover in the work index. it carries no alt text because the link
// around it already says the project name, so describing the image here
// would only make a screen reader read every row twice.
function coverMedia(project, index, cls = 'covers_media') {
  const { slug, data } = project;

  if (!data.cover || !assetExists(data.cover)) {
    if (data.cover) warnings.push(`${slug}: missing cover ${data.cover}`);
    return `<div class="${cls} frame--empty" data-slug="${slug}">${inline(
      `[todo: cover for ${slug}]`,
      slug
    )}</div>`;
  }

  const fit = data.cover_fit || 'cover';
  const url = assetUrl(data.cover);

  if (isVideo(data.cover)) {
    return `<video class="${cls}" data-slug="${slug}" style="object-fit: ${fit}"
              muted loop playsinline preload="metadata">
              <source src="${url}" type="video/${videoType(data.cover)}">
            </video>`;
  }

  // the first cover is the only one near the fold on most screens
  const loading = index === 0 ? 'eager' : 'lazy';
  return `<img class="${cls}" data-slug="${slug}" src="${url}" alt=""
              style="object-fit: ${fit}" loading="${loading}" decoding="async">`;
}

// the same cover again, filling the case study hero. this one keeps its alt
// text, because here the image is the subject of the page rather than the
// label on a link.
function heroCover(data) {
  // always fills the frame's width and crops the overflow, whatever shape the
  // cover is. the index shows it at its own ratio, the hero masks it.
  const fit = 'cover';
  const url = assetUrl(data.cover);
  const alt = escapeHtml(data.cover_alt || '');

  if (isVideo(data.cover)) {
    return `<video class="cs-cover_img" style="object-fit: ${fit}"
            muted loop playsinline preload="auto" aria-label="${alt}">
            <source src="${url}" type="video/${videoType(data.cover)}">
          </video>`;
  }

  return `<img class="cs-cover_img" src="${url}" alt="${alt}"
            style="object-fit: ${fit}" fetchpriority="high" decoding="async">`;
}

const caption = (text, where) =>
  text ? `<figcaption class="caption-code">${inline(text, where)}</figcaption>` : '';

/* ── case study media ─────────────────────────────────────────────────── */

const MEDIA_TYPES = new Set(['full', 'side', 'compare', 'diagram']);

// one line per item: type | src | alt | caption
// compare takes two of each, split by " ; ": src a ; src b | alt a ; alt b | label a ; label b
function mediaItem(line, where) {
  const [type = 'full', src = '', alt = '', cap = ''] = line.split('|').map((p) => p.trim());
  if (!MEDIA_TYPES.has(type)) throw new Error(`${where}: unknown media type "${type}"`);
  const two = (v) => v.split(';').map((p) => p.trim());

  if (type === 'compare') {
    const [a = '', b = ''] = two(src);
    const [altA = '', altB = ''] = two(alt);
    const [labelA = 'before', labelB = 'after'] = two(cap);
    const side = (label, file, text) => `<div class="before-after_side">
      <span class="before-after_label">${escapeHtml(label)}</span>
      ${mediaFrame({ src: file, alt: text || `${label} image`, where })}
    </div>`;
    return `<figure class="before-after media-block">
  ${side(labelA, a, altA)}
  ${side(labelB, b, altB)}
</figure>`;
  }

  const frame = mediaFrame({
    src,
    alt,
    where,
    className: type === 'diagram' ? 'frame--diagram' : '',
  });
  const text = caption(src ? basename(src) : '', where);
  if (type === 'side') {
    return `<figure class="media-block media-block--side">
  <div class="media-block_media">${frame}</div>
  ${text}
</figure>`;
  }
  return `<figure class="media-block media-block--${type}">
  ${frame}
  ${text}
</figure>`;
}

const lines = (text) =>
  String(text || '')
    .split('\n')
    .map((l) => l.trim().replace(/^-\s*/, ''))
    .filter(Boolean);

const mediaItems = (text, where) => lines(text).map((l) => mediaItem(l, where)).join('\n');

/* ── block renderers ──────────────────────────────────────────────────── */

const blockRenderers = {
  // one decision: filename header, reasoning, before/after pair
  decision(block, ctx) {
    const f = block.fields;
    const where = `${ctx.slug}/decisions/${block.arg}`;
    const file = `${block.arg}.md`;
    const body = f.body ? paragraphs(f.body, where) : '';
    if (ctx.decisions) {
      ctx.decisions.push({ id: `d-${block.arg}`, num: block.arg.match(/^\d+/)?.[0], title: f.title || '' });
    }
    // prefixed because a decision is named 01-..., and an id that starts
    // with a digit cannot be used in a css selector
    return `<article class="decision" id="d-${block.arg}">
  <header class="decision_head">
    <span class="decision_file">${escapeHtml(file)}</span>
    <h3 class="decision_title">${inline(f.title || '[todo: decision title]', where)}</h3>
    ${f.subtitle ? `<p class="decision_subtitle">${inline(f.subtitle, where)}</p>` : ''}
  </header>
  ${body ? `<div class="decision_body prose">${body}</div>` : ''}
  ${f.media ? mediaItems(f.media, where) : ''}
  ${blockRenderers['before-after'](
    { fields: f, arg: '' },
    { ...ctx, where }
  )}
</article>`;
  },

  'before-after'(block, ctx) {
    const f = block.fields;
    const where = ctx.where || ctx.slug;
    if (!f.before && !f.after && !f.before_caption && !f.after_caption) return '';
    const side = (label, src, alt, cap) => `<div class="before-after_side">
      <span class="before-after_label">${label}</span>
      ${mediaFrame({ src, alt: alt || `${label} image`, shape: f.shape || 'wide', where })}
      ${caption(src ? basename(src) : '', where)}
    </div>`;
    return `<figure class="before-after">
  ${side('before', f.before, f.before_alt, f.before_caption)}
  ${side('after', f.after, f.after_alt, f.after_caption)}
</figure>`;
  },

  // the one sentence the section turns on, in display type
  statement(block, ctx) {
    const text = block.fields.text;
    return text ? `<p class="statement">${inline(text, `${ctx.slug}/statement`)}</p>` : '';
  },

  // value | caption, one per line. a project without hard numbers writes
  // qualitative outcomes here instead (shipped, placed, used by).
  outcomes(block, ctx) {
    const where = `${ctx.slug}/outcomes`;
    const items = lines(block.fields.items)
      .map((line) => {
        const [value = '', label = ''] = line.split('|').map((p) => p.trim());
        return `<li class="outcome">
      <span class="outcome_value">${inline(value, where)}</span>
      <span class="outcome_label">${inline(label, where)}</span>
    </li>`;
      })
      .join('\n');
    return items ? `<ul class="outcomes">\n${items}\n</ul>` : '';
  },

  // renders only when there is a real quote, so an empty block never ships
  quote(block, ctx) {
    const f = block.fields;
    if (!f.text) return '';
    const where = `${ctx.slug}/quote`;
    const logo = f.logo && assetExists(f.logo)
      ? `<img class="quote_logo" src="${assetUrl(f.logo)}" alt="" loading="lazy" decoding="async">`
      : '';
    return `<figure class="quote">
  ${logo}
  <blockquote class="quote_text">${inline(f.text, where)}</blockquote>
  <figcaption class="quote_by"><span>${inline(f.name || '[todo: name]', where)}</span> <span>${inline(f.role || '', where)}</span></figcaption>
</figure>`;
  },

  // name | role, one per line
  credits(block, ctx) {
    const rows = lines(block.fields.items)
      .map((line) => {
        const [name = '', role = ''] = line.split('|').map((p) => p.trim());
        return `<div class="toolbox-cat">
        <span class="toolbox-cat_label">${inline(name, ctx.slug)}</span>
        <span class="toolbox-cat_items">${inline(role, ctx.slug)}</span>
      </div>`;
      })
      .join('\n');
    return rows ? `<div class="toolbox-grid">\n${rows}\n</div>` : '';
  },

  media(block, ctx) {
    return mediaItems(block.fields.items, `${ctx.slug}/media`);
  },

  // presentational depiction of an ai edit flow. no real calls.
  'ai-exchange'(block, ctx) {
    const f = block.fields;
    const where = `${ctx.slug}/ai-exchange`;
    const diff = (f.diff || '')
      .split('\n')
      .map((line) => line.trimEnd())
      .filter(Boolean)
      .map((line) => {
        const kind = line.startsWith('+') ? 'add' : line.startsWith('-') ? 'del' : 'ctx';
        return `<span class="ai-diff_line is--${kind}">${escapeHtml(line)}</span>`;
      })
      .join('\n');
    const actions = (f.actions || 'preview, apply, undo')
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean)
      .map((a) => `<span class="ai-action">[${escapeHtml(a)}]</span>`)
      .join('\n');
    return `<div class="ai-exchange" role="figure" aria-label="${escapeHtml(f.label || 'depiction of an ai scene edit')}">
  <div class="ai-exchange_block ai-exchange_prompt">
    <span class="ai-exchange_tag">&gt; user:</span>
    <span class="ai-exchange_text">${inline(f.prompt || '[todo: prompt]', where)}</span>
  </div>
  <div class="ai-exchange_block ai-exchange_output">
    <span class="ai-exchange_tag">${escapeHtml(f.agent || 'oracle')}:</span>
    <span class="ai-exchange_text">${inline(f.output || '[todo: ai output]', where)}</span>
  </div>
  ${diff ? `<pre class="ai-diff"><code>${diff}</code></pre>` : ''}
  <div class="ai-exchange_actions">${actions}</div>
  ${f.note ? `<p class="ai-exchange_note">${inline(f.note, where)}</p>` : ''}
</div>`;
  },

  // src | shape | alt | caption, one item per line
  gallery(block, ctx) {
    const where = `${ctx.slug}/gallery`;
    const items = (block.fields.items || '')
      .split('\n')
      .map((l) => l.replace(/^-\s*/, '').trim())
      .filter(Boolean)
      .map((line) => {
        const [src = '', shape = 'wide', alt = '', cap = ''] = line.split('|').map((p) => p.trim());
        return `<div class="layout-grid_item${/\.(webm|mp4)$/.test(src) ? ' layout-grid_item--video' : ''}">
      <figure class="gallery_figure">
        ${mediaFrame({ src, alt, shape, where })}
        ${caption(basename(src), where)}
      </figure>
    </div>`;
      })
      .join('\n');
    if (!items) return '';
    return `<div class="gallery">
  <div class="layout-grid_list">
${items}
  </div>
</div>`;
  },

  // label | items, one per line
  toolbox(block, ctx) {
    const rows = (block.fields.items || '')
      .split('\n')
      .map((l) => l.replace(/^-\s*/, '').trim())
      .filter(Boolean)
      .map((line) => {
        const [label = '', items = ''] = line.split('|').map((p) => p.trim());
        return `<div class="toolbox-cat">
        <span class="toolbox-cat_label">${inline(label, ctx.slug)}</span>
        <span class="toolbox-cat_items">${inline(items, ctx.slug)}</span>
      </div>`;
      })
      .join('\n');
    return `<div class="toolbox-grid">\n${rows}\n</div>`;
  },

  // key/value rows in the mono meta style
  meta(block, ctx) {
    const rows = Object.entries(block.fields)
      .map(
        ([k, v]) => `<div class="meta_row">
      <dt>${escapeHtml(k.replace(/_/g, ' '))}</dt>
      <dd>${inline(v, ctx.slug)}</dd>
    </div>`
      )
      .join('\n');
    return `<dl class="meta">\n${rows}\n</dl>`;
  },
};

function renderBlocks(text, ctx) {
  const parts = splitBlocks(text);
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.kind === 'prose') {
      out.push(`<div class="prose">${paragraphs(part.text, ctx.slug)}</div>`);
      continue;
    }
    const renderer = blockRenderers[part.type];
    if (!renderer) throw new Error(`${ctx.slug}: unknown block type ":::${part.type}"`);
    const html = renderer(part, ctx);
    if (!html) continue;
    // a media block and the prose right after it are one beat: the words on
    // the left, the thing they explain on the right
    if (ctx.beats && part.type === 'media') {
      const text = [];
      while (parts[i + 1] && parts[i + 1].kind === 'prose') {
        text.push(`<div class="prose">${paragraphs(parts[++i].text, ctx.slug)}</div>`);
      }
      if (text.length) {
        ctx.beatCount = (ctx.beatCount || 0) + 1;
        out.push(`<div class="beat${ctx.beatCount % 2 === 0 ? ' beat--flip' : ''}">
  <div class="beat_text">${text.join('')}</div>
  <div class="beat_media">${html}</div>
</div>`);
        continue;
      }
    }
    out.push(html);
  }
  return out.join('\n');
}

/* ── shell ────────────────────────────────────────────────────────────── */

const navItem = (href, label, extra = '') =>
  `<a class="nav_button${extra}" href="${href}">
        <div class="button-square blinking"></div>
        <div class="text-color_inverse">${label}</div>
      </a>`;

function nav() {
  const resume = existsSync(join(root, 'resume.pdf'))
    ? navItem('/resume.pdf', 'resume.pdf')
    : `<a class="nav_button" href="/resume.pdf">
        <div class="button-square blinking"></div>
        <div class="text-color_inverse">resume.pdf</div>
        ${inline('[todo: add resume.pdf to the repo root]', 'nav')}
      </a>`;
  return `<div class="navbar">
    <div class="header grid-12">
      <a class="nav_button nav_button--home" href="/">
        <div class="button-square not-blinking"></div>
        <div class="text-color_inverse name-long">lope.design</div>
        <div class="text-color_inverse name-short">lope</div>
      </a>
      ${navItem('/#work', './work')}
      ${navItem('/about/', './about')}
      ${resume}
    </div>
  </div>`;
}

function shell({ title, description, route, body, cls = '' }) {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
  <link rel="preload" href="/assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/space-mono-400-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css">
</head>

<body${cls ? ` class="${cls}"` : ''}>

  <div class="page-transition${route === 'home' ? ' is--cover' : ''}" aria-hidden="true">
    <div class="transition_column"><div class="transition_column-background"></div></div>
    <div class="transition_column"><div class="transition_column-background"></div></div>
    <div class="transition_column"><div class="transition_column-background"></div></div>
    <div class="transition_column"><div class="transition_column-background"></div></div>
  </div>
  <noscript><style>.page-transition { display: none; }</style></noscript>

  <canvas class="ascii-background" aria-hidden="true"></canvas>

  <div class="background-gridlines" aria-hidden="true">
    <div class="grid-line"></div>
    <div class="grid-line"></div>
    <div class="grid-line"></div>
    <div class="grid-line"></div>
    <div class="grid-line"></div>
  </div>

  <div class="cursor-pill" aria-hidden="true"></div>

  ${nav()}

  <div id="app" data-route="${route}">
${body}
  </div>

  <div class="footer">
    <div class="footer_grid grid-12">
      <div class="credits-container"><div class="text-color_inverse">work@lope.design</div></div>
      <div class="copyright-container"><div class="text-color_inverse">2026</div></div>
    </div>
  </div>

  <script type="module" src="/js/site.js"></script>

</body>

</html>
`;
}

/* ── pages ────────────────────────────────────────────────────────────── */

function renderIndex(projects) {
  // one grid on the four-column spine the gridlines draw, every project a
  // tile. each tile keeps the shape of its own cover, which is what staggers
  // the columns, and each one is the element the router morphs into the case
  // study hero.
  const covers = projects
    .map((p, i) => {
      const { slug, data } = p;
      const meta = [data.type, data.status].filter(Boolean).join(' · ');

      return `<a class="layout-grid_item covers_item" href="/work/${slug}/" data-slug="${slug}" data-index="${i}"${data.span ? ` data-span="${data.span}"` : ""}>
          <div class="covers_frame" style="aspect-ratio: ${coverRatio(data)}">
            ${coverMedia(p, i)}
          </div>
          <div class="covers_label">
            <span class="covers_name">${inline(data.title, slug)}</span>
            <span class="covers_meta">${inline(meta, slug)}</span>
          </div>
          <div class="covers_outcome">${inline(data.outcome, slug)}</div>
        </a>`;
    })
    .join('\n        ');

  return `    <div class="hero">
      <h1 class="title-h1">product designer who builds. ai + web interfaces.</h1>
      <div class="hero-now">
        <div class="hero-now_cmd">$ cat now.md</div>
        <div class="hero-now_out">designing digital products at ecoa × petrobras · open to product design roles</div>
      </div>
      <div class="scroll-down-tag">↓ scroll<span class="cursor">_</span></div>
    </div>

    <main class="work" id="work">
      <div class="work-tag">~/selected work</div>
      <div class="covers layout-grid_list">
        ${covers}
      </div>
    </main>
`;
}

function renderAbout() {
  const src = readSource(join(root, 'content/about.md'));
  const { body } = parseFrontmatter(src, 'content/about.md');
  const blocks = splitSections(body)
    .map((section) => {
      const rendered = renderBlocks(section.text, { slug: 'about' });
      return `      <div class="about-block">
        <div class="about-prompt">${escapeHtml(section.name)}</div>
        ${rendered}
      </div>`;
    })
    .join('\n');

  return shell({
    title: 'about / lope.design',
    description:
      'Pedro Lopes, a product designer and developer in Rio de Janeiro working on ai and web interfaces.',
    route: 'about',
    body: `    <section class="about" id="about">
      <div class="about-tag">~/about</div>
${blocks}
    </section>`,
  });
}

// /01 /02 list that links down to each decision. only built when a section
// has two or more, because an index of one is just a heading.
function takeawayIndex(items, slug) {
  const rows = items
    .map((d, i) => {
      const num = String(d.num || i + 1).padStart(2, '0');
      return `<li><a href="#${d.id}"><span class="takeaway-index_num">/${num}</span> ${inline(d.title, slug)}</a></li>`;
    })
    .join('\n    ');
  return `<nav class="takeaway-index" aria-label="takeaways">
  <p class="takeaway-index_label">what i decided, and why</p>
  <ol class="takeaway-index_list">
    ${rows}
  </ol>
</nav>`;
}

function renderCaseStudy(project, prev, next) {
  const { slug, data } = project;
  const metaRows = [
    ['role', data.role],
    ['timeline', data.timeline],
    ['team', data.team],
    ['built with', data.built_with],
    ['status', data.status],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) => `<div class="meta_row">
            <dt>${k}</dt>
            <dd>${inline(v, slug)}</dd>
          </div>`
    )
    .join('\n          ');

  const live = data.live
    ? `<div class="meta_row">
            <dt>${escapeHtml(data.live_label || 'live')}</dt>
            <dd>${inline(`[${data.live_text || data.live}](${data.live})`, slug)}</dd>
          </div>`
    : '';

  const sectionList = splitSections(project.body)
    .map((section) => {
      const id = section.name.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
      const ctx = { slug, decisions: [], beats: !/^(overview|credits|decisions|takeaways)/.test(section.name) };
      let rendered = renderBlocks(section.text, ctx);
      // a section whose blocks all rendered nothing (an unwritten quote) is dropped
      if (!rendered.trim()) return null;
      if (ctx.decisions.length >= 2) rendered = takeawayIndex(ctx.decisions, slug) + '\n' + rendered;
      return { id, name: section.name, rendered };
    })
    .filter(Boolean);

  // role, timeline, team, tools and status close the page, above the credits
  const metaHtml = `<dl class="meta cs-meta">
          ${metaRows}
          ${live}
          </dl>`;
  const infoAt = sectionList.findIndex((s) => s.id === 'project-info-md');
  if (infoAt >= 0) {
    sectionList[infoAt].rendered = `${metaHtml}
${sectionList[infoAt].rendered}`;
  } else {
    sectionList.push({ id: 'project-info-md', name: 'project-info.md', rendered: metaHtml });
  }

  const sections = sectionList
    .map(
      (s) => `      <section class="cs-section" id="${s.id}">
        <div class="cs-section_file">${escapeHtml(s.name)}</div>
        <div class="cs-section_body">
${s.rendered}
        </div>
      </section>`
    )
    .join('\n');

  const rail = `      <nav class="cs-rail" aria-label="case study sections">
        <a class="cs-rail_back" href="/#work">← back</a>
        ${sectionList
          .map((s) => `<a href="#${s.id}">${escapeHtml(s.name.replace(/\.md$|\/$/g, ''))}</a>`)
          .join('\n        ')}
      </nav>`;

  const coverMissing = !data.cover || !assetExists(data.cover);
  if (coverMissing && data.cover) warnings.push(`${slug}: missing cover ${data.cover}`);
  const cover = coverMissing
    ? `<div class="cs-cover_frame frame--empty" data-cover-slot="${slug}">${inline(
        `[todo: add a cover image for ${slug}]`,
        slug
      )}</div>`
    : `<div class="cs-cover_frame" data-cover-slot="${slug}">
          ${heroCover(data)}
        </div>`;

  // the neighbour's cover rides along in the link, so previous and next use
  // the same cover-to-cover transition as the index
  const navLink = (target, dir) => {
    const label = dir === 'prev' ? '← prev project' : 'next project →';
    if (!target) return `<span class="cs-nav_link is--disabled">${label}</span>`;
    const hasCover = target.data.cover && assetExists(target.data.cover);
    // these thumbnails never play, and most covers are clips that start on an
    // empty frame, so a still (nav_image) wins over the cover when there is one
    const still = target.data.nav_image && assetExists(target.data.nav_image)
      ? `<img class="cs-nav_media" data-slug="${target.slug}" src="${assetUrl(target.data.nav_image)}" alt="" style="object-fit: cover" loading="lazy" decoding="async">`
      : null;
    const thumb = still || hasCover
      ? `<div class="cs-nav_frame" style="aspect-ratio: ${coverRatio(target.data)}">${still || coverMedia(target, 1, 'cs-nav_media')}</div>`
      : '';
    return `<a class="cs-nav_link cs-nav_${dir}" href="/work/${target.slug}/" data-slug="${target.slug}">${label} <span class="cs-nav_name">${escapeHtml(target.data.title)}</span>${thumb}</a>`;
  };

  const footNav = `      <nav class="cs-nav">
        ${navLink(prev, 'prev')}
        ${navLink(next, 'next')}
      </nav>`;

  const eyebrow = data.eyebrow || [data.type, data.timeline].filter(Boolean).join(' · ');

  const body = `    <article class="case-study" data-slug="${slug}">
${rail}
      <div class="cs-main">
        <header class="cs-head">
          <nav class="cs-breadcrumb" aria-label="breadcrumb">
            <a href="/#work">~/work</a>/<span>${escapeHtml(slug)}</span>
          </nav>
          <p class="cs-eyebrow">${inline(eyebrow, slug)}</p>
          <h1 class="cs-title">${inline(data.title, slug)}</h1>
          ${data.headline ? `<p class="cs-headline">${inline(data.headline, slug)}</p>` : ''}
        </header>

        <figure class="cs-cover">
          ${cover}
          ${caption(data.cover ? basename(data.cover) : '', `${slug}/cover`)}
        </figure>

        <div class="cs-rest">
${sections}

${footNav}
        </div>
      </div>
    </article>`;

  return shell({
    title: `${data.title} / lope.design`,
    description: data.summary || `${data.title}, a ${data.type} project by Lope (Pedro Lopes).`,
    route: 'work',
    cls: 'is--case-study',
    body,
  });
}

/* ── run ──────────────────────────────────────────────────────────────── */

const projectsDir = join(root, 'content/projects');
const projects = readdirSync(projectsDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const where = `content/projects/${f}`;
    const { data, body } = parseFrontmatter(readSource(join(projectsDir, f)), where);
    if (!data.slug) throw new Error(`${where}: missing slug`);
    if (!data.order) throw new Error(`${where}: missing order`);
    return { slug: data.slug, order: Number(data.order), data, body, where };
  })
  .sort((a, b) => a.order - b.order);

writeFileSync(
  join(root, 'index.html'),
  shell({
    title: 'lope / product designer who builds',
    description:
      'Lope (Pedro Lopes) is a product designer and developer in Rio de Janeiro working on ai and web interfaces.',
    route: 'home',
    body: renderIndex(projects),
  })
);

mkdirSync(join(root, 'about'), { recursive: true });
writeFileSync(join(root, 'about', 'index.html'), renderAbout());

projects.forEach((project, i) => {
  const dir = join(root, 'work', project.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, 'index.html'),
    renderCaseStudy(project, projects[i - 1], projects[i + 1])
  );
});

/* ── report ───────────────────────────────────────────────────────────── */

console.log(`built index.html + /about/ + ${projects.length} case studies`);
console.log(projects.map((p) => `  /work/${p.slug}/`).join('\n'));

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}

if (todos.length) {
  const byPage = todos.reduce((acc, t) => {
    acc[t.where] = (acc[t.where] || 0) + 1;
    return acc;
  }, {});
  console.log(`\n${todos.length} todo placeholder(s) still rendered on the site:`);
  for (const [where, count] of Object.entries(byPage).sort()) {
    console.log(`  ${String(count).padStart(3)}  ${where}`);
  }
  console.log('\nthese render as highlighted [todo: ...] on the page. do not ship them.');
}
