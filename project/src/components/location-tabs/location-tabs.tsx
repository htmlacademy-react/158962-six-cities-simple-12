import cn from 'classnames';
import { CITIES } from '../../const';
import React from 'react';

const LocationTabs = (): JSX.Element => (
  <section className="locations container">
    <ul className="locations__list tabs__list">
      {
        CITIES.map((city, i) => (
          <li key={city}
            className="locations__item"
          >
            <a className={cn('locations__item-link tabs__item')}
              href="#"
            >
              <span>{city}</span>
            </a>
          </li>
        ))
      }
    </ul>
  </section>
);

export default LocationTabs;
