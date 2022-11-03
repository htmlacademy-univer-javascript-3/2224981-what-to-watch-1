import FilmList from '../../components/film-list/film-list';
import FilmInfo from '../../types/film-info';
import Header, {HeaderClass} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';

type MyListPageProps = {
  films: FilmInfo[];
}

function MyListPage(props: MyListPageProps): JSX.Element {
  return (
    <div className="user-page">
      <Header showAvatar headerClass={HeaderClass.UserPage}/>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={props.films} showGenres/>
      </section>

      <Footer/>
    </div>
  );
}

export default MyListPage;
