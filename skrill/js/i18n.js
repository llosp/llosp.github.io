// ── SKRILL — Idioma (PT padrão / EN opcional) ────────────────────────────────
// O código e o banco continuam em português. Quando o idioma é EN, um tradutor de
// DOM troca os textos já renderizados (texto exato, regras com número, atributos)
// e acompanha re-renders via MutationObserver. Trocar o idioma recarrega a página.
// Carregar ANTES de client.js.

const LANG_KEY = 'skrill_lang';
function getLang() { try { return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'pt'; } catch (_) { return 'pt'; } }
function setLang(l) { try { localStorage.setItem(LANG_KEY, l); } catch (_) {} location.reload(); }
const LANG = getLang();
const LOCALE = LANG === 'en' ? 'en-US' : 'pt-BR';

// Texto exato (após trim + espaços colapsados) -> inglês
const EN = {
  // navegação / geral
  'Dashboard': 'Dashboard', 'Sair': 'Log out', 'Entrar': 'Enter', 'Cancelar': 'Cancel', 'Salvar': 'Save',
  'Confirmar': 'Confirm', 'Continuar': 'Continue', 'Excluir': 'Delete', 'Remover': 'Remove', 'Editar': 'Edit',
  'Tentar novamente': 'Try again', 'Carregar mais': 'Load more', 'Ver tudo →': 'See all →',
  'Admin': 'Admin', 'Painel Admin': 'Admin Panel', 'Pronto': 'Ready',
  'Season Goals': 'Season Goals', 'Skrill Time': 'Skrill Time', 'Reuniao': 'Meeting', 'Reunião': 'Meeting',
  '[S] Reuniao': '[S] Meeting', '[G] Metas da Temporada': '[G] Season Goals', '← Trocar perfil': '← Switch profile',
  'Trocar Perfil': 'Switch Profile', '← Voltar': '← Back', '← Sair do App': '← Leave App',
  'Configurações': 'Settings', 'Configuracoes': 'Settings', 'Tema': 'Theme', 'Modo escuro': 'Dark mode',
  'Perfil': 'Profile', 'Esconder o Skrill que passeia': 'Hide the walking Skrill', 'Improve your skrills.': 'Improve your skrills.',
  // login / perfis
  'Senha do App': 'App Password', 'Senha incorreta. Tente novamente.': 'Wrong password. Try again.',
  'Quem está jogando?': "Who's playing?", 'Senha': 'Password', 'Erro ao carregar perfis.': 'Error loading profiles.',
  'Criar Perfil': 'Create Profile', 'Nome / Apelido': 'Name / Nickname', 'Foto de Perfil': 'Profile Picture',
  '(preto e branco · 100×100px)': '(black and white · 100×100px)', 'Senha do Perfil': 'Profile Password',
  'Como te chamam?': 'What do they call you?', 'Preencha nome e senha.': 'Fill in name and password.',
  'Preto': 'Black', 'Branco': 'White', 'Limpar': 'Clear', 'Histórico': 'History', 'Desenhar': 'Draw',
  'Editar Perfil': 'Edit Profile', 'Nome não pode estar vazio.': 'Name cannot be empty.',
  'Carregar esta foto? Ela vai substituir o desenho atual no editor.': 'Load this picture? It will replace the current drawing in the editor.',
  'Excluir esta foto do histórico? Não dá para desfazer.': 'Delete this picture from history? This cannot be undone.',
  'Histórico indisponível.': 'History unavailable.', 'Nenhuma foto salva ainda.': 'No saved pictures yet.',
  'Histórico de fotos': 'Picture history', 'foto anterior': 'previous picture',
  // dashboard
  'Bem-vindo de volta,': 'Welcome back,', 'Entregar na pagina de Metas': 'Deliver on the Goals page',
  'Entregas da Temporada': 'Season Deliveries', 'Erro ao carregar dashboard': 'Error loading dashboard',
  'Erro desconhecido. Verifique a conexão.': 'Unknown error. Check your connection.',
  'Guild Member': 'Guild Member', 'Entrar Discord →': 'Join Discord →',
  'Imagens reveladas no Skrill Time': 'Images revealed at Skrill Time', 'Iniciar próxima Temporada': 'Start next Season',
  'Ir para Skrill Time →': 'Go to Skrill Time →', 'Nenhum membro ainda': 'No members yet',
  'Nenhuma entrega ainda esta temporada': 'No deliveries yet this season',
  'Nenhuma meta ainda esta temporada': 'No goals yet this season', 'Participar': 'Join',
  'Progresso da Temporada': 'Season Progress', 'Próxima Reunião': 'Next Meeting', 'Sair desta temporada?': 'Leave this season?',
  'Temporada já revelada. Aguarde a próxima para entrar.': 'Season already revealed. Wait for the next one to join.',
  'Temporada revelada': 'Season revealed', 'Top 30 Dias': 'Top 30 Days', 'Top Guild': 'Top Guild',
  'aguarde a proxima': 'wait for the next one', 'entregou': 'delivered', 'Total Pts': 'Total Pts',
  // leaderboard
  'Rankings': 'Rankings', 'Leaderboard': 'Leaderboard', '30 Dias': '30 Days', 'All-Time': 'All-Time',
  'Classificação Completa': 'Full Standings', 'vazio': 'empty',
  // profile
  'Streak': 'Streak', 'Melhor': 'Best', 'Metas': 'Goals', 'Temporadas': 'Seasons', 'Galeria': 'Gallery', 'Stats': 'Stats',
  'Membro não encontrado': 'Member not found', 'Nenhuma meta ainda': 'No goals yet', 'Nenhuma imagem ainda': 'No media yet',
  'Metas Criadas': 'Goals Created', 'Metas Completas': 'Goals Completed', 'Metas Falhadas': 'Goals Failed',
  'Taxa de Conclusão': 'Completion Rate', 'Bounties Feitas': 'Bounties Done', 'Sem dados': 'No data',
  'Metas por Temporada': 'Goals per Season', 'Completas': 'Completed', 'Falhas': 'Failed', 'Tentativas': 'Attempts',
  'Pontos por Temporada': 'Points per Season', 'Dificuldade': 'Difficulty', 'Sem temporada': 'No season',
  'Falha': 'Failed', 'Feito ✓': 'Done ✓',
  // archive
  'Acervo': 'Archive', 'Calendário': 'Calendar', 'Erro ao carregar o acervo.': 'Error loading the archive.',
  'Nenhuma temporada arquivada': 'No archived seasons',
  'Assim que a primeira temporada terminar, ela aparece aqui.': 'As soon as the first season ends, it shows up here.',
  'Imagens borradas — temporada ainda não revelada.': 'Blurred media — season not revealed yet.',
  'Nenhuma imagem foi enviada nesta temporada.': 'No media was sent this season.', 'Bounty': 'Bounty',
  'Metas Feitas': 'Goals Done', 'Participantes': 'Participants',
  'Janeiro': 'January', 'Fevereiro': 'February', 'Março': 'March', 'Abril': 'April', 'Maio': 'May', 'Junho': 'June',
  'Julho': 'July', 'Agosto': 'August', 'Setembro': 'September', 'Outubro': 'October', 'Novembro': 'November', 'Dezembro': 'December',
  // weekly
  'Metas da Temporada': 'Season Goals', 'Nova Meta': 'New Goal', '+ Declarar Meta': '+ Declare Goal', 'Declarar Meta': 'Declare Goal',
  'Título': 'Title', 'Descrição': 'Description', '(opcional)': '(optional)', 'O que você vai conquistar?': 'What will you achieve?',
  'Mais detalhes...': 'More details...', 'Simples · 2pts': 'Simple · 2pts', 'Complexa · 5pts': 'Complex · 5pts', 'Extra · 0pts': 'Extra · 0pts',
  'Simples': 'Simple', 'Complexa': 'Complex', 'Extra': 'Extra', 'Todas': 'All', 'Minhas': 'Mine', 'Outros': 'Others',
  'Seja o primeiro a declarar uma!': 'Be the first to declare one!',
  'Entregar Meta': 'Deliver Goal', 'Entregar Bounty': 'Deliver Bounty', 'Editar Entrega': 'Edit Delivery',
  'Confirmar Entrega': 'Confirm Delivery', 'Salvar Alteracoes': 'Save Changes', 'Concluir': 'Complete', 'Tentativa': 'Attempt',
  'Prova de entrega': 'Proof of delivery', 'Arquivos atuais': 'Current files', 'Selecionar imagem, vídeo ou áudio': 'Select image, video or audio',
  'Nenhum arquivo selecionado': 'No file selected', 'Nenhum arquivo mantido': 'No file kept',
  'Selecione pelo menos um arquivo.': 'Select at least one file.', 'Selecione pelo menos um arquivo da tentativa.': 'Select at least one attempt file.',
  'A entrega precisa ter pelo menos um arquivo.': 'The delivery needs at least one file.',
  'Erro ao enviar. Tente novamente.': 'Upload error. Try again.', 'Erro ao salvar. Tente novamente.': 'Save error. Try again.',
  'Enviando...': 'Uploading...', 'Salvando...': 'Saving...', 'Convertendo vídeo...': 'Converting video...', 'Convertendo áudio...': 'Converting audio...',
  'Vídeo inválido': 'Invalid video', 'Falha ao ler o vídeo': 'Failed to read the video',
  'Excluir esta meta?': 'Delete this goal?', 'Bounty entregue': 'Bounty delivered',
  'Tentativa de Consolacao': 'Consolation Attempt', 'Reflexao': 'Reflection', 'Prova da tentativa': 'Attempt proof',
  'O que deu errado? O que aprendeu?': 'What went wrong? What did you learn?', 'Enviar Tentativa': 'Send Attempt',
  'A reflexao precisa ter pelo menos 10 caracteres.': 'The reflection needs at least 10 characters.',
  // skrill time
  'Admin: forçar encerramento': 'Admin: force close', 'Forçar encerramento agora? Os pontos serão concedidos imediatamente.': 'Force close now? Points will be awarded immediately.',
  'Nenhuma entrega esta temporada': 'No deliveries this season', 'Nenhuma meta entregue esta temporada': 'No goals delivered this season',
  'Nada para avaliar.': 'Nothing to rate.', 'Avaliação por pares': 'Peer rating', 'Avaliação enviada': 'Rating sent',
  'Aguardando os demais...': 'Waiting for the others...', 'Enviar avaliação': 'Submit rating', 'Resultados da Temporada': 'Season Results',
  'Votação de Tentativas': 'Attempt Voting', 'Votos de tentativa enviados': 'Attempt votes sent', 'Confirmar votos': 'Confirm votes',
  'Clique de novo para desmarcar': 'Click again to undo',
  'Vote ▲ nas tentativas que merecem 1 ponto de consolação. O voto é opcional e pode ser desmarcado até confirmar. Os resultados dos bônus só aparecem após esta etapa.':
    'Vote ▲ on the attempts that deserve 1 consolation point. Voting is optional and can be undone until you confirm. Bonus results only show after this step.',
  'Marcar Pronto': 'Mark Ready', 'Desmarcar Pronto': 'Unmark Ready', 'Todos prontos! Revelando...': 'Everyone is ready! Revealing...',
  'Voce esta pronto! Aguardando os outros...': "You're ready! Waiting for the others...",
  'Voce nao participou desta temporada.': "You didn't take part in this season.", 'Aguarde o início da próxima temporada.': 'Wait for the next season to start.',
  'Bounty cancelada por unanimidade': 'Bounty cancelled unanimously', 'Entrega cancelada por unanimidade': 'Delivery cancelled unanimously',
  'Erro ao denunciar': 'Error reporting', 'Erro ao desmarcar': 'Error unmarking', 'Erro ao votar': 'Error voting',
  'denunciar': 'report', 'sem consolacao': 'no consolation', '+1pt consolacao': '+1pt consolation',
  'e ja ja e Skrill Day!': "and it's almost Skrill Day!", 'e da avaliacao por pares.': 'and from peer rating.',
  // client.js
  'A Temporada 1 ainda não foi criada.': 'Season 1 has not been created yet.',
  'Aguarde a proxima Temporada para participar.': 'Wait for the next Season to join.',
  'Esta Temporada ja foi revelada.': 'This Season has already been revealed.',
  'Fique de olho — o Skrill Time inaugural está chegando.': 'Stay tuned — the inaugural Skrill Time is coming.',
  'Iniciar Temporada': 'Start Season', 'Iniciar a Temporada? Isso vai criar a Temporada 1 e o app abrirá para todos.': 'Start the Season? This creates Season 1 and opens the app for everyone.',
  'Junte-se a Temporada': 'Join the Season', 'Junte-se a Temporada para declarar metas, participar do Skrill Time': 'Join the Season to declare goals and take part in Skrill Time',
  'Ninguém entregou ainda': 'Nobody has delivered yet', 'Entregue por:': 'Delivered by:', 'Ver perfil': 'View profile',
  'Visualizar Entrega': 'View Delivery', 'Voce nao entrou nesta Temporada': "You didn't join this Season",
  'Os pontos da temporada de todos serao zerados.': "Everyone's season points will be reset.", 'Pronto ✓': 'Ready ✓',
  'Erro ao criar temporada:': 'Error creating season:', 'Idioma': 'Language',
  // bounties
  'Crie uma arte da OC do jogador acima de você no ranking': "Create art of the OC of the player above you in the ranking",
  'Crie qualquer tipo de arte inspirada em uma OC (Personagem Original) do jogador acima de você no ranking dos últimos 30 dias. Se você estiver em primeiro lugar, escolha a OC do último colocado.': 'Create any kind of art inspired by an OC (Original Character) of the player above you in the last 30 days ranking. If you are in first place, pick the OC of the last-placed player.',
  'Redesenhe seu avatar do Skrill em alta resolução': 'Redraw your Skrill avatar in high resolution',
  'Pegue o pixel art do seu avatar atual e recrie-o como uma ilustração caprichada, em qualquer estilo ou técnica que quiser.': 'Take the pixel art of your current avatar and recreate it as a polished illustration, in any style or technique you like.',
  'Ilustre o mascote Skrill em uma cena': 'Illustrate the Skrill mascot in a scene',
  'Desenhe o mascote do Skrill vivendo uma aventura: caminhando, lutando, descansando — você decide o contexto e o cenário.': 'Draw the Skrill mascot on an adventure: walking, fighting, resting — you decide the context and setting.',
  'Crie uma capa para esta temporada': 'Create a cover for this season',
  'Produza uma arte de capa que represente o clima, as metas ou o espírito desta temporada do grupo.': "Produce a cover art that represents the mood, the goals or the spirit of the group's season.",
  'Faça um fan art de um personagem favorito de outro membro': "Make fan art of another member's favorite character",
  'Pergunte a alguém do grupo qual o personagem favorito dele e crie um fan art dedicado a esse personagem.': "Ask someone in the group who their favorite character is and make fan art dedicated to that character.",
  'Desenhe algo usando apenas duas cores': 'Draw something using only two colors',
  'Crie uma ilustração completa usando uma paleta limitada a exatamente duas cores (além do fundo).': 'Create a complete illustration using a palette limited to exactly two colors (besides the background).',
  'Reinterprete uma obra de arte clássica': 'Reinterpret a classic artwork',
  'Escolha uma obra famosa e recrie-a no seu próprio estilo, com seu próprio toque pessoal.': 'Pick a famous work and recreate it in your own style, with your own personal touch.',
  'Crie um logo para um projeto fictício': 'Create a logo for a fictional project',
  'Invente um produto, banda ou estúdio fictício e desenhe um logo completo para ele.': 'Invent a fictional product, band or studio and draw a complete logo for it.',
  'Faça um autorretrato em estilo não realista': 'Make a self-portrait in a non-realistic style',
  'Desenhe a si mesmo em um estilo crazy.': 'Draw yourself in a crazy style.',
  'Ilustre uma criatura inventada por você': 'Illustrate a creature you invented',
  'Crie uma criatura totalmente original: descreva e desenhe sua anatomia, cores e habitat.': 'Create a totally original creature: describe and draw its anatomy, colors and habitat.',
  'Crie uma arte inspirada em uma música': 'Create art inspired by a song',
  'Escolha uma música e produza uma ilustração que traduza visualmente o que ela te faz sentir.': 'Pick a song and produce an illustration that visually expresses what it makes you feel.',
  'Desenhe uma cena noturna': 'Draw a night scene',
  'Crie uma arte ambientada à noite, explorando iluminação, sombras e atmosfera.': 'Create art set at night, exploring lighting, shadows and atmosphere.',
  'Crie um emote ou sticker para o grupo': 'Create an emote or sticker for the group',
  'Desenhe um emote/sticker que o grupo poderia usar no Discord. Capriche na expressividade.': 'Draw an emote/sticker the group could use on Discord. Go all out on expressiveness.',
  'Ilustre uma memória de infância': 'Illustrate a childhood memory',
  'Recrie em arte um momento marcante da sua infância, do jeito que você se lembra dele.': 'Recreate in art a memorable moment from your childhood, the way you remember it.',
  'Desenhe um personagem em três expressões diferentes': 'Draw a character in three different expressions',
  'Pegue um personagem (seu ou de outro) e mostre-o em três emoções distintas.': 'Take a character (yours or someone else\'s) and show it in three distinct emotions.',
  'Crie uma arte com tema de fantasia medieval': 'Create art with a medieval fantasy theme',
  'Produza uma ilustração no universo de fantasia: cavaleiros, magos, dragões, castelos — o que preferir.': 'Produce an illustration in the fantasy universe: knights, wizards, dragons, castles — whatever you prefer.',
  'Faça uma arte com tema de ficção científica': 'Make art with a science fiction theme',
  'Crie uma cena futurista ou espacial: naves, robôs, cidades neon, planetas distantes.': 'Create a futuristic or space scene: ships, robots, neon cities, distant planets.',
  'Redesenhe um vilão como herói (ou vice-versa)': 'Redraw a villain as a hero (or vice versa)',
  'Escolha um personagem conhecido e inverta seu papel, reimaginando seu visual de acordo.': 'Pick a well-known character and flip their role, reimagining their look accordingly.',
  'Crie uma paisagem usando uma referência real': 'Create a landscape using a real reference',
  'Use uma foto de um lugar real como referência e produza uma paisagem a partir dela.': 'Use a photo of a real place as reference and produce a landscape from it.',
  'Desenhe um objeto do cotidiano de forma épica': 'Draw an everyday object in an epic way',
  'Pegue um objeto comum (uma caneca, um chinelo, um controle) e ilustre-o como se fosse um item lendário.': 'Take a common object (a mug, a flip-flop, a controller) and illustrate it as if it were a legendary item.',
  'Crie um design de carta colecionável': 'Create a collectible card design',
  'Desenhe uma carta no estilo de card game (com moldura, arte e atributos) para um personagem à sua escolha.': 'Draw a card in card-game style (with frame, art and stats) for a character of your choice.',
  'Reimagine o avatar de outro membro do grupo': "Reimagine another group member's avatar",
  'Escolha o avatar de pixel art de alguém do grupo e recrie-o no seu estilo, como uma homenagem.': "Pick someone's pixel art avatar from the group and recreate it in your style, as a tribute.",
  'Faça uma arte sobre pesca': 'Make art about fishing',
  'Crie uma ilustração com tema de pesca: um pescador, o mar, um lago tranquilo, aquele peixão lendário fisgado — você decide a cena e o clima.': 'Create a fishing-themed illustration: a fisherman, the sea, a calm lake, that legendary big catch on the hook — you decide the scene and mood.',
};

