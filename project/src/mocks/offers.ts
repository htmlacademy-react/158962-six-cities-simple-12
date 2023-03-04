import { Offer } from '../types/Offer';

export const offers: Offer[] = [
  {
    bedrooms: 4,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: [
      'Heating',
      'Wi-Fi',
      'Towels',
      'Fridge',
      'Washing machine',
      'Baby seat',
      'Dishwasher',
      'Cabel TV'
    ],
    host: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 1,
      isPro: true,
      name: 'Nataly'
    },
    id: 1,
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
    ],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: 'img/apartment-01.jpg',
    price: 110,
    rating: 4.2,
    title: 'Beautiful & luxurious studio at great location1',
    type: 'apartment'
  },

  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Spain'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Spain.',
    goods: [
      'Heating',
      'Washing machine',
      'Baby seat',
      'Dishwasher',
      'Cabel TV',
    ],
    host: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 2,
      isPro: true,
      name: 'Irene'
    },
    id: 2,
    images: [
      'img/apartment-03.jpg',
    ],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 80.35514938496378,
      longitude: 6.673877537499948,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: 'img/apartment-02.jpg',
    price: 90,
    rating: 4.8,
    title: 'Beautiful & luxurious studio at great location2',
    type: 'apartment'
  },

  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Prague'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Prague.',
    goods: [
      'Heating',
      'Washing machine',
      'Baby seat',
      'Dishwasher',
      'Cabel TV',
    ],
    host: {
      avatarUrl: 'img/3.png',
      id: 3,
      isPro: true,
      name: 'Angelina'
    },
    id: 3,
    images: [
      'img/apartment-03.jpg',
    ],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: 'img/apartment-03.jpg',
    price: 80,
    rating: 4.3,
    title: 'Beautiful & luxurious studio at great location3',
    type: 'house'
  },

  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Italy'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Italy.',
    goods: [
      'Heating'
    ],
    host: {
      avatarUrl: 'img/2.png',
      id: 4,
      isPro: true,
      name: 'Angelina'
    },
    id: 4,
    images: [
      'img/apartment-02.jpg',
    ],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 60.35514938496378,
      longitude: 1.673877537499948,
      zoom: 10
    },
    maxAdults: 2,
    previewImage: 'img/apartment-02.jpg',
    price: 300,
    rating: 3.8,
    title: 'Beautiful & luxurious studio at great location4',
    type: 'flat'
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Italy'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Italy.',
    goods: [
      'Heating'
    ],
    host: {
      avatarUrl: 'img/2.png',
      id: 5,
      isPro: true,
      name: 'Angelina'
    },
    id: 5,
    images: [
      'img/apartment-02.jpg',
    ],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 60.35514938496378,
      longitude: 1.673877537499948,
      zoom: 10
    },
    maxAdults: 2,
    previewImage: 'img/apartment-02.jpg',
    price: 600,
    rating: 4.8,
    title: 'Beautiful & luxurious studio at great location4',
    type: 'flat'
  },
];
