import cn from 'classnames';

type BookmarkButtonProps = {
  className: string | boolean;
}

const BookmarkButton = ({ className }: BookmarkButtonProps): JSX.Element => (
  <button className={cn('place-card__bookmark-button button', className)} type="button">
    <svg className="place-card__bookmark-icon" width="18" height="19">
      <use xlinkHref="#icon-bookmark"></use>
    </svg>
    <span className="visually-hidden">In bookmarks</span>
  </button>
);

export default BookmarkButton;
