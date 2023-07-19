import "../index.css";
import {
  CommunityMessage,
  Place,
  namedOperations,
  useCommunityMessageQuery,
  useCreateCommunityMessageMutation,
  useCurrentUserQuery,
  useDeleteMessageMutation,
  usePlacesQuery,
} from "@wellbeing/graphql-types";

import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle, AiOutlineDelete } from "react-icons/ai";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { MapCard } from "./MapCard";
import { Card } from "../ui/Card";
import { UserContext } from "../DashboardLayout";
import { scrollIntoViewIfNeeded } from "../utils";

// used for the relative time of messages
dayjs.extend(relativeTime);

export const Community = () => {
  const { data: user } = useContext(UserContext);

  const { data, refetch: refetchPlaces } = usePlacesQuery();

  const [displayedPlace, setDisplayedPlace] = useState<Place | null>(null);

  const [message, setMessage] = useState("");

  const bottomDiv = useRef<HTMLDivElement | null>(null);

  const places = data?.places;

  // the graphql query for adding messages to a place
  const [addMessage] = useCreateCommunityMessageMutation({
    refetchQueries: [namedOperations.Query.CommunityMessage],
    variables: {
      placeId: displayedPlace ? displayedPlace.id : "",
      message,
    },
  });

  const {
    data: messageData,
    startPolling: pollForMessages,
    stopPolling: stopPollingForMessages,
  } = useCommunityMessageQuery({
    variables: { placeId: displayedPlace ? displayedPlace.id : "" },
  });

  useEffect(() => {
    if (displayedPlace) {
      pollForMessages(1000);
    } else {
      stopPollingForMessages();
    }
  }, [displayedPlace]);

  useEffect(() => {
    if (data?.places && displayedPlace) {
      const place = data.places.find((p) => p.id === displayedPlace.id);
      if (place) {
        setDisplayedPlace(place);
      }
    }
  }, [data?.places]);

  const [deleteMessage] = useDeleteMessageMutation({
    refetchQueries: [namedOperations.Query.CommunityMessage],
  });

  // TODO: this doesn't refetch for some reason
  const handleSendMessage = async () => {
    if (!displayedPlace) return;
    await addMessage({
      variables: { message, placeId: displayedPlace.id },
    });
    setMessage("");
    await refetchPlaces();
  };

  /**
   * Scroll to the bottom of the chat when a new message is added or a new place is selected
   */
  useEffect(() => {
    if (bottomDiv.current) {
      scrollIntoViewIfNeeded(bottomDiv.current);
    }
  }, [displayedPlace, bottomDiv.current, refetchPlaces]);

  return (
    <div className="w-full flex gap-4 md:flex-row flex-col">
      {places && (
        <>
          <MapCard places={places} setDisplayedPlace={setDisplayedPlace} />
          {displayedPlace && data.places && (
            <div className="w-full md:relative fixed bottom-0 bg-white h-[50vh] md:h-[92vh] z-10 flex flex-col flex-1">
              {messageData ? (
                <>
                  <div className="flex w-full border">
                    <div className="flex-1 text-xl p-2 m-auto text-center md:m-0">
                      {displayedPlace.name} -{" "}
                      {messageData.CommunityMessage?.length} Message
                      {messageData.CommunityMessage?.length !== 1 && "s"}
                    </div>
                    <button
                      onClick={() => setDisplayedPlace(null)}
                      type="button"
                      className="right-0 md:max-h-0 md:p-2 flex"
                    >
                      <AiOutlineCloseCircle className="h-8 w-8 m-auto" />
                    </button>
                  </div>
                  <div className="overflow-y-auto overflow-x-hidden flex-1 justify-end ml-1 max-w-screen md:max-w-full">
                    {[...messageData.CommunityMessage]
                      .sort((a, b) =>
                        (a?.date ? a.date : 0) > (b?.date ? b.date : 0) ? 1 : -1
                      )
                      .map((msg) => (
                        <div
                          className={`chat ${
                            user?.currentUser.id === msg?.userId
                              ? "chat-end right-3 "
                              : "chat-start left-3"
                          } flex-col flex max-w-screen relative md:max-w-full`}
                          key={msg?.id}
                        >
                          <div className="chat-header">
                            <div className="text-sm text-gray-600 flex justify-center align-middle">
                              <div className="flex-1 m-auto">
                                {`${msg?.first_name} ${msg?.last_name}`} -{" "}
                                {dayjs(msg?.date).fromNow()}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center align-middle">
                            <div className="flex">
                              {user?.currentUser.id === msg?.userId && (
                                <button
                                  className="w-5 h-5 m-auto mr-2"
                                  onClick={() => {
                                    if (msg) {
                                      deleteMessage({
                                        variables: { messageId: msg.id },
                                      });
                                    }
                                  }}
                                  type="button"
                                >
                                  <AiOutlineDelete className="h-full w-full m-auto" />
                                </button>
                              )}
                            </div>
                            <div className="chat-bubble chat-bubble-secondary select-none cursor-pointer flex-1 max-w-xs break-all">
                              {msg?.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    <div ref={bottomDiv} />
                  </div>
                </>
              ) : (
                <div className="flex-1 flex justify-center align-middle">
                  <div className="m-auto">Loading...</div>
                </div>
              )}
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
            </Card>
          )}
        </>
      )}
    </div>
  );
};
