import FilmInfo from '../../types/film-info';
import {Link} from 'react-router-dom';
import AppRoutes from '../../const/app-routes';
import ReviewCommentForm from '../../components/review-comment-form/review-comment-form';
import Header, {HeaderClass} from '../../components/header/header';

type ReviewPaegeProps = {
  film: FilmInfo;
}

function ReviewPage(props: ReviewPaegeProps): JSX.Element {
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={props.film.previewImage}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header showAvatar headerClass={HeaderClass.Empty}>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoutes.FilmsRoot + props.film.id} className="breadcrumbs__link">{props.film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={props.film.posterImage} alt="The Grand Budapest Hotel poster" width="218"
            height="327"
          />
        </div>
      </div>

      <ReviewCommentForm/>

    </section>
  );
}

export default ReviewPage;
