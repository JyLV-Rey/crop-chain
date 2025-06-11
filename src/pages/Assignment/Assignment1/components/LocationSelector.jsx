import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet';
import { useState } from 'react';
import { useGlobalData } from '../../../../default-data/DefaultGlobalData';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import currentMarkerIcon from '/markers/current-marker.png';
import newMarkerIcon from '/markers/new-marker.png';

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const currentIcon = new L.Icon({
  iconUrl: currentMarkerIcon,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const newIcon = new L.Icon({
  iconUrl: newMarkerIcon,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function ClickHandler({ setLocation, setNewMarkerLocation }) {
  useMapEvent('click', (e) => {
    setLocation([e.latlng.lat, e.latlng.lng]);
    setNewMarkerLocation([e.latlng.lat, e.latlng.lng]);
  });
  return null;
}

function LocationSelector({ currentLocation, setLocation, oldLocation }) {
  const { global } = useGlobalData();

  const { latitude, longitude } = currentLocation;

  const newLocation = [latitude, longitude];

  const [ currentMarker, setCurrentMarker ] = useState(newLocation);

  return (
    <div className="w-[700px] h-200">
      <MapContainer
        center={newLocation}
        zoom={global.main_location.zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ClickHandler setLocation={setLocation} setNewMarkerLocation={setCurrentMarker}/>
        <Marker position={currentMarker} icon={currentIcon} />
        <Marker position={[oldLocation.latitude, oldLocation.longitude]} icon={newIcon} />
      </MapContainer>
    </div>
  );
}

export default LocationSelector;
