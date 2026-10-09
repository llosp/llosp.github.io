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
function coverMedia(project, index) {
  const { slug, data } = project;

  if (!data.cover || !assetExists(data.cover)) {
    if (data.cover) warnings.push(`${slug}: missing cover ${data.cover}`);
    return `<div class="covers_media frame--empty" data-slug="${slug}">${inline(
      `[todo: cover for ${slug}]`,
      slug
    )}</div>`;
  }

  const fit = data.cover_fit || 'cover';
  const url = assetUrl(data.cover);

  if (isVideo(data.cover)) {
    return `<video class="covers_media" data-slug="${slug}" style="object-fit: ${fit}"
              muted loop playsinline preload="metadata">
              <source src="${url}" type="video/${videoType(data.cover)}">
            </video>`;
  }

  // the first cover is the only one near the fold on most screens
  const loading = index === 0 ? 'eager' : 'lazy';
  return `<img class="covers_media" data-slug="${slug}" src="${url}" alt=""
              style="object-fit: ${fit}" loading="${loading}" decoding="async">`;
}

// the same cover again, filling the case study hero. this one keeps its alt
// text, because here the image is the subject of the page rather than the
// label on a link.
function heroCover(data) {
  const fit = data.cover_fit || 'cover';
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

/* ── block renderers ──────────────────────────────────────────────────── */

const blockRenderers = {
  // one decision: filename header, reasoning, before/after pair
  decision(block, ctx) {
    const f = block.fields;
    const where = `${ctx.slug}/decisions/${block.arg}`;
    const file = `${block.arg}.md`;
    const body = f.body ? paragraphs(f.body, where) : '';
    // prefixed because a decision is named 01-..., and an id that starts
    // with a digit cannot be used in a css selector
    return `<article class="decision" id="d-${block.arg}">
  <header class="decision_head">
    <span class="decision_file">${escapeHtml(file)}</span>
    <h3 class="decision_title">${inline(f.title || '[todo: decision title]', where)}</h3>
  </header>
  ${body ? `<div class="decision_body prose">${body}</div>` : ''}
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
      ${caption(cap || `[todo: ${label} caption for ${where}]`, where)}
    </div>`;
    return `<figure class="before-after">
  ${side('before', f.before, f.before_alt, f.before_caption)}
  ${side('after', f.after, f.after_alt, f.after_caption)}
</figure>`;
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
        ${caption(cap || `[todo: caption for ${basename(src)}]`, where)}
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
  return splitBlocks(text)
    .map((part) => {
      if (part.kind === 'prose') return `<div class="prose">${paragraphs(part.text, ctx.slug)}</div>`;
      const renderer = blockRenderers[part.type];
      if (!renderer) throw new Error(`${ctx.slug}: unknown block type ":::${part.type}"`);
      return renderer(part, ctx);
    })
    .filter(Boolean)
    .join('\n');
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

const INDEX_COLUMNS = ['name', 'type', 'role', 'status', 'outcome'];

function renderIndex(projects) {
  const head = INDEX_COLUMNS.map((c) => `<span class="index_cell">${c}</span>`).join('');

  const rows = projects
    .map((p, i) => {
      const cells = [
        `<span class="index_cell index_name">${inline(p.data.title, p.slug)}</span>`,
        `<span class="index_cell index_type">${inline(p.data.type, p.slug)}</span>`,
        `<span class="index_cell index_role">${inline(p.data.role, p.slug)}</span>`,
        `<span class="index_cell index_status">${inline(p.data.status, p.slug)}</span>`,
        `<span class="index_cell index_outcome">${inline(p.data.outcome, p.slug)}</span>`,
      ].join('\n        ');
      return `<a class="index_row" href="/work/${p.slug}/" data-slug="${p.slug}" data-index="${i}">
        <span class="index_cell index_num">${String(i + 1).padStart(2, '0')}</span>
        ${cells}
      </a>`;
    })
    .join('\n      ');

  // the covers are the visual half of the index, and each one is the element
  // the router morphs into the case study hero, which is why it is a real
  // img in the page rather than something drawn on hover.
  const covers = projects
    .map(
      (p, i) => `<a class="covers_item" href="/work/${p.slug}/" data-slug="${p.slug}" data-index="${i}">
          <div class="covers_frame">
            ${coverMedia(p, i)}
          </div>
          <div class="covers_label">
            <span class="covers_name">${inline(p.data.title, p.slug)}</span>
            <span class="covers_outcome">${inline(p.data.outcome, p.slug)}</span>
          </div>
          <div class="covers_caption caption-code">${inline(
            p.data.cover_caption || `[todo: cover caption for ${p.slug}]`,
            p.slug
          )}</div>
        </a>`
    )
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
      <div class="work-tag">~/work</div>
      <div class="index">
        <div class="index_table">
          <div class="index_head">
            <span class="index_cell index_num">#</span>
            ${head}
          </div>
          ${rows}
        </div>
      </div>
      <div class="covers">
        ${covers}
      </div>
    </main>
`;
}

function renderAbout() {
  const src = readFileSync(join(root, 'content/about.md'), 'utf8');
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

  const sections = splitSections(project.body)
    .map((section) => {
      const id = section.name.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
      return `      <section class="cs-section" id="${id}">
        <div class="cs-section_file">${escapeHtml(section.name)}</div>
        <div class="cs-section_body">
${renderBlocks(section.text, { slug })}
        </div>
      </section>`;
    })
    .join('\n');

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

  const footNav = `      <nav class="cs-nav">
        ${
          prev
            ? `<a class="cs-nav_link cs-nav_prev" href="/work/${prev.slug}/" data-slug="${prev.slug}">← prev project <span class="cs-nav_name">${escapeHtml(prev.data.title)}</span></a>`
            : '<span class="cs-nav_link is--disabled">← prev project</span>'
        }
        ${
          next
            ? `<a class="cs-nav_link cs-nav_next" href="/work/${next.slug}/" data-slug="${next.slug}">next project → <span class="cs-nav_name">${escapeHtml(next.data.title)}</span></a>`
            : '<span class="cs-nav_link is--disabled">next project →</span>'
        }
      </nav>`;

  const body = `    <article class="case-study" data-slug="${slug}">
      <header class="cs-hero">
        <figure class="cs-cover">
          ${cover}
          ${caption(data.cover_caption, `${slug}/cover`)}
        </figure>
        <div class="cs-hero_text">
          <nav class="cs-breadcrumb" aria-label="breadcrumb">
            <a href="/#work">~/work</a>/<span>${escapeHtml(slug)}</span>
          </nav>
          <h1 class="cs-title">${inline(data.title, slug)}</h1>
          <dl class="meta cs-meta">
          ${metaRows}
          ${live}
          </dl>
        </div>
      </header>

${sections}

${footNav}
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
    const { data, body } = parseFrontmatter(readFileSync(join(projectsDir, f), 'utf8'), where);
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
