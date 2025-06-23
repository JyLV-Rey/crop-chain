import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useGlobalData } from '../../../default-data/DefaultGlobalData'; // <-- use context
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import buyerMarker from '/markers/buyer-marker.png';
import farmerMarker from '/markers/farmer-marker.png';

const farmerIcon = new L.Icon({
  iconUrl: farmerMarker,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const buyerIcon = new L.Icon({
  iconUrl: buyerMarker,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const DisplayLocation = ({ farmers, buyers }) => {
  const { global } = useGlobalData(); // 🔥 dynamic global state

  return (
    <MapContainer
      center={[global.main_location.latitude, global.main_location.longitude]}
      zoom={global.main_location.zoom}
      doubleClickZoom={false}
      touchZoom={false}
      keyboard={false}
      boxZoom={false}
      style={{ height: '700px', width: '100%', zIndex: 1 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
        zoomControl={false}
      />

      {farmers.map((farmer, index) => (
        <Marker key={`farmer-${index}`} position={[farmer.location.latitude, farmer.location.longitude]} icon={farmerIcon}>
          <Popup>
            <p className='text-center text-xl font-extrabold'>{farmer.first_name} {farmer.last_name}</p>
            <p className='text-center text-lg font-bold'>{farmer.farm_name}</p>
            <p className='text-center text-sm font-md'>{farmer.location.longitude}, {farmer.location.latitude}</p>
          </Popup>
        </Marker>
      ))}

      {buyers.map((buyer, index) => (
        <Marker key={`buyer-${index}`} position={[buyer.location.latitude, buyer.location.longitude]} icon={buyerIcon}>
          <Popup>
            <p className='text-center text-xl font-extrabold'>{buyer.first_name} {buyer.last_name}</p>
            <p className='text-center text-lg font-bold'>{buyer.store_name}</p>
            <p className='text-center text-sm font-md'>{buyer.location.longitude}, {buyer.location.latitude}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DisplayLocation;
