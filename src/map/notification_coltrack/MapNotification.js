import { useEffect, useMemo } from 'react';
import { map } from '../core/MapView';
import './notification.css';

const statusClass = (status) => `mapboxgl-ctrl-icon mapboxgl-ctrl-notification mapboxgl-ctrl-notification-${status}`;

class NotificationControl {
  constructor(eventHandler) {
    this.eventHandler = eventHandler;
  }

  onAdd() {
    this.button = document.createElement('button');
    this.button.className = statusClass('off');
    this.button.type = 'button';
    this.button.onclick = () => this.eventHandler(this);

    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';
    this.container.appendChild(this.button);

    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
  }

  setEnabled(enabled) {
    this.button.className = statusClass(enabled ? 'on' : 'off');
  }
}

const MapNotification = ({ enabled, onClick }) => {
  const control = useMemo(() => new NotificationControl(onClick), [onClick]);

  useEffect(() => {
    map.addControl(control);
    return () => map.removeControl(control);
  }, [control]);

  useEffect(() => {
    control.setEnabled(enabled);
  }, [enabled, control]);

  return null;
};

export default MapNotification;
