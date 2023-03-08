import cn from 'classnames';

type BookmarkButtonProps = {
  isFavorite: boolean;
}

const BookmarkButton = ({ isFavorite }: BookmarkButtonProps): JSX.Element => (
  <button className={cn('place-card__bookmark-button button', isFavorite && 'place-card__bookmark-button--active')} type="button">
    <svg className="place-card__bookmark-icon" width="18" height="19">
      <use xlinkHref="#icon-bookmark"></use>
    </svg>
    <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
  </button>
);

export default BookmarkButton;
