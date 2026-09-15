// Pure aggregation functions: raw card_sort_submissions rows -> insight datasets.
// Row shape: { card_set, respondent_name, age_range, gender, area, lists: [{name, priority, cards}] }

function normalizeText(s) {
  return String(s || '').trim().toLowerCase();
}

function titleCase(s) {
  return s.length ? s[0].toUpperCase() + s.slice(1) : s;
}

function countBy(rows, field, { normalize = false } = {}) {
  const counts = new Map();
  rows.forEach(row => {
    const raw = row[field];
    if (raw == null || raw === '') return;
    const key = normalize ? normalizeText(raw) : raw;
    const label = normalize ? titleCase(key) : raw;
    const entry = counts.get(key) || { label, count: 0 };
    entry.count += 1;
    counts.set(key, entry);
  });
  return Array.from(counts.values()).sort((a, b) => b.count - a.count);
}

function normalizedListNameFrequency(rows) {
  const counts = new Map();
  rows.forEach(row => {
    (row.lists || []).forEach(list => {
      const key = normalizeText(list.name);
      if (!key) return;
      const entry = counts.get(key) || { name: titleCase(key), count: 0 };
      entry.count += 1;
      counts.set(key, entry);
    });
  });
  return Array.from(counts.values()).sort((a, b) => b.count - a.count);
}

function averagePriorityByListName(rows) {
  const totals = new Map();
  rows.forEach(row => {
    (row.lists || []).forEach(list => {
      const key = normalizeText(list.name);
      if (!key) return;
      const entry = totals.get(key) || { name: titleCase(key), sum: 0, n: 0 };
      entry.sum += list.priority;
      entry.n += 1;
      totals.set(key, entry);
    });
  });
  return Array.from(totals.values())
    .map(e => ({ name: e.name, avgPriority: e.sum / e.n, n: e.n }))
    .sort((a, b) => a.avgPriority - b.avgPriority);
}

function cardCooccurrence(rows, cardIds) {
  const index = new Map(cardIds.map((id, i) => [id, i]));
  const n = cardIds.length;
  const matrix = Array.from({ length: n }, () => new Array(n).fill(0));
  rows.forEach(row => {
    (row.lists || []).forEach(list => {
      const cards = list.cards || [];
      for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
          const a = index.get(cards[i]);
          const b = index.get(cards[j]);
          if (a == null || b == null) continue;
          matrix[a][b] += 1;
          matrix[b][a] += 1;
        }
      }
    });
  });
  return matrix;
}

function listCountHistogram(rows) {
  const counts = new Map();
  rows.forEach(row => {
    const n = (row.lists || []).length;
    counts.set(n, (counts.get(n) || 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([n, count]) => ({ n, count }))
    .sort((a, b) => a.n - b.n);
}
