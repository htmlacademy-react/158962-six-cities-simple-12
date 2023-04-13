import { useState, useRef } from 'react';
import { SORT_LIST } from '../../const';
import cn from 'classnames';
import { changeSortType } from '../../store/slices/app-slice/app-slice';
import { useDispatch } from 'react-redux';
import { SortItem } from '../../types/sort';
import useOnClickOutside from '../../hooks/use-on-click-outside';

type SortProps = {
  sort: SortItem;
}

const Sort = ({ sort }: SortProps): JSX.Element => {
  const ref = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onSortItemClick = ( name: string, sortItem: SortItem): void => {
    setOpen(false);
    dispatch(changeSortType(sortItem));
  };

  useOnClickOutside(ref, () => setOpen(false));

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
        <ul className="places__options places__options--custom places__options--opened"
          ref={ref}
        >
          {
            Object.values(SORT_LIST).map((sortItem) => (
              <li onClick={() => onSortItemClick(sortItem.name, sortItem)}
                key={sortItem.name}
                className={cn('places__option', sortItem.name === sort.name && 'places__option--active')}
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
