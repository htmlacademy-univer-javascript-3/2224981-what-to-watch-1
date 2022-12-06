import {createSlice} from '@reduxjs/toolkit';
import {checkAuthAction, getUserData, loginAction, logoutAction} from '../../api-actions';
import AuthStatus from '../../../const/auth-status';
import {UserData} from '../../../types/user-data';

export type UserState = {
  auth: AuthStatus,
  user: UserData | null
};

export const initialState: UserState = {
  auth: AuthStatus.Unknown,
  user: null
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
      .addCase(loginAction.fulfilled, (state, action) => {
        state.auth = AuthStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.auth = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.auth = AuthStatus.NoAuth;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});
