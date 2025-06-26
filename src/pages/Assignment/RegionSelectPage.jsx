import { useNavigate } from "react-router-dom";
import { useGlobalData } from "../../default-data/DefaultGlobalData";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import globalRegions from "../../default-data/global-parameters.json";

// Shadow
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Custom Icons
const currentIcon = new L.Icon({
  iconUrl: "/markers/current-marker.png",
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const newIcon = new L.Icon({
  iconUrl: "/markers/new-marker.png",
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function RegionSelectorPage() {
  const { loadRegion, regionIndex } = useGlobalData();
  const navigate = useNavigate();

  function handleRegionSelect(index) {
    loadRegion(index);
    navigate("/Assignment/Initialization");
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-5 p-10">
      <h1 className="text-4xl font-extrabold text-neutral-800">Select Your Region</h1>
      <p className="text-md text-neutral-600 mb-5">
        Click on a region below to load the farmers and buyers of that region.
      </p>

      <MapContainer
        center={[12.8797, 121.7740]}
        zoom={6}
        style={{
          height: "70vh",
          width: "90vw",
          borderRadius: "10px",
          border: "2px solid #ccc",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {globalRegions.map((region, index) => {
          const isCurrent = index === regionIndex;
          const position = [
            region.main_location.latitude,
            region.main_location.longitude,
          ];

          return (
            <Marker
              key={index}
              position={position}
              icon={isCurrent ? currentIcon : newIcon}
              eventHandlers={{
                click: () => handleRegionSelect(index),
              }}
            >
              <Tooltip>
                <strong>{region.region_name || `Region ${index + 1}`}</strong>
                <br />
                {isCurrent ? "Currently Selected ✅" : "Click to select this region"}
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="flex flex-wrap justify-center mt-6 gap-4">
        {globalRegions.map((region, index) => (
          <button
            key={index}
            onClick={() => handleRegionSelect(index)}
            className={`px-5 py-2 rounded-lg font-bold transition ${
              index === regionIndex
                ? "bg-emerald-500 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105"
            }`}
          >
            {region.region_name || `Region ${index + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RegionSelectorPage;
