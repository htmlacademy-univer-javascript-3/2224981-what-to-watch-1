import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthAction, fetchGetFilmsAction} from './store/api-actions/api-actions';
import {dispatch} from './store';

dispatch(fetchGetFilmsAction());
dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
