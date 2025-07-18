"use client"
import {Tags} from "@/mocks/Tags";
import PlayerTagsEdit from "@/components/ProfilePage/PlayerTagsEdit";

const PlayerPage = () => {
  return (
    <div style={{margin: "150px"}}>
      <PlayerTagsEdit PlayerTags={Tags.slice(0,5)} updatePlayerTags={() => {}} possibleTags={Tags}/>
    </div>
  )
};

export default PlayerPage;
