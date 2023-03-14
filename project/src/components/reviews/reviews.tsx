import { Review } from '../../types/Review';
import ReviewItem from '../review-item/review-item';

type ReviewsProps = {
  reviews: Review[];
}
const Reviews = ({ reviews }: ReviewsProps): JSX.Element => (
  <ul className="reviews__list">
    {
      reviews.map((review, i) => (
        <ReviewItem
          key={review.id}
          review={review}
        />
      ))
    }
  </ul>
);

export default Reviews;
