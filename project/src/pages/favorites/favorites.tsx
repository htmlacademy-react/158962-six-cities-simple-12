import Layout from '../../components/layout/layout';
import Logo from '../../components/logo/logo';
import { Offer } from '../../types/offer';
import OfferCard from '../../components/offer-card/offer-card';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectFavoriteStatus, selectFavoriteOffers, fetchFavorites } from '../../store/slices/favorites-slice/favorites-slice';
import FullPageError from '../../components/full-page-error/full-page-error';
import Spinner from '../../components/spinner/spinner';
import cn from 'classnames';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';


const Favorites = (): JSX.Element => {
  const offers = useAppSelector(selectFavoriteOffers);
  const status = useAppSelector(selectFavoriteStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());

  }, [dispatch]);

  if (status.isLoading) {
    return <Spinner />;
  }

  if (status.isError) {
    return <FullPageError />;
  }

  const groupFavoriteByCity = (offerCard: Offer[]) => offerCard.reduce<{[key: string]: Offer[]}>((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[offer.city.name].push(offer);

    return acc;
  }, {});

  const groupedOffers = Object.entries(groupFavoriteByCity(offers));
  const isEmpty = offers.length === 0;

  return (
    <Layout className={cn('page', isEmpty && 'page--favorites-empty')}>
      <main className={cn('page__main page__main--favorites', isEmpty && 'page__main--favorites-empty')}>
        <div className="page__favorites-container container">
          <section className={cn('favorites', isEmpty && 'favorites--empty')}>
            {isEmpty ? <FavoritesEmpty/> : (
              <>
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {
                    groupedOffers.map(([city, relatedOffers], index) => (
                      <li className="favorites__locations-items"
                        key={city}
                      >
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="#">
                              <span>{city}</span>
                            </a>
                          </div>
                        </div>
                        <div className="favorites__places">
                          {
                            relatedOffers.map((item: Offer) => (
                              <OfferCard className="favorites__card"
                                sizeType='favorite'
                                key={`${city}-${item.id}`}
                                classNameWrapper="favorites__image-wrapper"
                                offer={item}
                              />
                            ))
                          }
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </>
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo type="footer" />
      </footer>
    </Layout>
  );
};

export default Favorites;
