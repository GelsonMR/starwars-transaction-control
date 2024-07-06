export const normalizeString = (string: string = '') =>
  string
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

export const toLocaleDate = (date: string = '') =>
  new Date(date).toLocaleString();
