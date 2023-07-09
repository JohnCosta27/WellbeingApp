import { Place } from "@wellbeing/graphql-types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FC, useEffect, useRef, useState } from "react";
import L, { LatLngExpression, Map } from "leaflet";
import { Card } from "../ui";

const pos: LatLngExpression = [51.425668, -0.563063];

type MapCardProps = {
  places: Place[];
  displayedPlace?: Place | null;
  setDisplayedPlace: (place: Place | null) => void;
};

export const MapCard: FC<MapCardProps> = ({
  places,
  displayedPlace,
  setDisplayedPlace,
}) => {
  const [center, setCenter] = useState(pos);
  // const [map, setMap] = useState<Map | undefined>(undefined);

  // TODO: remove the any, but Map | null | undefined doesn't work :(
  const mapRef = useRef<any>();

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current as Map;

    // do something with map
  }, []);

  return (
    <div className="w-full md:p-3 h-full flex-1 md:order-last top-0 sticky m-0 p-0">
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={16}
        scrollWheelZoom={false}
        className="md:w-full h-[95vh]  w-screen m-0 p-0"
        touchZoom
        zoomControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places?.map((place) => (
          <Marker
            position={[place.latitude, place?.longitude]}
            key={place.id}
            interactive
            opacity={0.8}
            eventHandlers={{
              popupopen: (m) => {
                setDisplayedPlace(place);
                if (!mapRef.current) return;
                // -0.002 is a hack to make the marker appear in the middle of the screen
                mapRef.current.flyTo(
                  [place.latitude - 0.002, place?.longitude],
                  16
                );
                setCenter([place.latitude, place?.longitude]);
                const marker = m.sourceTarget satisfies L.Marker;
                marker.setOpacity(1);
              },
              popupclose: (m) => {
                const marker = m.sourceTarget satisfies L.Marker;
                marker.setOpacity(0.8);
              },
            }}
          >
            <Popup keepInView={false} className="m-0 p-0">
              {place.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
