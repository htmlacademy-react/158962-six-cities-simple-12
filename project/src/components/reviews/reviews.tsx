import { Review } from '../../types/review';
import ReviewItem from '../review-item/review-item';
import {REVIEWS_AMOUNT} from '../../const';

type ReviewsProps = {
  reviews: Review[];
}
const Reviews = ({ reviews }: ReviewsProps): JSX.Element => (
  <ul className="reviews__list">
    {
      reviews.slice(0, REVIEWS_AMOUNT).map((review, i) => (
        <ReviewItem
          key={review.id}
          review={review}
        />
      ))
    }
  </ul>
);

export default Reviews;
