import {createReducer} from '@reduxjs/toolkit';
import {
  fillAllFilms,
  setFilmsByGenre,
  requireAuth,
  selectGenre,
  setError,
  setFilm,
  setAppStatus,
  setComments
} from './action';
import {AppState} from '../types/app-state';
import AuthStatus from '../const/auth-status';
import {AppStatus} from '../types/app-status';

const initialState: AppState = {
  selectedGenre: 'all',
  oneGenreFilms: [],
  films: [],
  film: null,
  status: AppStatus.Ok,
  auth: AuthStatus.Unknown,
  comments: [],
  error: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectGenre, (state, action) => {
      state.selectedGenre = action.payload;
    })
    .addCase(setFilmsByGenre, (state, action) => {
      state.oneGenreFilms = action.payload;
    })
    .addCase(fillAllFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(requireAuth, (state, action) =>{
      state.auth = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(setAppStatus, (state, action) => {
      state.status = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    });
});

export {reducer};
