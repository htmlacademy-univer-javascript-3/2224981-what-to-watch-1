import {ChangeEvent, useState} from 'react';
import FilmInfo from '../../types/film-info';
import Page404 from '../page-404/page-404';
import {useAppDispatch} from '../../hooks/store-hooks';
import {sendComment} from '../../store/api-actions';

type ReviewCommentFormProps = {
  film: FilmInfo;
}

function ReviewCommentForm(props: ReviewCommentFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    rating: 8,
    comment: ''
  });

  const dispatch = useAppDispatch();

  const fieldChangeHandle = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value}); // вычисляемое свойство объекта
  };

  const handleSubmit = () => {
    dispatch(sendComment({filmId: props.film.id, ...formData}));
  };

  if (!props.film) {
    return <Page404/>;
  }

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            <input className="rating__input" onChange={fieldChangeHandle} id="star-10" type="radio" name="rating" value="10"/>
            <label className="rating__label" htmlFor="star-10">Rating 10</label>

            <input className="rating__input" onChange={fieldChangeHandle} id="star-9" type="radio" name="rating" value="9"/>
            <label className="rating__label" htmlFor="star-9">Rating 9</label>

            <input className="rating__input" onChange={fieldChangeHandle} id="star-8" type="radio" name="rating" value="8"/>
            <label className="rating__label" htmlFor="star-8">Rating 8</label>

            <input className="rating__input" onChange={fieldChangeHandle} id="star-7" type="radio" name="rating" value="7"/>
            <label className="rating__label" htmlFor="star-7">Rating 7</label>

            <input className="rating__input" onChange={fieldChangeHandle} id="star-6" type="radio" name="rating" value="6"/>
            <label className="rating__label" htmlFor="star-6">Rating 6</label>

            <input className="rating__input" onChange={fieldChangeHandle} id="star-5" type="radio" name="rating" value="5"/>
            <label className="rating__label" htmlFor="star-5">Rating 5</label>

            <input className="rating__input" onChange={fieldChangeHandle} id="star-4" type="radio" name="rating" value="4"/>
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input className="rating__input" onChange={fieldChangeHandle} id="star-3" type="radio" name="rating" value="3"/>
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input className="rating__input" onChange={fieldChangeHandle} id="star-2" type="radio" name="rating" value="2"/>
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input className="rating__input" onChange={fieldChangeHandle} id="star-1" type="radio" name="rating" value="1"/>
            <label className="rating__label" htmlFor="star-1">Rating 1</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" onChange={fieldChangeHandle} name="comment" id="review-text"
            placeholder="Review text"
          >
            {formData.comment}
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default ReviewCommentForm;
