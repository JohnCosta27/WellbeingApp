import { Place } from "@wellbeing/graphql-types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FC, useEffect, useRef, useState } from "react";
import { LatLngExpression, Map } from "leaflet";
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

    const { leafletElement: map } = mapRef.current;

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
            eventHandlers={{
              click: () => {
                setDisplayedPlace(place);
                if (!mapRef.current) return;
                mapRef.current.flyTo([place.latitude, place?.longitude], 16);
                setCenter([place.latitude, place?.longitude]);
              },
            }}
          >
            <Popup>
              <div>
                {place.messages && place.messages?.length > 0 && (
                  <div className="overflow-x-auto">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{place.name}</h5>
                        {place.messages.map((message) => (
                          <div className="chat chat-start" key={message?.id}>
                            <div className="chat-bubble chat-bubble-primary select-none cursor-pointer">
                              {message?.message}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
