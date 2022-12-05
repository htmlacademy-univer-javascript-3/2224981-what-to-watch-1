import {combineReducers} from '@reduxjs/toolkit';
import appReducer from './slices/app-slice/app-slice';
import filmSliceReducer from './slices/film-slice/film-slice';
import {userSlice} from './slices/user-slice/user-slice';

export const rootReducer = combineReducers({
  appSlice: appReducer,
  filmsSlice: filmSliceReducer,
  userSlice: userSlice.reducer
});
