import { MapContainer, TileLayer, Polyline, Marker, Tooltip, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";

// --- CUSTOM DECODER FOR VALHALLA POLYLINE ---
// refer to the damn source code its insane btw
// original is written in c++ i had to rewrite it
function decodeValhallaPolyline(encoded) {
  let index = 0, lat = 0, lng = 0, coordinates = [];
  const length = encoded.length;
  const shift = () => {
    let result = 0, shift = 0, b;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    return (result & 1) ? ~(result >> 1) : (result >> 1);
  };
  while (index < length) {
    lat += shift();
    lng += shift();
    coordinates.push([lat / 1e6, lng / 1e6]);
  }
  return coordinates;
}

// --- FIT MAP TO ROUTE ---
// the map is so bad that like it doesnt auotmaticallyt adjust im going insane
function FitMapToRoute({ positions }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [positions, map]);

  return null;
}

// --- MARKER ICON ---
const buyerIcon = new L.Icon({
  iconUrl: "/markers/buyer-marker.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const farmerIcon = new L.Icon({
  iconUrl: "/markers/farmer-marker.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// --- MAIN COMPONENT ---
function DisplayRoute({ route, buyer, farmer }) {


  const buyerLatLng = [buyer.location.latitude, buyer.location.longitude];
  const farmerLatLng = [farmer.location.latitude, farmer.location.longitude];

  const routeCoords = useMemo(() => decodeValhallaPolyline(route.shape), [route.shape]);
  const allPositions = useMemo(() => [buyerLatLng, farmerLatLng, ...routeCoords], [buyerLatLng, farmerLatLng, routeCoords]);

  if (!route || !route.shape) return null;
  return (
    <div style={{ height: "400px", width: "100%", marginTop: "10px", borderRadius: "12px", overflow: "hidden" }}>
      <MapContainer
        center={buyerLatLng}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >

        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitMapToRoute positions={allPositions} />

        <Polyline positions={routeCoords} color="blue" weight={5} />

        <Marker position={buyerLatLng} icon={buyerIcon}>
          <Popup direction="top" offset={[0, -15]} opacity={1} permanent>
            🏪 {buyer.store_name}
          </Popup>
        </Marker>

        <Marker position={farmerLatLng} icon={farmerIcon}>
          <Popup direction="top" offset={[0, -15]} opacity={1} permanent>
            🚜 {farmer.farm_name}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default DisplayRoute;
