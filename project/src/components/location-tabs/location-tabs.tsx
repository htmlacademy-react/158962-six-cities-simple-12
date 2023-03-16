import cn from 'classnames';
import { CITIES } from '../../const';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveCity } from '../../store/slices/offer-slice';

type LocationTabsProps = {
  activeCity: string;
}

const LocationTabs = ({ activeCity }: LocationTabsProps): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          CITIES.map((city, i) => (
            <li key={city}
              className="locations__item"
            >
              <a className={cn('locations__item-link tabs__item', city === activeCity && 'tabs__item--active')}
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(setActiveCity(city));
                }}
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
};

export default LocationTabs;
