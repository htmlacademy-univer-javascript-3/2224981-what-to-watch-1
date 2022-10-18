import ReadyReview from '../../ready-review/ready-review';
import {reviewMocks} from '../../../mocks/reviews';

function ReviewsTab() {
  const length = reviewMocks.length;
  const leftColumn = reviewMocks.slice(0, length / 2 + 1);
  const rightColumn = reviewMocks.slice(length / 2 + 1);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {leftColumn.map((item) => <ReadyReview key={item.id} review={item}/>)}
      </div>
      <div className="film-card__reviews-col">
        {rightColumn.map((item) => <ReadyReview key={item.id} review={item}/>)}
      </div>
    </div>
  );
}

export default ReviewsTab;
