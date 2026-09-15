// Placeholder card set. Swap CARDS/CARD_SET when real study cards arrive —
// card_set is stored per submission so old and new data never mix in aggregates.
const CARD_SET = 'alphabet-v1';
const CARDS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({ id: letter, label: letter }));
