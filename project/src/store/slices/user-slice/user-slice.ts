import {createSlice} from '@reduxjs/toolkit';
import {checkAuthAction, getUserData, loginAction, logoutAction} from '../../api-actions/api-actions';
import AuthStatus from '../../../const/auth-status';
import {UserData} from '../../../types/user-data';

export type UserState = {
  auth: AuthStatus,
  user: UserData | null
};

export const INIT_STATE: UserState = {
  auth: AuthStatus.Unknown,
  user: null
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: INIT_STATE,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.auth = AuthStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.auth = AuthStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.auth = AuthStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.auth = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.auth = AuthStatus.NoAuth;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.auth = AuthStatus.Auth;
        state.user = action.payload;
      })
      .addCase(getUserData.rejected, (state) => {
        state.auth = AuthStatus.NoAuth;
      });
  }
});
