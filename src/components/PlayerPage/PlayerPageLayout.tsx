"use client";

import React from "react";
import { Grid, Box, useMediaQuery, useTheme, NoSsr } from "@mui/material";
import PlayerDisplayCard, { PlayerDisplayProps } from "./PlayerDisplayCard";
import PlayerDetailsCard, { PlayerDetailsProps } from "./PlayerDetailsCard";
import PlayerTagsCard from "./PlayerTagsCard";
import PlayerPromptCard, { PlayerPromptCardProps } from "./PlayerPromptCard";
import PlayerTagsEdit from "./PlayerTagsEdit";
import { Tag } from "@/types/tag";

export type PlayerPageLayoutProps = {
    playerData: PlayerDisplayProps & PlayerDetailsProps;
    tags: Tag[];
    blurbs: PlayerPromptCardProps[];
    isOwner?: boolean;
    possibleTags?: Tag[];
    onToggleTag?: (tagId: number) => void;
};

export default function PlayerPageLayout({
    playerData,
    tags = [],
    blurbs = [],
    isOwner = false,
    possibleTags = [],
    onToggleTag = () => {},
}: PlayerPageLayoutProps) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

    const tagsElement = isOwner ? (
        <PlayerTagsEdit
            selectedTags={tags}
            possibleTags={possibleTags}
            onToggleTag={onToggleTag}
        />
    ) : (
        <PlayerTagsCard tags={tags} />
    );

    return (
        <NoSsr>
            <Box sx={{ padding: "2rem", marginRight: "auto", marginLeft: "auto" }} justifyContent="center">
                <Grid container spacing={3} justifyContent="center" sx={{ marginRight: "auto", marginLeft: "auto" }}>
                    {/* Left Lane: PlayerDetails and Tags (only on large screens) */}
                    {!isSmallScreen && (
                        <Grid size={{ xs: 12, lg: 3 }}>
                            <PlayerDetailsCard
                                preferredPronouns={playerData.preferredPronouns}
                                age={playerData.age}
                                yearsPlaying={playerData.yearsPlaying}
                                discordUsername={playerData.discordUsername}
                                preferredGames={playerData.preferredGames}
                            />
                            {tagsElement}
                        </Grid>
                    )}

                    {/* Right Side: All other cards */}
                    <Grid size={{ xs: 12, lg: 6 }}>
                        <Grid container spacing={3}>
                            {/* PlayerDisplay Card */}
                            <Grid size={{ xs: 12, lg: 8 }}>
                                <PlayerDisplayCard
                                    profilePicture={playerData.profilePicture}
                                    username={playerData.username}
                                    bio={playerData.bio}
                                    preferredPronouns={playerData.preferredPronouns}
                                />
                            </Grid>

                            {/* Render DetailsCard in small screens */}
                            {isSmallScreen && (
                                <Grid size={{ xs: 12, lg: 3 }}>
                                    <PlayerDetailsCard
                                        preferredPronouns={playerData.preferredPronouns}
                                        age={playerData.age}
                                        yearsPlaying={playerData.yearsPlaying}
                                        discordUsername={playerData.discordUsername}
                                        preferredGames={playerData.preferredGames}
                                    />
                                </Grid>
                            )}

                            {/* PlayerPromptCards */}
                            {blurbs.map((blurb, index) => (
                                <Grid size={{ xs: 12, lg: 8 }} key={index}>
                                    <PlayerPromptCard
                                        title={blurb.title}
                                        description={blurb.description}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </NoSsr>
    );
}
