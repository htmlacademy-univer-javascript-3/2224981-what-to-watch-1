import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {rootReducer} from '../reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'sync/app/redirect') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
