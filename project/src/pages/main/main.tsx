import Layout from '../../components/layout/layout';
import { Offer } from '../../types/Offer';
import OffersList from '../../components/offers-list/offers-list';
import Sort from '../../components/sort/sort';
import React, { useState } from 'react';
import LocationTabs from '../../components/location-tabs/location-tabs';
import Map from '../../components/map/map';

type HomeProps = {
  offers: Offer[];
}

const Main = ({ offers }: HomeProps): JSX.Element => {
  const [activeClass, setActiveClass] = useState(0);

  const handleCityTabClick = (id: number): void => {
    setActiveClass(id);
  };

  return (
    <Layout className="page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationTabs onTabLinkClick={handleCityTabClick} activeClass={activeClass} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <Sort />
              <OffersList offers={offers} />
            </section>
            <div className="cities__right-section">
              <Map className="cities__map" />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default Main;
