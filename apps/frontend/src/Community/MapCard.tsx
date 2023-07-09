/* eslint-disable jsx-a11y/anchor-is-valid */
import { Place } from "@wellbeing/graphql-types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FC, useEffect, useRef, useState } from "react";
import L, { LatLngExpression, Map } from "leaflet";
import { AiOutlineCloseCircle } from "react-icons/ai";
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

  const [newPlace, setNewPlace] = useState<Place | null>(null);

  const [showNewPlaceModal, setShowNewPlaceModal] = useState(false);

  // TODO: remove the any, but Map | null | undefined doesn't work :(
  const mapRef = useRef<any>();

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current as Map;

    // do something with map
  }, []);

  return (
    <div className=" top-0 sticky m-0 p-0 w-full h-full flex-1 md:order-last">
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={16}
        scrollWheelZoom={false}
        className="md:w-full md:h-[92vh]  w-screen h-[95vh] m-0 p-0"
        touchZoom
        zoomControl
        tap
        dragging
        easeLinearity={0.35}
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
        <a
          type="button"
          className="btn top-1 right-1 z-[1000] absolute btn-info select-none decoration-none"
          /* onClick={(e) => {
            console.log("click");
            e.preventDefault();
            e.stopPropagation();
            const map = mapRef.current as Map;
          }} */
          href="#newPlaceModal"
        >
          Add A Place
        </a>
      </MapContainer>
      <div id="newPlaceModal" className="modal w-screen h-screen">
        <form method="dialog" className="modal-box">
          <div className="flex justify-center">
            <h3 className="font-bold text-lg flex-1">Add a new place</h3>
            <a className="m-auto" href="#">
              <AiOutlineCloseCircle className="h-8 w-8 m-auto" />
            </a>
          </div>
          <p>
            This adds the place to the center of the map, so zoom in and the position where you want to add the place.
          </p>
          <div className="modal-action flex">
          <input
            type="text"
            placeholder="Name"
            className="input input-secondary flex-1 max-w-[55vw] m-auto"
          />
            {/* if there is a button in form, it will close the modal */}
            <a className="btn" href="#">
              Submit
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
