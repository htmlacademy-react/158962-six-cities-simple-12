import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import { RATING_STARS, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH } from '../../const';
import {postComment, selectCommentsStatus } from '../../store/slices/comments-slice/comments-slice';
import {useAppDispatch, useAppSelector} from '../../hooks';

type ReviewsFormProps = {
  offerId: number;
}

const ReviewsForm = ({offerId}: ReviewsFormProps): JSX.Element => {
  const [rating, setRating] = useState('0');
  const [comment, setComment] = useState('');

  const dispatch = useAppDispatch();

  const status = useAppSelector(selectCommentsStatus);

  useEffect(() => {
    if (status.isSuccess) {
      setRating('0');
      setComment('');
    }
  }, [status]);

  const isValidTextarea = comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH;
  const isRatingValid = rating !== '0';
  const validForm = !isValidTextarea || !isRatingValid || status.isLoading;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(postComment({
      rating: rating,
      comment: comment,
      id: offerId,
    }));
  };

  return (
    <form className="reviews__form form"
      action=""
      onSubmit={handleSubmit}
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_STARS.map(({ id, name }) => (
          <React.Fragment key={name}>
            <input className="form__rating-input visually-hidden"
              name="rating"
              value={id}
              id={`${id}-star`}
              type="radio"
              disabled={status.isLoading}
              checked={id === Number(rating)}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setRating(evt.target.value);
              }}
            />
            <label htmlFor={`${id}-star`}
              className="reviews__rating-label form__rating-label"
              title={name}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>)
        )}
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        disabled={status.isLoading}
        value={comment}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setComment(evt.target.value)}
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span>
          and describe your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button"
          disabled={validForm}
          type="submit"
        >Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewsForm;
