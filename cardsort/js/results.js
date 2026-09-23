// Results page: fetch all submissions, aggregate client-side, render inline-SVG charts.
// Full-table fetch is acceptable at this tool's scale (a small research study, not a
// high-traffic product) — no pagination/RPC aggregation is built.
(function () {
  const appEl = document.getElementById('app');
  const AGE_ORDER = ['18-24', '25-34', '35-44', '45-54', '55+'];

  function orderAge(counts) {
    const map = new Map(counts.map(d => [d.label, d]));
    return AGE_ORDER.filter(k => map.has(k)).map(k => map.get(k));
  }

  async function init() {
    appEl.innerHTML = '<p class="loading">Carregando resultados...</p>';

    const { data: rows, error } = await sb.from('card_sort_submissions').select('*');

    if (error) {
      console.error(error);
      appEl.innerHTML = '<p class="error">Não foi possível carregar os resultados. Tente novamente mais tarde.</p>';
      return;
    }

    if (!rows || !rows.length) {
      appEl.innerHTML = `
        <header class="results-header">
          <h1>Resultados</h1>
          <p class="lead">Ainda não há respostas registradas.</p>
        </header>
      `;
      return;
    }

    render(rows);
  }

  function render(rows) {
    appEl.innerHTML = '';

    const header = document.createElement('header');
    header.className = 'results-header';
    header.innerHTML = `
      <h1>Resultados</h1>
      <p class="lead">${rows.length} ${rows.length === 1 ? 'resposta' : 'respostas'} registradas até agora.</p>
    `;
    appEl.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'charts-grid';
    appEl.appendChild(grid);

    grid.appendChild(barChart({
      title: 'Faixa etária',
      desc: 'Distribuição das respostas por faixa etária.',
      data: orderAge(countBy(rows, 'age_range')).map(d => ({ label: d.label, value: d.count })),
      caption: 'Número de respondentes por faixa etária.',
      valueFormat: String,
    }));

    grid.appendChild(barChart({
      title: 'Gênero',
      desc: 'Distribuição das respostas por gênero.',
      data: countBy(rows, 'gender').map(d => ({ label: d.label, value: d.count })),
      caption: 'Número de respondentes por gênero.',
      valueFormat: String,
    }));

    grid.appendChild(barChart({
      title: 'Área / ocupação',
      desc: 'Distribuição das respostas por área ou ocupação, texto livre normalizado.',
      data: countBy(rows, 'area', { normalize: true }).slice(0, 12).map(d => ({ label: d.label, value: d.count })),
      caption: 'Áreas mais frequentes entre os respondentes.',
      valueFormat: String,
    }));

    grid.appendChild(barChart({
      title: 'Nomes de lista mais comuns',
      desc: 'Categorias que os respondentes mais criaram, com texto normalizado.',
      data: normalizedListNameFrequency(rows).slice(0, 12).map(d => ({ label: d.name, value: d.count })),
      caption: 'Quantas vezes cada nome de lista apareceu entre todas as respostas.',
      valueFormat: String,
    }));

    grid.appendChild(barChart({
      title: 'Prioridade média por lista',
      desc: 'Posição média de cada nome de lista entre as respostas que a criaram — 1 é a mais prioritária.',
      data: averagePriorityByListName(rows).slice(0, 12).map(d => ({ label: `${d.name} (n=${d.n})`, value: d.avgPriority })),
      caption: 'Quanto menor o número, maior a prioridade média atribuída pelos respondentes.',
      valueFormat: v => v.toFixed(1),
    }));

    grid.appendChild(histogram({
      title: 'Listas criadas por resposta',
      desc: 'Quantas listas cada respondente criou.',
      data: listCountHistogram(rows),
      caption: 'Distribuição do número de listas criadas por sessão.',
    }));

    const cardIds = CARDS.map(c => c.id);
    const cardLabels = Object.fromEntries(CARDS.map(c => [c.id, c.label]));
    const heatmapEl = heatmap({
      title: 'Cartas agrupadas juntas',
      desc: 'Com que frequência cada par de cartas foi colocado na mesma lista.',
      cardIds,
      labels: cardLabels,
      matrix: cardCooccurrence(rows, cardIds),
      caption: 'Células mais escuras indicam pares de cartas agrupados juntos com mais frequência. Passe o mouse sobre uma célula para ver os nomes.',
    });
    heatmapEl.classList.add('chart-wide');
    grid.appendChild(heatmapEl);
  }

  init();
})();
