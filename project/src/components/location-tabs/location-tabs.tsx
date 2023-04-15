import cn from 'classnames';
import { CITIES } from '../../const';
import React from 'react';
import { useDispatch } from 'react-redux';
import { changeCity } from '../../store/slices/offer-slice/offer-slice';
import { changeSortType } from '../../store/slices/app-slice/app-slice';
import { SORT_LIST } from '../../const';
import {Link} from 'react-router-dom';

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
              <Link className={cn('locations__item-link tabs__item', city === activeCity && 'tabs__item--active')}
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(changeCity(city));
                  dispatch(changeSortType(SORT_LIST.DEFAULT));
                }}
                to="#/"
              >
                <span>{city}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  );
};

export default LocationTabs;
