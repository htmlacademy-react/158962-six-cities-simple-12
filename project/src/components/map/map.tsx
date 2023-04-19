import cn from 'classnames';
import React, { useRef, useEffect } from 'react';
import leaflet, {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';

type MapProps = {
  className: string;
  offers: Offer[];
  selectedPointId?: number | null;
}

type Bounds = [number, number][];

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});


const Map = ({ className, selectedPointId, offers }: MapProps): JSX.Element => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0]);
  const adLayer = leaflet.layerGroup();

  useEffect(() => {
    if (map) {
      const bounds: Bounds = [];
      adLayer.addTo(map);
      offers.forEach((item) => {
        bounds.push([item.location.latitude, item.location.longitude]);
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude
        });

        marker
          .setIcon(
            selectedPointId !== undefined && item.id === selectedPointId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(adLayer);
      });

      if (bounds.length !== 0) {
        map.fitBounds(bounds);
      }
    }

    return () => {
      map?.removeLayer(adLayer);
    };
  }, [map, offers, selectedPointId]);

  return (
    <section style={{height: '100%', minHeight: '500px', width: '100%', maxWidth: '1144px', margin: '0 auto 40px auto'}}
      ref={mapRef}
      className={cn('map', className)}
    />
  );
};

export default Map;
