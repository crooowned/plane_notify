# Plane Notifier
> This Projekt uses the ADS-B Exchange Private API

## How it works
- It connects to the ADS-B Websocket, and retrieves encoded data
- It decodes the data using zstddec from adsb and notifies you if a military or special plane is in your airspace (Link provided in [main.js](main.js))