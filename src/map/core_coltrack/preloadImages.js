import createPalette from '@mui/material/styles/createPalette';
import { loadImage, prepareIcon } from './mapUtil';

import arrowSvg from '../../resources/images/arrow.svg';
import directionSvgError from '../../resources/images/coltrack/direction-error.svg';
import directionSvgInfo from '../../resources/images/coltrack/direction-info.svg';
import directionSvgNeutral from '../../resources/images/coltrack/direction-neutral.svg';
import directionSvgSuccess from '../../resources/images/coltrack/direction-success.svg';
import backgroundSvg from '../../resources/images/background.svg';

import animalSvg from '../../resources/images/icon/animal.svg';
import bicycleSvg from '../../resources/images/icon/bicycle.svg';
import boatSvg from '../../resources/images/icon/boat.svg';
import busSvg from '../../resources/images/icon/bus.svg';
import carSvg from '../../resources/images/icon/car.svg';
import camperSvg from '../../resources/images/icon/camper.svg';
import craneSvg from '../../resources/images/icon/crane.svg';
import defaultSvg from '../../resources/images/icon/default.svg';
import helicopterSvg from '../../resources/images/icon/helicopter.svg';
import motorcycleSvg from '../../resources/images/icon/motorcycle.svg';
import offroadSvg from '../../resources/images/icon/offroad.svg';
import personSvg from '../../resources/images/icon/person.svg';
import pickupSvg from '../../resources/images/icon/pickup.svg';
import planeSvg from '../../resources/images/icon/plane.svg';
import scooterSvg from '../../resources/images/icon/scooter.svg';
import shipSvg from '../../resources/images/icon/ship.svg';
import tractorSvg from '../../resources/images/icon/tractor.svg';
import trainSvg from '../../resources/images/icon/train.svg';
import tramSvg from '../../resources/images/icon/tram.svg';
import trolleybusSvg from '../../resources/images/icon/trolleybus.svg';
import truckSvg from '../../resources/images/icon/truck.svg';
import vanSvg from '../../resources/images/icon/van.svg';

import animalSvgMirroredVertically from '../../resources/images/coltrack/icon/animal-mirrored.svg';
import bicycleSvgMirroredVertically from '../../resources/images/coltrack/icon/bicycle-mirrored.svg';
import boatSvgMirroredVertically from '../../resources/images/coltrack/icon/boat-mirrored.svg';
import busSvgMirroredVertically from '../../resources/images/coltrack/icon/bus-mirrored.svg';
import carSvgMirroredVertically from '../../resources/images/coltrack/icon/car-mirrored.svg';
import camperSvgMirroredVertically from '../../resources/images/coltrack/icon/camper-mirrored.svg';
import craneSvgMirroredVertically from '../../resources/images/coltrack/icon/crane-mirrored.svg';
import defaultSvgMirroredVertically from '../../resources/images/coltrack/icon/default-mirrored.svg';
import helicopterSvgMirroredVertically from '../../resources/images/coltrack/icon/helicopter-mirrored.svg';
import motorcycleSvgMirroredVertically from '../../resources/images/coltrack/icon/motorcycle-mirrored.svg';
import offroadSvgMirroredVertically from '../../resources/images/coltrack/icon/offroad-mirrored.svg';
import personSvgMirroredVertically from '../../resources/images/coltrack/icon/person-mirrored.svg';
import pickupSvgMirroredVertically from '../../resources/images/coltrack/icon/pickup-mirrored.svg';
import planeSvgMirroredVertically from '../../resources/images/coltrack/icon/plane-mirrored.svg';
import scooterSvgMirroredVertically from '../../resources/images/coltrack/icon/scooter-mirrored.svg';
import shipSvgMirroredVertically from '../../resources/images/coltrack/icon/ship-mirrored.svg';
import tractorSvgMirroredVertically from '../../resources/images/coltrack/icon/tractor-mirrored.svg';
import trainSvgMirroredVertically from '../../resources/images/coltrack/icon/train-mirrored.svg';
import tramSvgMirroredVertically from '../../resources/images/coltrack/icon/tram-mirrored.svg';
import trolleybusSvgMirroredVertically from '../../resources/images/coltrack/icon/trolleybus-mirrored.svg';
import truckSvgMirroredVertically from '../../resources/images/coltrack/icon/truck-mirrored.svg';
import vanSvgMirroredVertically from '../../resources/images/coltrack/icon/van-mirrored.svg';

