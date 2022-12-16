import FilmInfo from '../../../types/film-info';
import {Comment} from '../../../types/comment';
import {createSlice} from '@reduxjs/toolkit';
import {getPromo} from '../../api-actions/api-actions';

export type FilmState = {
  selectedGenre: string,
  oneGenreFilms: FilmInfo[],
  films: FilmInfo[],
  film: FilmInfo | null,
  comments: Comment[],
  favorites: FilmInfo[],
  promo: FilmInfo | null
}

export const INIT_STATE: FilmState = {
  selectedGenre: 'all',
  oneGenreFilms: [],
  films: [],
  film: null,
  comments: [],
  favorites: [],
  promo: null
};

const filmSlice = createSlice({
  name: 'filmSlice',
  initialState: INIT_STATE,
  reducers: {
    selectGenre(state, action) {
      state.selectedGenre = action.payload;
    },
    setFilmsByGenre(state, action) {
      state.oneGenreFilms = action.payload;
    },
    fillAllFilms(state, action) {
      state.films = action.payload;
    },
    setFilm(state, action) {
      state.film = action.payload;
    },
    setComments(state, action) {
      state.comments = action.payload;
    },
    setFavorites(state, action) {
      state.favorites = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPromo.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  }
});

export const {selectGenre, setFilmsByGenre, fillAllFilms, setFilm, setComments, setFavorites} = filmSlice.actions;
export default filmSlice.reducer;
