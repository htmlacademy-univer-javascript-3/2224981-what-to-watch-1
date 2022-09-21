import MainPage from '../../pages/main/MainPage';
import FilmInfo from '../../types/FilmInfo';

function App(props: {filmPromo: FilmInfo}): JSX.Element {
  return (
    <MainPage filmPromo={props.filmPromo}></MainPage>
  );
}

export default App;
