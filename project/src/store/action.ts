import {createAction} from '@reduxjs/toolkit';
import FilmInfo from '../types/film-info';
import AuthStatus from '../const/auth-status';
import {AppStatus} from '../types/app-status';
import {Comment} from '../types/comment';

export enum Action {
  SelectGenre = 'sync/films/selectGenre',
  GetFilmsByGenre = 'sync/films/byGenre',
  FillAllFilms = 'sync/films/fillAll',
  RequireAuth = 'sync/auth/require',
  SetError = 'sync/app/error',
  SetAppStatus = 'sync/app/status',
  SetFilm = 'sync/films/getFilm',
  SetComments = 'sync/films/setComments',
  Redirect = 'sync/app/redirect'
}

export const selectGenre = createAction<string>(Action.SelectGenre);
export const setFilmsByGenre = createAction<FilmInfo[]>(Action.GetFilmsByGenre);
export const fillAllFilms = createAction<FilmInfo[]>(Action.FillAllFilms);

export const requireAuth = createAction<AuthStatus>(Action.RequireAuth);
export const setError = createAction<string | null>(Action.SetError);

export const setAppStatus = createAction<AppStatus>(Action.SetAppStatus);
export const setFilm = createAction<FilmInfo | null>(Action.SetFilm);
export const setComments = createAction<Comment[]>(Action.SetComments);

export const redirectToRoute = createAction<string>(Action.Redirect);
