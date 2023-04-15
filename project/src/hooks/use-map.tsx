import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map } from 'leaflet';
import leaflet from 'leaflet';
import { Offer } from '../types/offer';

const URL_TEMPLATE = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_LAYER_ATTRIBUTION = '\'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="\'https://carto.com/attributions">CARTO</a>\'';

const useMap = (mapRef: MutableRefObject<HTMLElement | null>, offer: Offer): Map | null => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: offer?.city.location.latitude,
          lng: offer?.city.location.longitude
        },
        zoom: offer?.city.location.zoom
      });

      leaflet
        .tileLayer(
          URL_TEMPLATE,
          {
            attribution: TILE_LAYER_ATTRIBUTION,
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, map, offer]);

  return map;
};

export default useMap;
