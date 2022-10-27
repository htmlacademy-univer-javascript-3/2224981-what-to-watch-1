import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiRoutes} from '../const/api-routes';
import {AppDispatch, AppState} from '../types/app-state';
import {AxiosInstance} from 'axios';
import FilmInfo from '../types/film-info';
import {fillAllFilms, requireAuth, setAppStatus} from './action';
import AuthStatus from '../const/auth-status';
import {dropToken, saveToken} from '../services/token';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {AppStatus} from '../types/app-status';

export enum AsyncActionNames {
  GetFilms = 'films/getFilms'
}

export const fetchGetFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance
}>(AsyncActionNames.GetFilms,
  async (_arg, {dispatch, extra: api}) => { // api is alias name for extra param
    dispatch(setAppStatus(AppStatus.Loading));
    const {data} = await api.get<FilmInfo[]>(ApiRoutes.Films);
    dispatch(fillAllFilms(data));
    dispatch(setAppStatus(AppStatus.Ok));
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
  async ({login: email, password}, {dispatch, extra: api}) => {
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
