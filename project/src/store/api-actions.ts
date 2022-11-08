import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiRoutes} from '../const/api-routes';
import {AxiosInstance} from 'axios';
import FilmInfo from '../types/film-info';
import {
  setAppStatus,
} from './slices/app-slice';

import {dropToken, saveToken} from '../services/token';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {AppStatus} from '../types/app-status';
import {Comment} from '../types/comment';
import {AppDispatch, RootState} from './index';
import {fillAllFilms, setComments, setFilm, setFilmsByGenre} from './slices/film-slice';
import {redirectToRoute} from './actions';

export const fetchGetFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>('films/getFilms',
  async (_arg, {dispatch, extra: api}) => { // api is alias name for extra param
    dispatch(setAppStatus(AppStatus.Loading));
    const {data} = await api.get<FilmInfo[]>(ApiRoutes.Films);
    dispatch(fillAllFilms(data));
    dispatch(setAppStatus(AppStatus.Ok));
  }
);

export const sendComment = createAsyncThunk<void, {filmId: number, comment: string, rating: number}, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>('films/postComment',
  async (arg, {dispatch, extra: api}) => {
    dispatch(setAppStatus(AppStatus.Loading));
    const data = {comment: arg.comment, rating: arg.rating};
    await api.post<Comment>(`${ApiRoutes.Comments}/${arg.filmId}`, data);
    dispatch(redirectToRoute(`${ApiRoutes.Films}/${arg.filmId}`));
    dispatch(setAppStatus(AppStatus.Ok));
  });

export const getFullFilmInfo = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>('films/getFilms',
  async (arg, {dispatch, extra: api}) => {
    //dispatch(setAppStatus(AppStatus.Loading));
    dispatch(getFilmById(arg));
    dispatch(getFilmReviews(arg));
    dispatch(getFilmsByGenreAction(arg));
    //dispatch(setAppStatus(AppStatus.Ok));
  }
);

export const getFilmReviews = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>('films/reviews',
  async (arg, {dispatch, extra: api}) => {
    const {data} = await api.get(`${ApiRoutes.Comments}/${arg}`);
    dispatch(setComments(data));
  });

export const getFilmById = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>('films/filmInfo',
  async (arg, {dispatch, extra: api}) => {
    const {data} = await api.get(`${ApiRoutes.Films}/${arg}`);
    dispatch(setFilm(data));
  }
);

export const getFilmsByGenreAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>('films/sameGenre',
  async (arg, {dispatch, extra: api}) => {
    const {data} = await api.get(`${ApiRoutes.Films}/${arg}${ApiRoutes.Similar}`);
    dispatch(setFilmsByGenre(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, rejectWithValue, extra: api}) => {
    const res = await api.get(ApiRoutes.Login);
    if (res.status !== 200) {
      rejectWithValue('');
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(ApiRoutes.Login, {email, password});
    saveToken(token);
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoutes.Logout);
    dropToken();
  },
);
