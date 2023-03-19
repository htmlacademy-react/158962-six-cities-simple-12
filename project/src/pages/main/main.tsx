import Layout from '../../components/layout/layout';
import OffersList from '../../components/offers-list/offers-list';
import Sort from '../../components/sort/sort';
import React, { useState } from 'react';
import LocationTabs from '../../components/location-tabs/location-tabs';
import Map from '../../components/map/map';
import { useSelector } from 'react-redux';
import { selectOfferCards } from '../../store/slices/offer-slice';
import { selectSort } from '../../store/slices/sort-slice';
import cn from 'classnames';
import NoPlaces from '../../components/no-places/no-places';
import { Offer } from '../../types/Offer';

const Main = (): JSX.Element => {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const { offers, city: activeCity } = useSelector(selectOfferCards);
  const { sort } = useSelector(selectSort);

  const sortOffers = (coll: Offer[]): Offer[] => {
    switch (sort.sortProperty) {
      case 'price':
        return coll.sort((itemA, itemB) => itemB.price - itemA.price);

      case '-price':
        return coll.sort((itemA, itemB) => itemA.price - itemB.price);

      case 'top':
        return coll.sort((itemA, itemB) => itemB.rating - itemA.rating);

      default:
        return coll;
    }
  };

  const filteredOffers = offers.filter((item) => item.city.name === activeCity);
  const sortedOffers = sortOffers(filteredOffers);
  const isEmpty = filteredOffers.length === 0;

  return (
    <Layout className="page--gray page--main">
      <main className={cn('page__main page__main--index', isEmpty && 'page__main--index-empty')}>
        <h1 className="visually-hidden">Cities</h1>
        <LocationTabs activeCity={activeCity} />
        <div className="cities">
          <div className={cn('cities__places-container container', isEmpty && 'cities__places-container--empty')}>
            {
              isEmpty ?
                <NoPlaces activeCity={activeCity} /> : (
                  <>
                    <section className="cities__places places">
                      <h2 className="visually-hidden">Places</h2>
                      <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>

                      <Sort sort={sort}/>
                      <OffersList offers={sortedOffers} onActiveCardId={setActiveCardId} />

                    </section>
                    <div className="cities__right-section">
                      <Map offers={filteredOffers} className="cities__map" selectedPointId={activeCardId}/>
                    </div>
                  </>
                )
            }
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default Main;
