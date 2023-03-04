import CityCard from '../../components/city-card/city-card';
import { Offer } from '../../types/Offer';

type OffersListProps = {
  offers: Offer[];
}

const OffersList = ({ offers }: OffersListProps): JSX.Element => (
  <div className="cities__places-list places__list tabs__content">
    {
      offers.map((offer) =>
        (
          <CityCard
            key={offer.id}
            isInRoom={false}
            offer={offer}
            className={'cities__card'}
          />
        )
      )
    }
  </div>
);

export default OffersList;
