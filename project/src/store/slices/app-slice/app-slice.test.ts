import {AppState, initState, setAppStatus, setError} from './app-slice';
import reducer from './app-slice';
import {AppStatus} from '../../../types/app-status';

describe('Reducer: app-slice', () => {
  let state: AppState;

  beforeEach(() => {
    state = initState;
  });

  it('sets error', () => {
    expect(reducer(state, setError('Some error')))
      .toEqual({status: AppStatus.Ok, error: 'Some error'});
  });

  it('clears error', () => {
    expect(reducer(state, setError(null)))
      .toEqual({status: AppStatus.Ok, error: null});
  });

  it('sets app status', () => {
    expect(reducer(state, setAppStatus(AppStatus.Loading)))
      .toEqual({status: AppStatus.Loading, error: null});
  });
});
