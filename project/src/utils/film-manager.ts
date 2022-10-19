import FilmInfo from '../types/film-info';


export function findById(films: FilmInfo[], id: number) {
  return films.find((f: FilmInfo) => f.id === id);
}

export function findByGenre(films: FilmInfo[], genre: string, currentId?: number) {
  return films.filter((f) => f.genre === genre && (f.id !== currentId || !currentId));
}

export function toGenreDict(films: FilmInfo[]) {
  const result: {[index: string]: FilmInfo[]} = {};

  films.forEach((value) => {
    (result[value.genre] = result[value.genre] || []).push(value);
  });

  return result;
}
