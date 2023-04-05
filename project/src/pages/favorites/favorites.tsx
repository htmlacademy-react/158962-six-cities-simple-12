import Layout from '../../components/layout/layout';
import Logo from '../../components/logo/logo';
import { Offer } from '../../types/offer';
import OfferCard from '../../components/offer-card/offer-card';

type FavoritesProps = {
  offers: Offer[];
}

const Favorites = ({ offers }:FavoritesProps): JSX.Element => {
  const filterIsFavoriteOffers = offers.filter((offer) => offer.isFavorite);
  const groupFavoriteByCity = (offerCard: Offer[]) => offerCard.reduce<{[key: string]: Offer[]}>((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[offer.city.name].push(offer);

    return acc;
  }, {});

  const groupedOffers = Object.entries(groupFavoriteByCity(filterIsFavoriteOffers));

  return (
    <Layout className="">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                groupedOffers.map(([city, relatedOffers]) => (
                  <li className="favorites__locations-items"
                    key={city}
                  >
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {
                        relatedOffers.map((item: Offer) => (
                          <OfferCard className="favorites__card"
                            key={city}
                            classNameWrapper="favorites__image-wrapper"
                            offer={item}
                          />
                        ))
                      }
                    </div>
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo type="footer" />
      </footer>
    </Layout>
  );
};

export default Favorites;
