"use client"
import {Tags} from "@/mocks/Tags";
import PlayerTagsCard from "@/components/PlayerPage/PlayerTagsCard";

const PlayerPage = () => {
  return (
    <div style={{margin: "150px"}}>
      <PlayerTagsCard PlayerTags={Tags} />
    </div>
  )
};

export default PlayerPage;
