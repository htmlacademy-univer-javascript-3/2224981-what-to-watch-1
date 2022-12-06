import {
  fillAllFilms,
  FilmState,
  initState,
  selectGenre,
  setComments,
  setFavorites,
  setFilm,
  setFilmsByGenre
} from './film-slice';
import reducer from './film-slice';
import FilmInfo from '../../../types/film-info';
import {Comment} from '../../../types/comment';

const filmMocks: FilmInfo[] = [
  {
    'name': 'Snatch',
    'posterImage': 'https://10.react.pages.academy/static/film/poster/Snatch.jpg',
    'previewImage': 'https://10.react.pages.academy/static/film/preview/snatch.jpg',
    'backgroundImage': 'https://10.react.pages.academy/static/film/background/Snatch.jpg',
    'backgroundColor': '#FDFDFC',
    'description': 'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.',
    'rating': 0.2,
    'scoresCount': 716577,
    'director': 'Guy Ritchie',
    'starring': [
      'Jason Statham',
      'Brad Pitt',
      'Benicio Del Toro'
    ],
    'runTime': 104,
    'genre': 'Comedy',
    'released': 2000,
    'id': 1,
    'isFavorite': false,
    'videoLink': 'https://10.react.pages.academy/static/film/video/matrix.mp4',
    'previewVideoLink': 'https://10.react.pages.academy/static/film/video/dog.mp4'
  },
  {
    'name': 'Gangs of new york',
    'posterImage': 'https://10.react.pages.academy/static/film/poster/Gangs_of_New_York_Poster.jpg',
    'previewImage': 'https://10.react.pages.academy/static/film/preview/gangs_of_new_york.jpg',
    'backgroundImage': 'https://10.react.pages.academy/static/film/background/gangs_of_new_york.jpg',
    'backgroundColor': '#A6B7AC',
    'description': 'In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father\'s killer.',
    'rating': 8.8,
    'scoresCount': 370881,
    'director': 'Martin Scorsese',
    'starring': [
      'Leonardo DiCaprio',
      'Cameron Diaz',
      'Daniel Day-Lewis'
    ],
    'runTime': 167,
    'genre': 'Crime',
    'released': 2002,
    'id': 2,
    'isFavorite': false,
    'videoLink': 'https://10.react.pages.academy/static/film/video/matrix.mp4',
    'previewVideoLink': 'https://10.react.pages.academy/static/film/video/dog.mp4'
  },
  {
    'name': 'War of the Worlds',
    'posterImage': 'https://10.react.pages.academy/static/film/poster/War_of_the_Worlds.jpg',
    'previewImage': 'https://10.react.pages.academy/static/film/preview/war-of-the-worlds.jpg',
    'backgroundImage': 'https://10.react.pages.academy/static/film/background/War_of_the_Worlds.jpg',
    'backgroundColor': '#9B7E61',
    'description': 'As Earth is invaded by alien tripod fighting machines, one family fights for survival.',
    'rating': 9.3,
    'scoresCount': 386834,
    'director': 'Steven Spielberg',
    'starring': [
      'Tom Cruise',
      'Dakota Fanning',
      'Tim Robbins'
    ],
    'runTime': 116,
    'genre': 'Adventure',
    'released': 2005,
    'id': 3,
    'isFavorite': false,
    'videoLink': 'https://10.react.pages.academy/static/film/video/matrix.mp4',
    'previewVideoLink': 'https://10.react.pages.academy/static/film/video/traffic.mp4'
  }
];

const commentsMocks: Comment[] = [
  {
    'id': 1,
    'user': {
      'id': 17,
      'name': 'Emely'
    },
    'rating': 9.9,
    'comment': 'I personally found this movie to be boring. Definitely one of the most boring movies I\'ve ever seen.',
    'date': '2022-06-03T12:25:36.946Z'
  }
];

describe('Reducer: film-slice', () => {
  let state: FilmState;

  beforeEach(() => {
    state = initState;
  });

  it('sets selected genre', () => {
    expect(reducer(state, selectGenre('genre1')))
      .toMatchObject({selectedGenre: 'genre1'});
  });

  it('sets films by genre', () => {
    expect(reducer(state, setFilmsByGenre(filmMocks)))
      .toMatchObject({oneGenreFilms: filmMocks});
  });

  it('fills all films', () => {
    expect(reducer(state, fillAllFilms(filmMocks)))
      .toMatchObject({films: filmMocks});
  });

  it('sets film', () => {
    expect(reducer(state, setFilm(filmMocks[0])))
      .toMatchObject({film: filmMocks[0]});
  });

  it('sets comments', () => {
    expect(reducer(state, setComments(commentsMocks)))
      .toMatchObject({comments: commentsMocks});
  });

  it('sets favorites', () => {
    expect(reducer(state, setFavorites(filmMocks)))
      .toMatchObject({favorites: filmMocks});
  });
});
