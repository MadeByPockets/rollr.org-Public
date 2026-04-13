"use client";

import React from "react";
import { MockedTags } from "@/mocks/Tags";
import { PlayerPageLayout } from "@/components/PlayerPage";

const mockPlayerData = {
    username: "DragonSlayer99",
    profilePicture: "/man-walking-silhouette-clipart.jpg",
    bio: "Professional gamer specializing in RPGs and strategy games. Love competitive play but also enjoy a good story-driven RPG.",
    preferredPronouns: "He/Him",
    age: 25,
    yearsPlaying: 10,
    discordUsername: "DragonSlayer#1234",
    preferredGames: ["World of Warcraft", "Starcraft II", "Baldur's Gate 3"],
};

const mockBlurbs = [
    { title: "Favorite RPGs", description: "I've spent hundreds of hours in Baldur's Gate 3, The Witcher 3, and Dragon Age: Origins. I love deep storytelling and character customization." },
    { title: "Competitive Spirit", description: "I'm always looking for a challenge. Whether it's climbing the ranks in StarCraft or mastering high-end raids in WoW, I love the thrill of high-stakes play." },
    { title: "Gaming Setup", description: "Custom-built PC with an RTX 3080, Ryzen 9 5900X, and dual 27-inch 1440p monitors. Mechanical keyboard with Cherry MX Blue switches." },
];

const PlayerPage = () => {
  return (
    <div style={{ margin: "50px" }}>
      <PlayerPageLayout
        playerData={mockPlayerData}
        tags={MockedTags.slice(0, 5)}
        blurbs={mockBlurbs}
      />
    </div>
  );
};

export default PlayerPage;
