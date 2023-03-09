import cn from 'classnames';
import { CITIES } from '../../const';
import React from 'react';

type LocationTabProps = {
  onTabLinkClick: (id: number) => void;
  activeClass: number;
}


const LocationTabs = ({ onTabLinkClick, activeClass }: LocationTabProps): JSX.Element => (
  <section className="locations container">
    <ul className="locations__list tabs__list">
      {
        CITIES.map((city, i) => (
          <li key={city}
            className="locations__item"
          >
            <a onClick={(evt) => {
              evt.preventDefault();
              onTabLinkClick(i);}}
            className={cn('locations__item-link tabs__item', activeClass === i && 'tabs__item--active')}
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
