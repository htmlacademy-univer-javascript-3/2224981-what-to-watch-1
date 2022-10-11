import MainPage from '../../pages/main/main-page';
import FilmInfo from '../../types/film-info';
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

type AppProps = {
  filmPromo: FilmInfo,
  films: FilmInfo[]
}

function App(props: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Root}>
          <Route index element={<MainPage filmPromo={props.filmPromo} films={props.films}/>}/>
          <Route path={AppRoutes.Login} element={<LoginPage/>}/>
          <Route path={AppRoutes.MyList} element={
            <PrivateRoute status={AuthStatus.NoAuth}>
              <MyListPage films={props.films}/>
            </PrivateRoute>
          }
          />
          <Route path={`${AppRoutes.FilmsRoot}:id`}>
            <Route index element={<FilmPage film={props.films[1]} recommendedFilms={props.films.slice(0, 4)}/>}/>
            <Route path={AppRoutes.FilmsReview} element={<ReviewPage film={props.films[1]}/>}/>
          </Route>
          <Route path={`${AppRoutes.PlayerRoot}:id`}>
            <Route index element={<PlayerPage film={props.films[2]}/>}/>
          </Route>
        </Route>
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
