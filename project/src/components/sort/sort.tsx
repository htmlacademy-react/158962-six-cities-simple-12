import { useState } from 'react';
import { LIST } from '../../const';
import cn from 'classnames';
import { SortItems, setSortType } from '../../store/slices/sort-slice';
import { useDispatch } from 'react-redux';

type SortProps = {
  sort: SortItems;
}

const Sort = ({ sort }: SortProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [activeClass, setActiveClass] = useState(0);
  const dispatch = useDispatch();

  const onSortItemClick = (i: number, name: string, sortItem: SortItems): void => {
    setActiveClass(i);
    setOpen(false);
    dispatch(setSortType(sortItem));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption" style={{marginRight: 5}}>Sort by</span>
      <span onClick={() => setOpen(!open)}
        className="places__sorting-type"
        tabIndex={0}
      >
        {sort.name}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {
        open &&
        <ul className="places__options places__options--custom places__options--opened">
          {
            LIST.map((sortItem, i) => (
              <li onClick={() => onSortItemClick(i, sortItem.name, sortItem)}
                key={sortItem.name}
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
