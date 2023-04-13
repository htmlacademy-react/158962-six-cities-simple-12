import { getRatingWidth } from '../../utils/utils';
import { MAX_RATING } from '../../const';
import dayjs from 'dayjs';
import { Review } from '../../types/review';

type ReviewItemProps = {
  review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps): JSX.Element => {
  const date = dayjs(review.date).format('MMMM YYYY');
  const attrDate = dayjs(review.date).format('YYYY MM DD');

  return (
    <li key={review.id} className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRatingWidth(review.rating, MAX_RATING)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={attrDate}>{date}</time>
      </div>
    </li>
  );
};

export default ReviewItem;
