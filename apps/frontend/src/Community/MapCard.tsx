import { Place } from "@wellbeing/graphql-types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FC } from "react";
import { Card } from "../ui";
import { LatLngExpression } from "leaflet";

const pos: LatLngExpression = [51.425668, -0.563063];

type MapCardProps = {
  places: Place[];
};

export const MapCard: FC<MapCardProps> = ({ places }) => (
  <Card className="w-full p-3 h-full flex-1 md:order-last top-0 sticky">
    <MapContainer
      center={pos}
      zoom={16}
      scrollWheelZoom={false}
      className="md:w-full md:h-[90vh] h-screen w-[90vw]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places?.map((place) => (
        <Marker position={[place?.latitude, place?.longitude]} key={place.id}>
          <Popup>
            <Card title={place?.name}>
              {place.messages && place.messages?.length > 0 && (
                <div className="overflow-x-auto">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Messages</h5>
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
            </Card>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </Card>
);
