import "../index.css";
import { LatLngExpression } from "leaflet";
import React, { useEffect, useReducer, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const pos: LatLngExpression = [51.425668, -0.563063];

export const Community = () => (
  <div className="w-full h-full flex justify-center align-middle">
    <div className="w-3/4 h-3/4 absolute m-auto p-3">
      <MapContainer
        center={pos}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={pos}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  </div>
);
