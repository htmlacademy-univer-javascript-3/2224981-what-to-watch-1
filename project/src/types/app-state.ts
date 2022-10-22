import FilmInfo from './film-info';

export type AppState = {
  selectedGenre: string,
  oneGenreFilms: FilmInfo[],
  films: FilmInfo[]
}
