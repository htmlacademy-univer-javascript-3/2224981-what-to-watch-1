import FilmInfo from './film-info';
import {store} from '../store';
import AuthStatus from '../const/auth-status';
import {AppStatus} from './app-status';

export type AppState = {
  selectedGenre: string,
  oneGenreFilms: FilmInfo[],
  films: FilmInfo[],
  status: AppStatus,
  auth: AuthStatus,
  error: string | null
}

export type AppDispatch = typeof store.dispatch;
export const dispatch: AppDispatch = store.dispatch;
