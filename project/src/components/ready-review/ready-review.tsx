import {FilmReview} from '../../types/film-review';
import {formatToCountryStandart, formatWithSeparator} from '../../utils/date-format';

type ReadyReviewProps = {
  review: FilmReview;
}

function ReadyReview({review}: ReadyReviewProps) {
  const date = new Date(review.date);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">
          {review.comment}
        </p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={formatWithSeparator(date, '-')}>
            {formatToCountryStandart(date, 'en-US')}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export default ReadyReview;
