import "../index.css";
import {
  Place,
  namedOperations,
  useCreateCommunityMessageMutation,
  useCurrentUserQuery,
  usePlacesQuery,
} from "@wellbeing/graphql-types";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { MapCard } from "./MapCard";
import { Card } from "../ui/Card";

dayjs.extend(relativeTime);

export const Community = () => {
  const { data: user } = useCurrentUserQuery();

  const { data, refetch: refetchPlaces } = usePlacesQuery();

  const [displayedPlace, setDisplayedPlace] = useState<Place | null>(null);
  const [message, setMessage] = useState("");

  const places = data?.places;

  // the graphql query for adding messages to a place
  const [addMessage] = useCreateCommunityMessageMutation({
    refetchQueries: [
      namedOperations.Query.CurrentUser,
      namedOperations.Query.Places,
    ],
    variables: {
      placeId: displayedPlace ? displayedPlace.id : "",
      message,
    },
  });

  const handleSendMessage = async () => {
    if (!displayedPlace) return;
    await addMessage({
      variables: { message, placeId: displayedPlace.id },
    });
    setMessage("");
    await refetchPlaces();
  };

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
            <div className="w-full md:relative fixed bottom-0 bg-white h-[50vh] z-10 flex flex-col flex-1">
              <div className="flex w-full border">
                <div className="flex-1 text-xl p-2 m-auto text-center md:m-0">
                  {displayedPlace.name} - {displayedPlace.messages?.length}{" "}
                  Message{displayedPlace.messages?.length !== 1 && "s"}
                </div>
                <button
                  onClick={() => setDisplayedPlace(null)}
                  type="button"
                  className="right-0 max-h-0 md:p-2"
                >
                  <AiOutlineCloseCircle className="h-8 w-8" />
                </button>
              </div>
              <div className="overflow-y-auto overflow-x-hidden flex-1 justify-end ml-1 max-w-screen md:max-w-full">
                {displayedPlace.messages &&
                  displayedPlace.messages.map((msg) => (
                    <div
                      className={`chat ${
                        user?.currentUser.id === msg?.userId
                          ? "chat-end right-3 "
                          : "chat-start left-3"
                      } flex-col flex max-w-screen relative md:max-w-full`}
                      key={msg?.id}
                    >
                      <div className="chat-header">
                        <div className="text-sm text-gray-600">
                          {msg?.email.split("@")[0]} -{" "}
                          {dayjs(msg?.date).fromNow()}
                        </div>
                      </div>
                      <div className="chat-bubble chat-bubble-secondary select-none cursor-pointer">
                        {msg?.message}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex justify-end card-action align-bottom m-2 bottom-0">
                <input
                  type="text"
                  placeholder="Your Message"
                  className="input input-bordered w-full flex-1"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <button
                  className="btn btn-secondary ml-2"
                  type="submit"
                  onClick={() => handleSendMessage()}
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {!displayedPlace && (
            <Card className="flex-1 min-h-full">
              Click on the markers to add a message to a place
            </Card>)}
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
