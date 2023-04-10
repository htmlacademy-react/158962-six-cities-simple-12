import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  onActiveCardId?: (id: number | null) => void;
}

const OffersList = ({ offers, onActiveCardId }: OffersListProps): JSX.Element => (
  <div className="cities__places-list places__list">
    {
      offers.map((offer) => (
        <OfferCard
          sizeType='default'
          key={offer.id}
          onActiveCardId={onActiveCardId}
          offer={offer}
          classNameWrapper="cities__image-wrapper"
          className="cities__card"
        />)
      )
    }
  </div>
);

export default OffersList;