// Regras com número/variáveis: [regex ancorado, substituição]
const EN_RULES = [
  [/^Temporada (\d+) · (\d+)$/, 'Season $1 · $2'],
  [/^· Temporada (\d+)$/, '· Season $1'],
  [/^Temporada (\d+) encerrada$/, 'Season $1 ended'],
  [/^Temporada (\d+) concluida$/, 'Season $1 complete'],
  [/^Temporada (\d+)$/, 'Season $1'],
  [/^Encerrar Temporada (\d+)$/, 'End Season $1'],
  [/^Data final da Temporada (\d+)$/, 'Season $1 end date'],
  [/^Iniciar Temporada (\d+)$/, 'Start Season $1'],
  [/^Encerrar e iniciar Temporada (\d+)$/, 'End and start Season $1'],
  [/^Clique para encerrar esta temporada e abrir a Temporada (.+) para todos\.$/, 'Click to end this season and open Season $1 for everyone.'],
  [/^Não consigo ler "(.+)"\. Use MP3, WAV, M4A ou MP4\.$/, "Can't read \"$1\". Use MP3, WAV, M4A or MP4."],
  [/^Não consigo ler "(.+)"\. Formato não suportado\.$/, "Can't read \"$1\". Unsupported format."],
  [/^Convertendo (vídeo|áudio) (\d+)%$/, (m, k, n) => `Converting ${k === 'vídeo' ? 'video' : 'audio'} ${n}%`],
  [/^(\d+)m atrás$/, '$1m ago'], [/^(\d+)h atrás$/, '$1h ago'], [/^(\d+)d atrás$/, '$1d ago'],
  [/^(\d+) membros?$/, '$1 members'],
  [/^(\d+) \/ (\d+) prontos$/, '$1 / $2 ready'],
  [/^faltam (\d+) dias pro Skrill Day$/, '$1 days to Skrill Day'], [/^falta 1 dia pro Skrill Day$/, '1 day to Skrill Day'],
  [/^faltam (\d+) horas pro Skrill Day$/, '$1 hours to Skrill Day'], [/^falta 1 hora pro Skrill Day$/, '1 hour to Skrill Day'],
  [/^faltam (\d+) minutos pro Skrill Day$/, '$1 minutes to Skrill Day'], [/^falta 1 minuto pro Skrill Day$/, '1 minute to Skrill Day'],
  [/^Distribua seus (\d+) pontos bônus entre as entregas\. Você pode dar para si mesmo\.( Distribuição anônima\.)?$/, (m, n, anon) => `Distribute your ${n} bonus points among the deliveries. You can give to yourself.${anon ? ' Anonymous distribution.' : ''}`],
  [/^(\d+) metas? entregues?$/, (m, n) => `${n} goal${n === '1' ? '' : 's'} delivered`],
  [/^(\d+) tentativas?$/, (m, n) => `${n} attempt${n === '1' ? '' : 's'}`],
  [/^Distribua todos os (\d+) pontos para enviar$/, 'Distribute all $1 points to submit'],
  [/^(\d+)pts total$/, '$1pts total'],
  [/^Sua tentativa · (\d+) a favor, (\d+) contra$/, 'Your attempt · $1 for, $2 against'],
  [/^Entregas \((\d+)\)$/, 'Deliveries ($1)'],
  [/^(\d+) avaliações recebidas$/, '$1 ratings received'],
  [/^Tentativa(s)? \((\d+)\)$/, 'Attempts ($2)'],
  [/^Metas \((\d+)\)$/, 'Goals ($1)'],
  [/^(\d+) confirmados$/, '$1 confirmed'],
  [/^(\d+) concluíram$/, '$1 completed'],
];

