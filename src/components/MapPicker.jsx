import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue with React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationMarker = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

export const MapPicker = ({ onLocationChange, initialLatLng = null }) => {
  const [position, setPosition] = useState(initialLatLng);
  const defaultCenter = { lat: 11.1505, lng: 123.7229 }; // Bantayan Island center

  useEffect(() => {
    if (position) {
      onLocationChange(position);
    }
  }, [position, onLocationChange]);

  return (
    <div className="mt-2">
      <p className="text-xs text-gray-500 mb-1">
        📍 Click on the map to pin the exact location
      </p>
      <MapContainer
        center={position || defaultCenter}
        zoom={13}
        style={{ height: "300px", width: "100%", borderRadius: "12px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <LocationMarker setPosition={setPosition} />
        {position && <Marker position={[position.lat, position.lng]} />}
      </MapContainer>
      {position && (
        <p className="text-xs text-gray-500 mt-1">
          Pinned: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
        </p>
      )}
    </div>
  );
};
