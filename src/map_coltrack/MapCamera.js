import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { map } from '../map/core/MapView';

const MapCamera = ({
  latitude, longitude, positions, coordinates,
}) => {
  useEffect(() => {
    if (coordinates || positions) {
      if (!coordinates) {
        coordinates = positions.map((item) => [item.longitude, item.latitude]);
      }
      if (coordinates.length) {
        const bounds = coordinates.reduce((bounds, item) => bounds.extend(item), new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
        const canvas = map.getCanvas();
        map.fitBounds(bounds, {
          padding: Math.min(canvas.width, canvas.height) * 0.1,
          duration: 0,
        });
      }
    } else {
      map.jumpTo({
        center: [longitude, latitude],
        zoom: Math.max(map.getZoom(), 10),
      });
    }
  }, [latitude, longitude, positions, coordinates]);

  return null;
};

export default MapCamera;
