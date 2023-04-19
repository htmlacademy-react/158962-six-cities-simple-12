import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import OfferCard from '../../components/offer-card/offer-card';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import Map from '../../components/map/map';
import { capitalizeFirstLetter, getRatingWidth } from '../../utils/utils';
import {MAX_RATING, CARD_AMOUNT} from '../../const';
import Reviews from '../../components/reviews/reviews';
import cn from 'classnames';
import Spinner from '../../components/spinner/spinner';
import Error from '../../components/error/error';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {selectSingleOffer, fetchSingleOffer, selectOfferStatus} from '../../store/slices/single-offer-slice/single-offer-slice';
import {fetchNearbyOffers, selectNearbyOffers} from '../../store/slices/nearby-offers-slice/nearby-offers-slice';
import {fetchComments, selectSortedComments} from '../../store/slices/comments-slice/comments-slice';
import {getIsAuth} from '../../store/slices/user-slice/user-slice';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';

const Room = (): JSX.Element => {
  const status = useAppSelector(selectOfferStatus);

  const singleOffer = useAppSelector(selectSingleOffer);
  const nearbyOffers = useAppSelector(selectNearbyOffers);

  const isAuth = useAppSelector(getIsAuth);

  const dispatch = useAppDispatch();
  const offerId = Number(useParams().id);

  useEffect(() => {
    dispatch(fetchSingleOffer(offerId));
    dispatch(fetchNearbyOffers(offerId));
    dispatch(fetchComments(offerId));
  }, [offerId, dispatch]);

  const sortedComments = useAppSelector(selectSortedComments);

  if (status.isError) {
    return (
      <Error />
    );
  }

  if (singleOffer === null || status.isLoading) {
    return (
      <Spinner />
    );
  }

  const {
    host: userInfo,
    images,
    type,
    isPremium,
    title,
    bedrooms,
    rating,
    maxAdults,
    goods,
    price,
    description,
    id
  } = singleOffer;

  return (
    <Layout className="">
      <main className="page__main page__main--property" data-testid="room-page">
        <section className="property">

          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, CARD_AMOUNT).map((src) => (
                <div key={src} className="property__image-wrapper">
                  <img className="property__image" src={src} alt={type} />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <BookmarkButton isBig offer={singleOffer} className="property__bookmark-icon" />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getRatingWidth(rating, MAX_RATING)}%`}}></span>
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
                  {goods.map((good) => (
                    <li key={good} className="property__inside-item">{good}</li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={cn('property__avatar-wrapper user__avatar-wrapper', userInfo.isPro && 'property__avatar-wrapper--pro')}>
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
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{sortedComments.length}</span></h2>
                <Reviews reviews={sortedComments} />
                {isAuth && <ReviewsForm offerId={offerId} />}
              </section>
            </div>
          </div>
          <Map selectedPointId={id}
            className="property__map"
            offers={[...nearbyOffers, singleOffer]}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((item) => (
                <OfferCard key={item.id}
                  sizeType='default'
                  offer={item}
                  className="near-places__card"
                  classNameWrapper="near-places__image-wrapper"
                />)
              )}
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Room;
