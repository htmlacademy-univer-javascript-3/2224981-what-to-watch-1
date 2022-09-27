import MainPage from '../../pages/main/main-page';
import FilmInfo from '../../types/film-info';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from '../../pages/login/login-page';
import AppRoutes from '../../const/app-routes';
import PrivateRoute from '../private_route/private-route';
import AuthStatus from '../../const/auth-status';
import MyListPage from '../../pages/my_list/my-list-page';
import FilmPage from '../../pages/film/film-page';
import PlayerPage from '../../pages/player/player-page';
import Page404 from '../page_404/page-404';
import ReviewPage from '../../pages/review/review-page';

function App(props: {filmPromo: FilmInfo}): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.ROOT}>
          <Route index element={<MainPage filmPromo={props.filmPromo}/>}/>
          <Route path={AppRoutes.LOGIN} element={<LoginPage/>}/>
          <Route path={AppRoutes.MY_LIST} element={
            <PrivateRoute status={AuthStatus.NO_AUTH}>
              <MyListPage/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoutes.FILMS_ROOT}>
            <Route path=':id'>
              <Route index element={<FilmPage/>}/>
              <Route path={AppRoutes.FILMS_REVIEW} element={<ReviewPage/>}/>
            </Route>
          </Route>
          <Route path={AppRoutes.PLAYER_ROOT}>
            <Route path=':id' element={<PlayerPage/>}/>
          </Route>
        </Route>
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
