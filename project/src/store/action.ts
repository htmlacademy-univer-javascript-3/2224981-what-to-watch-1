import {createAction} from '@reduxjs/toolkit';
import FilmInfo from '../types/film-info';
import AuthStatus from '../const/auth-status';
import {AppStatus} from '../types/app-status';

export enum Action {
  SelectGenre = 'films/selectGenre',
  GetFilmsByGenre = 'films/byGenre',
  FillAllFilms = 'films/fillAll',
  RequireAuth = 'auth/require',
  SetError = 'app/error',
  SetAppStatus = 'app/status'
}

export const selectGenre = createAction<string>(Action.SelectGenre);
export const getFilmsByGenre = createAction(Action.GetFilmsByGenre);
export const fillAllFilms = createAction<FilmInfo[]>(Action.FillAllFilms);

export const requireAuth = createAction<AuthStatus>(Action.RequireAuth);
export const setError = createAction<string | null>(Action.SetError);

export const setAppStatus = createAction<AppStatus>(Action.SetAppStatus);
