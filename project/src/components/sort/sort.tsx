import { useState } from 'react';
import { SortItem } from '../../types/SortItem';

const Sort = (): JSX.Element => {
  const list:SortItem[] = [
    {name: 'Popular', sortProperty: 'rating',},
    {name: 'Price: high to low', sortProperty: 'price',},
    {name: 'Price: low to high', sortProperty: '-price',},
    {name: 'Top rated first', sortProperty: 'top',},
  ];

  const [open, setOpen] = useState(false);
  const [activeClass, setActiveClass] = useState(0);
  const [activeSortName, setActiveSortName] = useState('Popular');

  const onSortItemClick = (i: number, name: string): void => {
    setActiveClass(i);
    setOpen(false);
    setActiveSortName(name);
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption" style={{marginRight: 5}}>Sort by</span>
      <span onClick={() => setOpen(!open)} className="places__sorting-type" tabIndex={0}>
        {activeSortName}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {
        open &&
        <ul className="places__options places__options--custom places__options--opened">
          {
            list.map((sortItem, i) => (
              <li onClick={() => onSortItemClick(i, sortItem.name)}
                key={`${sortItem.name}-${i}`}
                className={`places__option ${activeClass === i ? 'places__option--active' : ''}`}
                tabIndex={0}
              >{sortItem.name}
              </li>)
            )
          }
        </ul>
      }

    </form>
  );
};

export default Sort;
