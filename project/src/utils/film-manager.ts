import FilmInfo from '../types/film-info';

export function toGenreDict(films: FilmInfo[]) {
  const result: {[index: string]: FilmInfo[]} = {};

  films.forEach((value) => {
    (result[value.genre] = result[value.genre] || []).push(value);
  });

  return result;
}
