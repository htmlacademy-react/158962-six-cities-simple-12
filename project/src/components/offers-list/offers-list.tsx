import CityCard from '../../components/city-card/city-card';
import { Offer } from '../../types/Offer';
import { useState } from 'react';

type OffersListProps = {
  offers: Offer[];
}

const OffersList = ({ offers }: OffersListProps): JSX.Element => {
  const [, setActiveCardId] = useState<number | null>(null);

  return (
    <div className="cities__places-list places__list">
      {
        offers.map((offer) =>
          (
            <CityCard
              key={offer.id}
              onActiveCardId={setActiveCardId}
              offer={offer}
              classNameWrapper="cities__image-wrapper"
              className="cities__card"
            />
          )
        )
      }
    </div>
  );
};

export default OffersList;
