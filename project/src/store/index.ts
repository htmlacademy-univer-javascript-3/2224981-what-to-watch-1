import {configureStore} from '@reduxjs/toolkit';
import {createApi} from '../services/api';
import {redirect} from './middlewares/redirect';
import {rootReducer} from './reducer';

export const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const dispatch: AppDispatch = store.dispatch;
