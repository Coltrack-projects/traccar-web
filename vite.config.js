import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

/* eslint-disable no-template-curly-in-string */
export default defineConfig(() => ({
  server: {
    port: 3000,
    proxy: {
      '/api/socket': 'ws://localhost:8082',
      '/api': 'http://localhost:8082',
    },
  },
  resolve: {
    alias: {
      './login/LoginLayout': './login_coltrack/LoginLayout',
      './login/RegisterPage': './login_coltrack/RegisterPage',
      './login/LoginPage': './login_coltrack/LoginPage',
      './palette': '/src/common/theme/palette_coltrack',
      './DeviceList': '../main_coltrack/DeviceList',
      './DeviceRow': '../main_coltrack/DeviceRow',
      './main/MainPage': './main_coltrack/MainPage',
      './MainToolbar': '../main_coltrack/MainToolbar',
      '../../resources/images/icon/animal.svg': '/src/resources/images/coltrack/icon/animal.svg',
      '../../resources/images/icon/bicycle.svg': '/src/resources/images/coltrack/icon/bicycle.svg',
      '../../resources/images/icon/boat.svg': '/src/resources/images/coltrack/icon/boat.svg',
      '../../resources/images/icon/bus.svg': '/src/resources/images/coltrack/icon/bus.svg',
      '../../resources/images/icon/camper.svg': '/src/resources/images/coltrack/icon/camper.svg',
      '../../resources/images/icon/car.svg': '/src/resources/images/coltrack/icon/car.svg',
      '../../resources/images/icon/crane.svg': '/src/resources/images/coltrack/icon/crane.svg',
      '../../resources/images/icon/default.svg': '/src/resources/images/coltrack/icon/default.svg',
      '../../resources/images/icon/helicopter.svg': '/src/resources/images/coltrack/icon/helicopter.svg',
      '../../resources/images/icon/motorcycle.svg': '/src/resources/images/coltrack/icon/motorcycle.svg',
      '../../resources/images/icon/offroad.svg': '/src/resources/images/coltrack/icon/offroad.svg',
      '../../resources/images/icon/person.svg': '/src/resources/images/coltrack/icon/person.svg',
      '../../resources/images/icon/pickup.svg': '/src/resources/images/coltrack/icon/pickup.svg',
      '../../resources/images/icon/plane.svg': '/src/resources/images/coltrack/icon/plane.svg',
      '../../resources/images/icon/scooter.svg': '/src/resources/images/coltrack/icon/scooter.svg',
      '../../resources/images/icon/ship.svg': '/src/resources/images/coltrack/icon/ship.svg',
      '../../resources/images/icon/tractor.svg': '/src/resources/images/coltrack/icon/tractor.svg',
      '../../resources/images/icon/train.svg': '/src/resources/images/coltrack/icon/train.svg',
      '../../resources/images/icon/tram.svg': '/src/resources/images/coltrack/icon/tram.svg',
      '../../resources/images/icon/trolleybus.svg': '/src/resources/images/coltrack/icon/trolleybus.svg',
      '../../resources/images/icon/truck.svg': '/src/resources/images/coltrack/icon/truck.svg',
      '../../resources/images/icon/van.svg': '/src/resources/images/coltrack/icon/van.svg',
      '../map/core/preloadImages': '../map/core_coltrack/preloadImages',
      './map/core/preloadImages': './map/core_coltrack/preloadImages',
      './core/preloadImages': './core_coltrack/preloadImages',
      './preloadImages': '../core_coltrack/preloadImages',
      '../core/mapUtil': '../core_coltrack/mapUtil',
      './core/mapUtil': './core_coltrack/mapUtil',
      './mapUtil': '../core_coltrack/mapUtil',
      '../../resources/images/direction.svg': '../../resources/images/coltrack/direction.svg'
    },
  },
  build: {
    outDir: 'build',
  },
  plugins: [
    svgr(),
    react(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png'],
      workbox: {
        navigateFallbackDenylist: [/^\/api/],
        maximumFileSizeToCacheInBytes: 4000000,
        globPatterns: ['**/*.{js,css,html,woff,woff2,mp3}'],
      },
      manifest: {
        short_name: '${title}',
        name: '${description}',
        theme_color: '${colorPrimary}',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
}));
