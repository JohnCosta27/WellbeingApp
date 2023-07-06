import { Place } from "@wellbeing/graphql-types";
import { FC, useState } from "react";
import { Card } from "../ui";

type CommunityMessagesProps = {
  places: Place[];
};

export const CommunityMessages: FC<CommunityMessagesProps> = ({ places }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  return (
    <Card
      className="flex-1 h-full grid grid-cols-4 gap-4 mx-auto container p-6"
      title="Community Messages"
    >
      {places
        .filter((place) => place.messages?.length)
        .map((place) => (
          <div className="card bg-primary shadow-xl col-span-1" key={place.id}>
            <div className="card-body">
              <div className="card-title">{place.name}</div>
              <div className="flex-auto">
                {place.messages &&
                  place.messages.map((message) => (
                    <div className="chat chat-start" key={message?.id}>
                      <div className="chat-bubble chat-bubble-secondary select-none cursor-pointer">
                        {message?.message}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex justify-end card-action align-bottom">
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
          </div>
        ))}
    </Card>
  );
};
