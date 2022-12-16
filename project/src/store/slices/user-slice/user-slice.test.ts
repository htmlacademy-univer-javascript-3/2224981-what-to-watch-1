import {INIT_STATE, userSlice, UserState} from './user-slice';
import {checkAuthAction, getUserData, loginAction, logoutAction} from '../../api-actions/api-actions';
import AuthStatus from '../../../const/auth-status';
import {UserData} from '../../../types/user-data';

const userMock: UserData = {
  id: 100,
  name: 'Kodjima',
  email: 'email@email.email',
  avatarUrl: 'avatar.com/100',
  token: 'jwt'
};

describe('Reducer: user-slice', () => {
  let state: UserState;

  beforeEach(() => {
    state = INIT_STATE;
  });

  it('without additional parameters doesnt change state', () => {
    expect(userSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(INIT_STATE);
  });

  describe('Testing checkAuthAction', () => {
    it('has AuthStatus.Auth if fulfilled', () => {
      expect(userSlice.reducer(state, {type: checkAuthAction.fulfilled.type}))
        .toEqual({auth: AuthStatus.Auth, user: null});
    });

    it('has AuthStatus.NoAuth if rejected', () => {
      expect(userSlice.reducer(state,
        {type: checkAuthAction.rejected.type}))
        .toEqual({auth: AuthStatus.NoAuth, user: null});
    });
  });

  describe('Testing loginAction', () => {
    it('has non-null user and Auth status if fulfilled', () => {
      const actual = userSlice.reducer(state, {type: loginAction.fulfilled.type, payload: userMock});
      expect(actual)
        .toEqual({auth: AuthStatus.Auth, user: userMock});
    });

    it('has NoAuth status if rejected', () => {
      expect(userSlice.reducer(state, {type: loginAction.rejected.type}))
        .toEqual({auth: AuthStatus.NoAuth, user: null});
    });
  });

  it('has NoAuth when logoutAction is fulfilled', () => {
    expect(userSlice.reducer(state, {type: logoutAction.fulfilled.type}))
      .toEqual({auth: AuthStatus.NoAuth, user: null});
  });

  it('has user info when getUserData is fulfilled', () => {
    expect(userSlice.reducer(state, {type: getUserData.fulfilled.type, payload: userMock}))
      .toEqual({auth: AuthStatus.Unknown, user: userMock});
  });

});
