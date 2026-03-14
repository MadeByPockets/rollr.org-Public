"use client"
import {MockedTags} from "@/mocks/Tags";
import PlayerTagsEdit from "@/components/ProfilePage/PlayerTagsEdit";

const PlayerPage = () => {
  return (
    <div style={{margin: "150px"}}>
      <PlayerTagsEdit PlayerTags={MockedTags.slice(0,5)} updatePlayerTags={() => {}} possibleTags={MockedTags}/>
    </div>
  )
};

export default PlayerPage;
