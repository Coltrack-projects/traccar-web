import mapboxgl from 'mapbox-gl';
import { useEffect, useMemo } from 'react';
import { useAttributePreference } from '../common/util/preferences';
import { map } from '../map/core/MapView';

const MapScale = () => {
  const distanceUnit = useAttributePreference('distanceUnit');

  const control = useMemo(() => new mapboxgl.ScaleControl(), []);

  useEffect(() => {
    map.addControl(control, 'bottom-right');
    return () => map.removeControl(control);
  }, [control]);

  useEffect(() => {
    switch (distanceUnit) {
      case 'mi':
        control.setUnit('imperial');
        break;
      case 'nmi':
        control.setUnit('nautical');
        break;
      case 'km':
      default:
        control.setUnit('metric');
        break;
    }
  }, [control, distanceUnit]);

  return null;
};

export default MapScale;
