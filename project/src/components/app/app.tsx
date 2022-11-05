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
import {AppState} from '../../types/app-state';

import {useSelector} from 'react-redux';
import {AppStatus} from '../../types/app-status';
import Spinner from '../spinner/spinner';
import {filmMocks} from '../../mocks/films';

function App(): JSX.Element {
  const {auth, status} = useSelector((state: AppState) => state);

  if (auth === AuthStatus.Unknown || status === AppStatus.Loading) {
    return (
      <Spinner/>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path={'/'}>
          <Route index element={<MainPage/>}/>
          <Route path={AppRoutes.Login} element={<LoginPage/>}/>
          <Route path={AppRoutes.MyList} element={
            <PrivateRoute status={AuthStatus.NoAuth}>
              <MyListPage films={filmMocks}/>
            </PrivateRoute>
          }
          />
          <Route path={`${AppRoutes.FilmsRoot}:id`}>
            <Route index element={<FilmPage/>}/>
            <Route path={AppRoutes.FilmsReview} element={<ReviewPage/>}/>
          </Route>
          <Route path={`${AppRoutes.PlayerRoot}:id`}>
            <Route index element={<PlayerPage film={filmMocks[2]}/>}/>
          </Route>
        </Route>
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
