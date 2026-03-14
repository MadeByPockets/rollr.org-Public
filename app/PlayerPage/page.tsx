"use client"
import {MockedTags} from "@/mocks/Tags";
import PlayerTagsCard from "@/components/PlayerPage/PlayerTagsCard";

const PlayerPage = () => {
  return (
    <div style={{margin: "150px"}}>
      <PlayerTagsCard PlayerTags={MockedTags} />
    </div>
  )
};

export default PlayerPage;
