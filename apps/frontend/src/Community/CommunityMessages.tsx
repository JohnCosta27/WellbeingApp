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
              {place.messages &&
                place.messages.map((message) => (
                  <div className="chat chat-start" key={message?.id}>
                    <div className="chat-bubble chat-bubble-secondary select-none cursor-pointer">
                      {message?.message}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </Card>
  );
};
