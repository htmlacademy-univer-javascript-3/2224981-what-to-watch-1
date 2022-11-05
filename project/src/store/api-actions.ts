import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiRoutes} from '../const/api-routes';
import {AppDispatch, AppState} from '../types/app-state';
import {AxiosInstance} from 'axios';
import FilmInfo from '../types/film-info';
import {
  fillAllFilms,
  redirectToRoute,
  requireAuth,
  setAppStatus,
  setComments,
  setFilm,
  setFilmsByGenre
} from './action';
import AuthStatus from '../const/auth-status';
import {dropToken, saveToken} from '../services/token';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {AppStatus} from '../types/app-status';
import {Comment} from '../types/comment';

export const fetchGetFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: AppState,
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
  state: AppState,
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
  state: AppState,
  extra: AxiosInstance
}>('films/getFilms',
  async (arg, {dispatch, extra: api}) => {
    dispatch(setAppStatus(AppStatus.Loading));
    dispatch(getFilmById(arg));
    dispatch(getFilmReviews(arg));
    dispatch(getFilmsByGenreAction(arg));
    dispatch(setAppStatus(AppStatus.Ok));
  }
);

export const getFilmReviews = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance
}>('films/reviews',
  async (arg, {dispatch, extra: api}) => {
    const {data} = await api.get(`${ApiRoutes.Comments}/${arg}`);
    dispatch(setComments(data));
  });

export const getFilmById = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance
}>('films/filmInfo',
  async (arg, {dispatch, extra: api}) => {
    const {data} = await api.get(`${ApiRoutes.Films}/${arg}`);
    dispatch(setFilm(data));
  }
);

export const getFilmsByGenreAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance
}>('films/sameGenre',
  async (arg, {dispatch, extra: api}) => {
    const {data} = await api.get(`${ApiRoutes.Films}/${arg}${ApiRoutes.Similar}`);
    dispatch(setFilmsByGenre(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(ApiRoutes.Login);
      dispatch(requireAuth(AuthStatus.Auth));
    } catch {
      dispatch(requireAuth(AuthStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(ApiRoutes.Login, {email, password});
    saveToken(token);
    dispatch(requireAuth(AuthStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoutes.Logout);
    dropToken();
    dispatch(requireAuth(AuthStatus.NoAuth));
  },
);
