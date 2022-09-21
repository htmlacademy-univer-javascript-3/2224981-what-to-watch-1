import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import FilmInfo from './types/FilmInfo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const currentFilm: FilmInfo = {
  title: 'Fantastic Beasts: The Crimes of Grindelwald',
  genre: 'Drama',
  releaseYear: 2014
};

root.render(
  <React.StrictMode>
    <App filmPromo={currentFilm} />
  </React.StrictMode>,
);
