import "../index.css";
import { LatLngExpression } from "leaflet";
import React, { useEffect, useReducer, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { usePlacesQuery } from "@wellbeing/graphql-types";
import { Card } from "../ui";

const pos: LatLngExpression = [51.425668, -0.563063];

export const Community = () => {
  const { data } = usePlacesQuery();

  return (
    <div className="w-full flex justify-center align-middle gap-4">
      <Card className="flex-1 h-full " title="Community Messages">
        here are some messages!
      </Card>
      <Card className="w-full m-auto p-3 h-full flex-1">
        <MapContainer
          center={pos}
          zoom={13}
          scrollWheelZoom={false}
          className="md:w-full md:h-[93vh] h-screen w-screen"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data?.places?.map((place) => (
            <Marker
              position={[place?.latitude, place?.longitude]}
              key={place.id}
            >
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
    </div>
  );
};
