import "../index.css";
import { Place, usePlacesQuery } from "@wellbeing/graphql-types";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Card } from "../ui";
import { MapCard } from "./MapCard";
import { CommunityMessages } from "./CommunityMessages";

export const Community = () => {
  const { data } = usePlacesQuery();

  const [displayedPlace, setDisplayedPlace] = useState<Place | null>(null);

  useEffect(() => {
    console.log(`Displayed place: ${displayedPlace?.name}`);
  }, [displayedPlace]);

  const places = data?.places;

  return (
    <div className="w-full flex gap-4 md:flex-row flex-col">
      {places && (
        <>
          <MapCard
            places={places}
            displayedPlace={displayedPlace}
            setDisplayedPlace={setDisplayedPlace}
          />

          {displayedPlace && data.places && (
            <div className="w-full fixed bottom-0 bg-white h-[50vh] z-10 flex flex-col">
              <div className="flex w-full">
                <div className="flex-1 text-xl p-2 m-auto">
                  {displayedPlace.name}
                </div>
                <button
                  onClick={() => setDisplayedPlace(null)}
                  type="button"
                  className="right-0"
                >
                  <AiOutlineCloseCircle className="h-10 w-10 m-2" />
                </button>
              </div>
              <div className="overflow-x-auto flex-1">
                {displayedPlace.messages &&
                  displayedPlace.messages.map((message) => (
                    <div className="chat chat-start" key={message?.id}>
                      <div className="chat-bubble chat-bubble-secondary select-none cursor-pointer">
                        {message?.message}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex justify-end card-action align-bottom m-2 bottom-0">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
                <button className="btn btn-secondary ml-2" type="submit">
                  Send
                </button>
              </div>
            </div>
          )}
          {/* <CommunityMessages
            places={places}
            displayedPlace={displayedPlace}
            setDisplayedPlace={setDisplayedPlace}
      /> */}
        </>
      )}
    </div>
  );
};
