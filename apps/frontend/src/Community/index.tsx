import "../index.css";
import { usePlacesQuery } from "@wellbeing/graphql-types";
import { Card } from "../ui";
import { MapCard } from "./MapCard";
import { CommunityMessages } from "./CommunityMessages";

export const Community = () => {
  const { data } = usePlacesQuery();

  return (
    <div className="w-full flex gap-4 md:flex-row flex-col">
      {data && data.places && (
        <>
          <MapCard places={data.places} />
          <CommunityMessages places={data.places} />
        </>
      )}
    </div>
  );
};
