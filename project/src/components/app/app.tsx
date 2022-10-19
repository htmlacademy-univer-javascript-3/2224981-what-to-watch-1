import MainPage from '../../pages/main/main-page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from '../../pages/login/login-page';
import AppRoutes from '../../const/app-routes';
import PrivateRoute from '../private-route/private-route';
import AuthStatus from '../../const/auth-status';
import MyListPage from '../../pages/my-list/my-list-page';
import FilmPage from '../../pages/film/film-page';
import PlayerPage from '../../pages/player/player-page';
import Page404 from '../page-404/page-404';
import ReviewPage from '../../pages/review/review-page';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../types/app-state';
import {fillAllFilms} from '../../store/action';
import {filmMocks} from '../../mocks/films';

function App(): JSX.Element {
  const dispatch = useDispatch();
  dispatch(fillAllFilms(filmMocks));

  const films = useSelector((state: AppState) => state.films);
  const filmPromo = films[0];

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path={AppRoutes.Root}>
          <Route index element={<MainPage filmPromo={filmPromo} films={films}/>}/>
          <Route path={AppRoutes.Login} element={<LoginPage/>}/>
          <Route path={AppRoutes.MyList} element={
            <PrivateRoute status={AuthStatus.NoAuth}>
              <MyListPage films={films}/>
            </PrivateRoute>
          }
          />
          <Route path={`${AppRoutes.FilmsRoot}:id`}>
            <Route index element={<FilmPage films={films}/>}/>
            <Route path={AppRoutes.FilmsReview} element={<ReviewPage film={films[1]}/>}/>
          </Route>
          <Route path={`${AppRoutes.PlayerRoot}:id`}>
            <Route index element={<PlayerPage film={films[2]}/>}/>
          </Route>
        </Route>
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
