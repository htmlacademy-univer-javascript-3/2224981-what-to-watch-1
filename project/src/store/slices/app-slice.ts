import {AppStatus} from '../../types/app-status';
import {createSlice} from '@reduxjs/toolkit';

export type AppState = {
  status: AppStatus,
  error: string | null
};

const initState: AppState = {
  status: AppStatus.Ok,
  error: null
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState: initState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setAppStatus(state, action) {
      state.status = action.payload;
    }
  }
});

export const {setError, setAppStatus} = appSlice.actions;
export default appSlice.reducer;
