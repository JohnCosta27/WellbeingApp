import "../index.css";
import { usePlacesQuery } from "@wellbeing/graphql-types";
import { Card } from "../ui";
import { MapCard } from "./MapCard";
import { CommunityMessages } from "./CommunityMessages";

export const Community = () => {
  const { data } = usePlacesQuery();

  const places = data?.places;

  return (
    <div className="w-full flex gap-4 md:flex-row flex-col">
      {places && (
        <>
          <MapCard places={places} />
          <CommunityMessages places={places} />
        </>
      )}
    </div>
  );
};
