import FilmInfo from './film-info';
import {store} from '../store';
import AuthStatus from '../const/auth-status';
import {AppStatus} from './app-status';
import {Comment} from './comment';

export type AppState = {
  selectedGenre: string,
  oneGenreFilms: FilmInfo[],
  films: FilmInfo[],
  film: FilmInfo | null,
  status: AppStatus,
  auth: AuthStatus,
  comments: Comment[],
  error: string | null
}

export type AppDispatch = typeof store.dispatch;
export const dispatch: AppDispatch = store.dispatch;
