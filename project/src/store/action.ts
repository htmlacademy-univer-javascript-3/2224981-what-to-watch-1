import {createAction} from '@reduxjs/toolkit';
import FilmInfo from '../types/film-info';

export enum Action {
  SelectGenre = 'SelectGenre',
  GetFilmsByGenre = 'GetFilmsByGenre',
  FillAllFilms = 'FillAllFilms'
}

export const selectGenre = createAction<string>(Action.SelectGenre);
export const getFilmsByGenre = createAction(Action.GetFilmsByGenre);
export const fillAllFilms = createAction<FilmInfo[]>(Action.FillAllFilms);