import { map } from '../core/MapView';

export const mapIcons = {
  animal: animalSvg,
  bicycle: bicycleSvg,
  boat: boatSvg,
  bus: busSvg,
  car: carSvg,
  camper: camperSvg,
  crane: craneSvg,
  default: defaultSvg,
  helicopter: helicopterSvg,
  motorcycle: motorcycleSvg,
  offroad: offroadSvg,
  person: personSvg,
  pickup: pickupSvg,
  plane: planeSvg,
  scooter: scooterSvg,
  ship: shipSvg,
  tractor: tractorSvg,
  train: trainSvg,
  tram: tramSvg,
  trolleybus: trolleybusSvg,
  truck: truckSvg,
  van: vanSvg,
};

export const mapIconsMirroredVertically = {
  animal: animalSvgMirroredVertically,
  bicycle: bicycleSvgMirroredVertically,
  boat: boatSvgMirroredVertically,
  bus: busSvgMirroredVertically,
  car: carSvgMirroredVertically,
  camper: camperSvgMirroredVertically,
  crane: craneSvgMirroredVertically,
  default: defaultSvgMirroredVertically,
  helicopter: helicopterSvgMirroredVertically,
  motorcycle: motorcycleSvgMirroredVertically,
  offroad: offroadSvgMirroredVertically,
  person: personSvgMirroredVertically,
  pickup: pickupSvgMirroredVertically,
  plane: planeSvgMirroredVertically,
  scooter: scooterSvgMirroredVertically,
  ship: shipSvgMirroredVertically,
  tractor: tractorSvgMirroredVertically,
  train: trainSvgMirroredVertically,
  tram: tramSvgMirroredVertically,
  trolleybus: trolleybusSvgMirroredVertically,
  truck: truckSvgMirroredVertically,
  van: vanSvgMirroredVertically,
};

export const mapIconKey = (category) => (mapIcons.hasOwnProperty(category) ? category : 'default');

export const mapImages = {};

const mapPalette = createPalette({
  neutral: { main: '#616161' },
  info: { main: '#051f38' },   // Example: blue for info
  success: { main: '#6bb0e7'},  // Example: green for success
  error: { main: '#b74848' }     // Example: red for error
});

export default async () => {
  const background = await loadImage(backgroundSvg);
  mapImages.background = await prepareIcon(background);
  mapImages.arrow = await prepareIcon(await loadImage(arrowSvg));

  mapImages['direction-neutral'] = await prepareIcon(await loadImage(directionSvgNeutral));
  mapImages['direction-info'] = await prepareIcon(await loadImage(directionSvgInfo));
  mapImages['direction-success'] = await prepareIcon(await loadImage(directionSvgSuccess));
  mapImages['direction-error'] = await prepareIcon(await loadImage(directionSvgError));

  await Promise.all(Object.keys(mapIcons).map(async (category) => {
    const results = [];
    ['info', 'success', 'error', 'neutral'].forEach((color) => {
      results.push(loadImage(mapIcons[category]).then((icon) => {
        mapImages[`${category}-${color}`] = prepareIcon(background, icon, mapPalette[color].main);
      }));
    });
    await Promise.all(results);
  }));

  await Promise.all(Object.keys(mapIconsMirroredVertically).map(async (category) => {
    const results = [];
    ['info', 'success', 'error', 'neutral'].forEach((color) => {
      results.push(loadImage(mapIconsMirroredVertically[category]).then((icon) => {
        mapImages[`${category}-${color}-mirrored`] = prepareIcon(background, icon, mapPalette[color].main);
      }));
    });
    await Promise.all(results);
  }));
};
