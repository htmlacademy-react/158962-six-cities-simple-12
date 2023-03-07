import React, { useState, ChangeEvent } from 'react';
import { ratingStars } from '../../const';

const ReviewsForm = (): JSX.Element => {
  const [activeRating, setActiveRating] = useState<number | null>(null);
  const [checkedRadio, setCheckedRadio] = useState(false);
  const [comment, setComment] = useState('');

  const handleRatingChange = (id: number | null, checked: boolean) => ratingStars.map((item) =>
    item.id === id ? { ...item, checked } : item
  );

  const newRatingStars = handleRatingChange(activeRating, checkedRadio);

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          newRatingStars.map(({ id, name, checked }) => (
            <React.Fragment key={`${id}-${name}`}>
              <input className="form__rating-input visually-hidden"
                name="rating"
                value={id}
                id={`${id}-star`}
                type="radio"
                checked={id === activeRating && checked}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                  setCheckedRadio(evt.target.checked);
                  setActiveRating(Number(evt.target.value));
                } }
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
          )
        }
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
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
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
};

export default ReviewsForm;
