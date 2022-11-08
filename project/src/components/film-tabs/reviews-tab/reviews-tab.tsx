import ReadyReview from '../../ready-review/ready-review';
import {useAppSelector} from '../../../hooks/store-hooks';

function ReviewsTab() {
  const comments = useAppSelector((state) => state.filmsSlice.comments);

  if (!comments) {
    return (<div>{null}</div>);
  }

  const length = comments.length;
  const leftColumn = comments.slice(0, length / 2 + 1);
  const rightColumn = comments.slice(length / 2 + 1);

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
