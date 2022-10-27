import {createReducer} from '@reduxjs/toolkit';
import {fillAllFilms, getFilmsByGenre, requireAuth, selectGenre, setError} from './action';
import {findByGenre} from '../utils/film-manager';
import {AppState} from '../types/app-state';
import AuthStatus from '../const/auth-status';
import {AppStatus} from '../types/app-status';

const initialState: AppState = {
  selectedGenre: 'all',
  oneGenreFilms: [],
  films: [],
  status: AppStatus.Ok,
  auth: AuthStatus.Unknown,
  error: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectGenre, (state, action) => {
      state.selectedGenre = action.payload;
    })
    .addCase(getFilmsByGenre, (state) => {
      state.oneGenreFilms = findByGenre(state.films, state.selectedGenre);
    })
    .addCase(fillAllFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(requireAuth, (state, action) =>{
      state.auth = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
