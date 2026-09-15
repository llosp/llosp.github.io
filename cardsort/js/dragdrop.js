// Pointer-Events based drag-and-drop. No dependencies, no native HTML5 DnD
// (which doesn't support touch) — works identically for mouse and touch.
//
// Two kinds of drag, distinguished by which handle is grabbed at pointerdown:
//   'card' — grabbed via .card, dropped onto a [data-dropzone] (pool or a list body)
//   'list' — grabbed via .list-drag-handle, reordered within [data-reorder-track]
//
// initSortable(root, { onCardMove, onListReorder }) binds one delegated
// pointerdown listener on `root` — new cards/lists rendered later need no rebinding.
function initSortable(root, { onCardMove, onListReorder }) {
  const PROMOTE_PX = 6;
  let pending = null; // { pointerId, kind, id, startX, startY, el }
  let active = null;  // promoted drag: pending fields + ghost, lastZone, pendingIndex

  root.addEventListener('pointerdown', onPointerDown);

  function onPointerDown(e) {
    if (pending || active) return;
    if (e.button != null && e.button !== 0) return; // left click only for mouse

    const cardEl = e.target.closest('.card');
    const handleEl = e.target.closest('.list-drag-handle');
    if (!cardEl && !handleEl) return;

    if (cardEl) {
      pending = { pointerId: e.pointerId, kind: 'card', id: cardEl.dataset.cardId, startX: e.clientX, startY: e.clientY, el: cardEl };
    } else {
      const headerEl = handleEl.closest('.list-header');
      if (!headerEl) return;
      pending = { pointerId: e.pointerId, kind: 'list', id: headerEl.dataset.listId, startX: e.clientX, startY: e.clientY, el: headerEl };
    }

    pending.el.setPointerCapture(e.pointerId);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', onPointerUp);
    root.addEventListener('pointercancel', onPointerCancel);
  }

  function onPointerMove(e) {
    if (pending && pending.pointerId !== e.pointerId) return;
    if (active && active.pointerId !== e.pointerId) return;

    if (pending && !active) {
      const dx = e.clientX - pending.startX;
      const dy = e.clientY - pending.startY;
      if (Math.hypot(dx, dy) < PROMOTE_PX) return;
      promote();
    }
    if (!active) return;

    const dx = e.clientX - active.startX;
    const dy = e.clientY - active.startY;
    active.ghost.style.transform = `translate(${dx}px, ${dy}px)`;

    if (active.kind === 'card') hitTestCard(e);
    else hitTestList(e);
  }

  function onPointerUp(e) {
    cleanupMoveListeners();
    if (!active) { pending = null; return; }

    if (active.kind === 'card') {
      if (active.lastZone) onCardMove(active.id, active.lastZone.dataset.listId || null);
    } else if (active.pendingIndex != null) {
      onListReorder(active.id, active.pendingIndex);
    }
    teardownActive();
  }

  function onPointerCancel() {
    cleanupMoveListeners();
    if (active) teardownActive();
    pending = null;
  }

  function promote() {
    const rect = pending.el.getBoundingClientRect();
    const ghost = pending.el.cloneNode(true);
    ghost.classList.add('dnd-ghost');
    Object.assign(ghost.style, {
      position: 'fixed', left: rect.left + 'px', top: rect.top + 'px',
      width: rect.width + 'px', height: rect.height + 'px', margin: '0',
      pointerEvents: 'none', zIndex: '1000', willChange: 'transform',
    });
    document.body.appendChild(ghost);
    pending.el.classList.add('dragging-source');

    active = Object.assign(pending, { ghost, lastZone: null, pendingIndex: null });
    pending = null;
  }

  function hitTestCard(e) {
    active.ghost.style.display = 'none';
    const el = document.elementFromPoint(e.clientX, e.clientY);
    active.ghost.style.display = '';
    const zone = el && el.closest('[data-dropzone]');
    if (zone !== active.lastZone) {
      if (active.lastZone) active.lastZone.classList.remove('drag-over');
      if (zone) zone.classList.add('drag-over');
      active.lastZone = zone || null;
    }
  }

  function hitTestList(e) {
    const track = root.querySelector('[data-reorder-track]');
    if (!track) return;
    const headers = Array.from(track.querySelectorAll('.list-header')).filter(h => h !== active.el);
    let index = headers.length;
    for (let i = 0; i < headers.length; i++) {
      const r = headers[i].getBoundingClientRect();
      if (e.clientY < r.top + r.height / 2) { index = i; break; }
    }
    active.pendingIndex = index;
    headers.forEach(h => h.classList.remove('drag-over-before'));
    if (index < headers.length) headers[index].classList.add('drag-over-before');
  }

  function teardownActive() {
    active.ghost.remove();
    active.el.classList.remove('dragging-source');
    if (active.lastZone) active.lastZone.classList.remove('drag-over');
    root.querySelectorAll('.drag-over-before').forEach(h => h.classList.remove('drag-over-before'));
    active = null;
  }

  function cleanupMoveListeners() {
    root.removeEventListener('pointermove', onPointerMove);
    root.removeEventListener('pointerup', onPointerUp);
    root.removeEventListener('pointercancel', onPointerCancel);
  }
}
