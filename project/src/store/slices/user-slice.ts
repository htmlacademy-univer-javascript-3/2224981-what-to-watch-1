import {createSlice} from '@reduxjs/toolkit';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import AuthStatus from '../../const/auth-status';

export type UserState = {
  auth: AuthStatus
};

const initialState: UserState = {
  auth: AuthStatus.Unknown
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.auth = AuthStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state, action) => {
        state.auth = AuthStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.auth = AuthStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.auth = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.auth = AuthStatus.NoAuth;
      });
  }
});
