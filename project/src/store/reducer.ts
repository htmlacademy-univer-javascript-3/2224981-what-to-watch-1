import {createReducer} from '@reduxjs/toolkit';
import {fillAllFilms, getFilmsByGenre, selectGenre} from './action';
import {findByGenre} from '../utils/film-manager';
import {AppState} from '../types/app-state';

const initialState: AppState = {
  selectedGenre: 'all',
  oneGenreFilms: [],
  films: []
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
    });
});

export {reducer};