// Elementos cujo texto é conteúdo de usuário: nunca traduzir
const SKIP_SEL = 'script,style,textarea,input,.goal-title,.goal-desc,.goal-username,.attempt-reflection,.avatar,[data-i18n-skip]';
const ATTRS = ['placeholder', 'title', 'alt', 'aria-label'];

function t(str) {
  if (LANG !== 'en' || typeof str !== 'string') return str;
  const lead = str.match(/^\s*/)[0], trail = str.match(/\s*$/)[0];
  const core = str.trim().replace(/\s+/g, ' ');
  if (!core) return str;
  if (Object.prototype.hasOwnProperty.call(EN, core)) return lead + EN[core] + trail;
  for (const [re, rep] of EN_RULES) if (re.test(core)) return lead + core.replace(re, rep) + trail;
  // prefixo decorativo: ">> Texto", "[G] Texto", "+ Texto"
  const pre = core.match(/^(>>\s+|\[\w\]\s+)(.+)$/);
  if (pre) { const r = t(pre[2]); if (r !== pre[2]) return lead + pre[1] + r + trail; }
  // "Título — X" do <title>
  const m = core.match(/^SKRILL — (.+)$/);
  if (m && Object.prototype.hasOwnProperty.call(EN, m[1])) return lead + 'SKRILL — ' + EN[m[1]] + trail;
  return str;
}

if (LANG === 'en') {
  document.documentElement.lang = 'en';

  const tNode = n => {
    if (n.nodeType === 3) {
      if (n.parentElement?.closest(SKIP_SEL)) return;
      const v = t(n.nodeValue);
      if (v !== n.nodeValue) n.nodeValue = v;
    } else if (n.nodeType === 1) {
      if (n.matches?.(SKIP_SEL)) { return; }
      for (const a of ATTRS) {
        const v = n.getAttribute(a);
        if (v) { const tv = t(v); if (tv !== v) n.setAttribute(a, tv); }
      }
      for (const c of n.childNodes) tNode(c);
    }
  };

  const run = () => {
    tNode(document.documentElement);
    new MutationObserver(recs => {
      for (const r of recs) {
        if (r.type === 'childList') r.addedNodes.forEach(tNode);
        else if (r.type === 'characterData') tNode(r.target);
        else if (r.type === 'attributes') tNode(r.target);
      }
    }).observe(document.documentElement, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ATTRS,
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();

  const _confirm = window.confirm.bind(window), _alert = window.alert.bind(window);
  window.confirm = m => _confirm(t(m));
  window.alert   = m => _alert(t(m));
}
