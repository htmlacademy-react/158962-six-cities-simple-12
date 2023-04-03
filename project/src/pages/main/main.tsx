import Layout from '../../components/layout/layout';
import OffersList from '../../components/offers-list/offers-list';
import Sort from '../../components/sort/sort';
import { useState, useEffect } from 'react';
import LocationTabs from '../../components/location-tabs/location-tabs';
import Map from '../../components/map/map';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectOfferCards, fetchOffers, selectOffersCity, selectOffersStatus } from '../../store/slices/offer-slice';
import { selectSort } from '../../store/slices/app-slice';
import cn from 'classnames';
import NoPlaces from '../../components/no-places/no-places';
import { sortOffers } from '../../utils';
import Spinner from '../../components/spinner/spinner';
import Error from '../../components/error/error';


const Main = (): JSX.Element => {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const offers = useAppSelector(selectOfferCards);
  const status = useAppSelector(selectOffersStatus)
  const activeCity = useAppSelector(selectOffersCity);
  const { sort } = useAppSelector(selectSort);
  const dispatch = useAppDispatch();

  useEffect( () => {
    if (!offers.length) {
      dispatch(fetchOffers());
    }
  }, [dispatch, offers]);

  const filteredOffers = offers.filter((item) => item.city.name === activeCity);
  const sortedOffers = sortOffers(filteredOffers, sort);
  const isEmpty = filteredOffers.length === 0;

  if (status.isError) {
    return <Error />;
  }

  if (status.isLoadingOffers) {
    return  <Spinner />;
  }

  return (
    <Layout className="page--gray page--main">
      <main className={cn('page__main page__main--index', isEmpty && 'page__main--index-empty')}>
        <h1 className="visually-hidden">Cities</h1>
        <LocationTabs activeCity={activeCity} />
        <div className="cities">
          <div className={cn('cities__places-container container', isEmpty && 'cities__places-container--empty')}>
            {isEmpty ?
              <NoPlaces activeCity={activeCity} /> : (
                <>
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>

                    <Sort sort={sort}/>
                    <OffersList offers={sortedOffers} onActiveCardId={setActiveCardId} />

                  </section>
                  <div className="cities__right-section">
                    <Map height={'height: 100%'} offers={filteredOffers} className="cities__map" selectedPointId={activeCardId}/>
                  </div>
                </>
              )}
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default Main;
