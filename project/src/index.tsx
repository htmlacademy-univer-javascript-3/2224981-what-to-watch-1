import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import {filmMocks} from './mocks/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const currentFilm = filmMocks[0];

root.render(
  <React.StrictMode>
    <App filmPromo={currentFilm} films={filmMocks}/>
  </React.StrictMode>,
);
