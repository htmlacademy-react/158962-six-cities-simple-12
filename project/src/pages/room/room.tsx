import Layout from '../../components/layout/layout';
import CityCard from '../../components/city-card/city-card';
import { Offer } from '../../types/Offer';
import { Review } from '../../types/Review';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import { offers } from '../../mocks/offers';
import dayjs from 'dayjs';
import Map from '../../components/map/map';
import { capitalizeFirstLetter, getRatingWidth } from '../../utils';
import { SCALE } from '../../const';

type RoomProps = {
  offer: Offer;
  reviews: Review[];
}

const Room = ({ offer, reviews }: RoomProps): JSX.Element => {
  const { host: userInfo, images, type, isPremium, title, bedrooms, rating, maxAdults, goods, price, description } = offer;
  const avatarProClass = userInfo.isPro ? 'property__avatar-wrapper--pro' : '';

  return (
    <Layout className="">
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.map((src, i) => {
                  const keyValue = `${i}-${src}`;
                  return (
                    <div key={keyValue} className="property__image-wrapper">
                      <img className="property__image" src={src} alt={`Photo ${type}`} />
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getRatingWidth(rating, SCALE)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {capitalizeFirstLetter(type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    goods.map((good, i) => {
                      const keyValue = `${i}-${good}`;
                      return <li key={keyValue} className="property__inside-item">{good}</li>;
                    })
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${avatarProClass}`}>
                    <img className="property__avatar user__avatar"
                      src={userInfo.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {userInfo.name}
                  </span>
                  {userInfo.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                  {/*<p className="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>*/}
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  {
                    reviews.map((item, i) => {
                      const date = dayjs(item.date).format('MMMM YYYY');
                      return (
                        <li key={item.id} className="reviews__item">
                          <div className="reviews__user user">
                            <div className="reviews__avatar-wrapper user__avatar-wrapper">
                              <img className="reviews__avatar user__avatar"
                                src={item.user.avatarUrl}
                                width="54"
                                height="54"
                                alt="Reviews avatar"
                              />
                            </div>
                            <span className="reviews__user-name">{item.user.name}</span>
                          </div>
                          <div className="reviews__info">
                            <div className="reviews__rating rating">
                              <div className="reviews__stars rating__stars">
                                <span style={{width: `${getRatingWidth(item.rating, SCALE)}%`}}></span>
                                <span className="visually-hidden">Rating</span>
                              </div>
                            </div>
                            <p className="reviews__text">
                              {item.comment}
                            </p>
                            <time className="reviews__time" dateTime="2019-04-24">{date}</time>
                          </div>
                        </li>
                      );
                    })
                  }
                </ul>
                <ReviewsForm />
              </section>
            </div>
          </div>
          <Map className="property__map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                offers.slice(0, 3).map((item) =>
                  (
                    <CityCard
                      key={item.id}
                      offer={item}
                      className="near-places__card"
                      classNameWrapper="near-places__image-wrapper"
                    />
                  )
                )
              }
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Room;
