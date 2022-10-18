import FilmInfo from '../types/film-info';


export function findById(films: FilmInfo[], id: number) {
  return films.find((f: FilmInfo) => f.id === id);
}

export function findSimilarByGenre(films: FilmInfo[], currentId: number, genre: string) {
  return films.filter((f) => f.genre === genre && f.id !== currentId);
}
