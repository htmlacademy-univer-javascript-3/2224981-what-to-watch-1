import {ChangeEvent, useEffect, useState} from 'react';
import FilmInfo from '../../types/film-info';
import Page404 from '../page-404/page-404';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {sendComment} from '../../store/api-actions/api-actions';
import {redirectToRoute} from '../../store/actions';
import {ApiRoutes} from '../../const/api-routes';

type ReviewCommentFormProps = {
  film: FilmInfo;
}

type ReviewFormData = {
  rating: number,
  comment: string
};

function ReviewCommentForm(props: ReviewCommentFormProps): JSX.Element {
  const COMMENT_BORDERS = [50, 400];

  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.appSlice.error);

  const fieldChangeHandle = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    const newFormData: ReviewFormData = {...formData, [name]: value};
    setFormData(newFormData);
    validateForm(newFormData);
  };

  const validateRating = (rating: number) => rating > 0;
  const validateComment = (comment: string) => comment.length >= COMMENT_BORDERS[0];

  const validateForm = (data: ReviewFormData) => {
    setSubmitDisabled(!(validateComment(data.comment) &&
      validateRating(data.rating)));
  };

  const handleSubmit = () => {
    setSubmitDisabled(true);
    dispatch(sendComment({filmId: props.film.id, ...formData}))
      .then(() => {
        dispatch(redirectToRoute(`${ApiRoutes.Films}/${props.film.id}`));
      });
  };

  useEffect(() => {
    if (error) {
      setSubmitDisabled(false);
    }
  }, [error]);

  if (!props.film) {
    return <Page404/>;
  }

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            <input className="rating__input" onChange={fieldChangeHandle} id="star-10" type="radio" name="rating" value="10" required/>
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
          <textarea
            className="add-review__textarea"
            onChange={fieldChangeHandle}
            name="comment" id="review-text"
            placeholder="Review text"
            minLength={COMMENT_BORDERS[0]}
            maxLength={COMMENT_BORDERS[1]}
            required
            value={formData.comment}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={submitDisabled}>Post</button>
          </div>

        </div>
      </form>
      <div style={{marginTop: '10px', color: '#160203'}}>
        {error}
      </div>
    </div>
  );
}

export default ReviewCommentForm;
