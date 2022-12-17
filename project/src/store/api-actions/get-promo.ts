import {createAsyncThunk} from '@reduxjs/toolkit';
import FilmInfo from '../../types/film-info';
import {AppDispatch, RootState} from '../index';
import {AxiosInstance} from 'axios';
import {ApiRoutes} from '../../const/api-routes';

export const getPromo = createAsyncThunk<FilmInfo, undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'films/getPromo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get(`${ApiRoutes.Promo}`);
    return data;
  }
);
