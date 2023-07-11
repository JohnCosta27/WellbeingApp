/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Place,
  namedOperations,
  useCreatePlaceMutation,
} from "@wellbeing/graphql-types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FC, useRef, useState, Fragment, useEffect } from "react";
import L, { LatLngExpression, Map } from "leaflet";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { Card } from "../ui";
import { checkIfPlaceIsDistinct } from "../utils";

const pos: LatLngExpression = [51.425668, -0.563063];

type MapCardProps = {
  places: Place[];
  setDisplayedPlace: (place: Place | null) => void;
};

export const MapCard: FC<MapCardProps> = ({ places, setDisplayedPlace }) => {
  const [center, setCenter] = useState(pos);

  const [createPlaceMutation] = useCreatePlaceMutation({
    refetchQueries: [namedOperations.Query.Places],
  });

  const [showNewPlaceModal, setShowNewPlaceModal] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState("");

  useEffect(() => {
    if (!showNewPlaceModal) return;
    if (!mapRef.current) return;

    const map = mapRef.current as Map;

    const currentCenter = map.getCenter();

    if (checkIfPlaceIsDistinct(places, currentCenter, 30)) {
      alert(
        "This is too close to an existing place. Try again with a different location."
      );
      setShowNewPlaceModal(false);
    }
  }, [showNewPlaceModal]);

  const handleNewPlaceSubmit = async () => {
    if (!mapRef.current) return;

    const map = mapRef.current as Map;

    const currentCenter = map.getCenter();

    createPlaceMutation({
      variables: {
        name: newPlaceName,
        latitude: currentCenter.lat,
        longitude: currentCenter.lng,
      },
    });
    setShowNewPlaceModal(false);
    setNewPlaceName("");
  };

  // TODO: remove the any, but Map | null | undefined doesn't work :(
  const mapRef = useRef<any>();

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
        <button
          type="button"
          className="btn top-1 right-1 z-[1000] absolute btn-info select-none decoration-none"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowNewPlaceModal(true);
          }}
        >
          Add A Place
        </button>
      </MapContainer>
      <Transition show={showNewPlaceModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setShowNewPlaceModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3">
                    <div className="flex justify-center">
                      <h3 className="font-bold text-lg flex-1">
                        Add a new place
                      </h3>
                      <button
                        className="m-auto"
                        type="button"
                        onClick={() => setShowNewPlaceModal(false)}
                      >
                        <AiOutlineCloseCircle className="h-8 w-8 m-auto" />
                      </button>
                    </div>
                  </Dialog.Title>

                  <p>
                    This will add a place the center of your current map view.
                    Zoom in if you want to be more preicse with your location!
                  </p>
                  <div className="modal-action flex">
                    <input
                      type="text"
                      placeholder="Name"
                      className="input input-secondary flex-1 max-w-[55vw] m-auto"
                      value={newPlaceName}
                      onChange={(e) => setNewPlaceName(e.target.value)}
                    />
                    {/* if there is a button in form, it will close the modal */}
                    <button
                      className="btn"
                      type="submit"
                      onClick={() => handleNewPlaceSubmit()}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
