import Layout from '../../components/layout';
import { Offer } from '../../types/Offer';
import { PLACES_TO_STAY } from '../../const';
import OffersList from '../../components/offers-list/offers-list';
import Sort from '../../components/sort/sort';
import { useState } from 'react';

type HomeProps = {
  offers: Offer[];
}

const Main = ({ offers }: HomeProps): JSX.Element => {
  const [activeClass, setActiveClass] = useState(0);

  return (
    <Layout className="page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                PLACES_TO_STAY.map((city, i) => (
                  <li key={`${city}-${i}`}
                    className="locations__item"
                  >
                    <a onClick={() => setActiveClass(i)}
                      className={`locations__item-link tabs__item ${activeClass === i ? 'tabs__item--active' : ''}`}
                      href="#"
                    >
                      <span>{city}</span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <Sort />
              <OffersList offers={offers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default Main;
