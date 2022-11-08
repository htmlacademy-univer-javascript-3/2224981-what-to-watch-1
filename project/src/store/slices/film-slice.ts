import FilmInfo from '../../types/film-info';
import {Comment} from '../../types/comment';
import {createSlice} from '@reduxjs/toolkit';

export type FilmState = {
  selectedGenre: string,
  oneGenreFilms: FilmInfo[],
  films: FilmInfo[],
  film: FilmInfo | null,
  comments: Comment[]
}

const initState: FilmState = {
  selectedGenre: 'all',
  oneGenreFilms: [],
  films: [],
  film: null,
  comments: []
};

const filmSlice = createSlice({
  name: 'filmSlice',
  initialState: initState,
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
    }
  }
});

export const {selectGenre, setFilmsByGenre, fillAllFilms, setFilm, setComments} = filmSlice.actions;
export default filmSlice.reducer;
