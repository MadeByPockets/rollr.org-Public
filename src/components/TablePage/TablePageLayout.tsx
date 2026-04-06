"use client";

import { JSX, useEffect, useMemo, useRef, useState } from "react";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import AutoResizingTextarea from "@/components/shared/AutoResizingTextarea";
import { TagEditor, generateTagsDisplay } from "@/components/shared";
import { DMHighlightsCard, PlayerHighlightsCard } from "@/components/TablePage/players/PlayerHighlightsCard";
import TableActionsBar from "@/components/TablePage/TableActionsBar";
import type { Player } from "@/types/player";
import type { TableRecord } from "@/types/tables";
import type { Tag } from "@/types/tag";
import type { TablePageLayoutProps } from "@/components/TablePage/types";

export function TablePageLayout(props: TablePageLayoutProps) {
    const { allTags, dungeonMaster, onDeleteTable, onJoinWaitlist, onLeaveTable, onSaveDraft, players, table, tableStatus, waitlistPlayers } = props;
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [isTableInEditMode, setIsTableInEditMode] = useState(false);

    const [currentDescription, setCurrentDescription] = useState(table.description);
    const [currentDungeonMaster, setCurrentDungeonMaster] = useState(dungeonMaster);
    const [currentPlayers, setCurrentPlayers] = useState(players);
    const [currentShortDescription, setCurrentShortDescription] = useState(table.shortDescription);
    const [currentTitle, setCurrentTitle] = useState(table.title);
    const [currentWaitlistPlayers, setCurrentWaitlistPlayers] = useState(waitlistPlayers);
    const [currentTagIds, setCurrentTagIds] = useState<number[]>(table.tags ?? []);

    useEffect(() => {
        setCurrentDescription(table.description);
        setCurrentDungeonMaster(dungeonMaster);
        setCurrentPlayers(players);
        setCurrentShortDescription(table.shortDescription);
        setCurrentTitle(table.title);
        setCurrentWaitlistPlayers(waitlistPlayers);
        setCurrentTagIds(table.tags ?? []);
    }, [dungeonMaster, players, table, waitlistPlayers]);

    const currentTags = useMemo(
        () => allTags.filter((tag) => currentTagIds.includes(tag.id)),
        [allTags, currentTagIds]
    );

    const handleAssignToDungeonMaster = (newDungeonMaster: Player) => {
        setCurrentDungeonMaster(newDungeonMaster);
    };

    const handleRemovePlayerFromTable = (playerToRemove: Player): void => {
        setCurrentPlayers((prevState) => prevState.filter((player) => player.id !== playerToRemove.id));
    };

    const handlePromoteWaitlistPlayer = (playerIdToPromote: number) => {
        setCurrentWaitlistPlayers((prevWaitlist) => {
            const foundPlayer = prevWaitlist.find((player) => player.id === playerIdToPromote);
            if (!foundPlayer) {
                return prevWaitlist;
            }

            setCurrentPlayers((prevPlayers) => [...prevPlayers, foundPlayer]);
            return prevWaitlist.filter((player) => player.id !== playerIdToPromote);
        });
    };

    const handleToggleTag = (tagId: number) => {
        setCurrentTagIds((prevState) =>
            prevState.includes(tagId)
                ? prevState.filter((id) => id !== tagId)
                : [...prevState, tagId]
        );
    };

    const handleSaveTable = () => {
        const nextDraft: TableRecord = {
            ...table,
            description: currentDescription,
            dungeonMaster: String(currentDungeonMaster.id),
            players: currentPlayers.map((player) => player.id),
            shortDescription: currentShortDescription,
            tags: currentTagIds,
            title: currentTitle,
            waitlist: currentWaitlistPlayers.map((player) => player.id),
        };

        void onSaveDraft?.(nextDraft);
        setIsTableInEditMode(false);
    };

    return (
        <Card
            sx={{
                backgroundColor: isTableInEditMode ? "lightsalmon" : "white",
                borderRadius: "5%",
                p: 2,
                boxShadow: "0px 8px 15px rgba(25, 118, 210, 0.3)",
            }}
        >
            <Grid container direction="column">
                <Grid
                    container
                    direction="column"
                    spacing={1}
                    sx={{
                        px: 2,
                        py: 1.5,
                        borderRadius: 2,
                        background: "linear-gradient(135deg, rgba(25,118,210,0.8), rgba(25,118,210,1))",
                        textShadow:'4px 4px 6px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <Box>
                        {isTableInEditMode ? (
                            <input
                                onChange={(e) => setCurrentTitle(e.target.value)}
                                style={{ backgroundColor: '#fffbea' }}
                                tabIndex={0}
                                type="text"
                                value={currentTitle}
                            />
                        ) : (
                            <CardHeader
                                title={currentTitle}
                                sx={{
                                    p: 0,
                                    "& .MuiCardHeader-title": {
                                        color: "white",
                                        fontWeight: 700,
                                    },
                                }}
                            />
                        )}
                    </Box>

                    {isTableInEditMode ? (
                        <input
                            onChange={(e) => setCurrentShortDescription(e.target.value)}
                            style={{ backgroundColor: '#fffbea' }}
                            tabIndex={0}
                            type="text"
                            value={currentShortDescription}
                        />
                    ) : (
                        <Typography sx={{ color: "white", opacity: 0.95 }}>
                            {currentShortDescription}
                        </Typography>
                    )}

                    <Grid container>
                        {isTableInEditMode
                            ? renderEditableTags(currentTags, allTags, handleToggleTag)
                            : renderTags(currentTagIds, allTags)}
                    </Grid>

                    <TableActionsBar
                        isInEditMode={isTableInEditMode}
                        numPlayers={currentPlayers.length}
                        onDeleteTable={onDeleteTable}
                        onEditModeChange={setIsTableInEditMode}
                        onJoinWaitlist={onJoinWaitlist}
                        onLeaveTable={onLeaveTable}
                        onPromoteWaitlistPlayer={handlePromoteWaitlistPlayer}
                        onSave={handleSaveTable}
                        slots={table.capacity || 0}
                        tableStatus={tableStatus}
                        waitlistPlayers={currentWaitlistPlayers}
                    />
                </Grid>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid size={{xs: 12, md:8}}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent>
                                {isTableInEditMode ? (
                                    <AutoResizingTextarea
                                        isInEditMode={isTableInEditMode}
                                        onChange={setCurrentDescription}
                                        textareaRef={textAreaRef}
                                        value={currentDescription}
                                    />
                                ) : (
                                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                                        {currentDescription}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{xs: 12, md:4}}>
                        <DMHighlightsCard canEdit={isTableInEditMode} player={currentDungeonMaster} allTags={allTags} />

                        <Card sx={{ height: "100%" }}>
                            <CardHeader slotProps={{title: {variant: "h4"}}} title="Players: "/>
                            <CardContent>
                                {currentPlayers.map((player) => (
                                    <PlayerHighlightsCard
                                        allTags={allTags}
                                        canChangeDungeonMaster={tableStatus.isOwner || tableStatus.isDM}
                                        canEdit={isTableInEditMode}
                                        handleAssignToDungeonMaster={handleAssignToDungeonMaster}
                                        key={player.id}
                                        player={player}
                                        removeFromTable={handleRemovePlayerFromTable}
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}

const renderTags = function (
    tags: number[] | undefined,
    allTags: Tag[] | undefined
): JSX.Element {
    if (!tags || !allTags) {
        return <></>;
    }
    return (
        <Grid container spacing={1} sx={{ pb: 1.5 }}>
            {tags.map((tagId) => {
                const tag = allTags.find((potentialTag) => tagId === potentialTag.id);
                return tag ? generateTagsDisplay(tag) : <></>;
            })}
        </Grid>
    );
};

const renderEditableTags = function (
    selectedTags: Tag[],
    allTags: Tag[],
    onToggleTag: (tagId: number) => void
): JSX.Element {
    return (
        <Grid size={{ xs: 12 }} sx={{ pb: 1.5 }}>
            <TagEditor
                title="Table Tags"
                possibleTags={allTags.filter((tag) => tag.appliesTo?.tables)}
                selectedTags={selectedTags}
                onToggleTag={onToggleTag}
            />
        </Grid>
    );
};

export default TablePageLayout;
