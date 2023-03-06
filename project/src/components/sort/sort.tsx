import { useState } from 'react';
import { LIST } from '../../const';
import cn from 'classnames';

const Sort = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [activeClass, setActiveClass] = useState(0);

  const onSortItemClick = (i: number, name: string): void => {
    setActiveClass(i);
    setOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption" style={{marginRight: 5}}>Sort by</span>
      <span onClick={() => setOpen(!open)} className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {
        open &&
        <ul className="places__options places__options--custom places__options--opened">
          {
            LIST.map((sortItem, i) => (
              <li onClick={() => onSortItemClick(i, sortItem.name)}
                key={`${sortItem.name}-${i}`}
                className={cn('places__option', activeClass === i && 'places__option--active')}
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
