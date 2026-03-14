"use client"
import {JSX, useEffect, useRef, useState} from "react";
import {Card, CardContent, CardHeader, Typography, Box} from "@mui/material";
import Grid from "@mui/material/Grid";
import { generateTagsDisplay } from "@/components/shared/TagComponents";
import {DMHighlightsCard, PlayerHighlightsCard} from "@/components/TablePage/players/PlayerHighlightsCard";
import TableActionsBar from "@/components/TablePage/TableActionsBar";
import {TableStatus} from "@/components/TablePage/types";
import AutoResizingTextarea from "@/components/shared/AutoResizingTextarea";
import type { TableFormat } from "@/types/table";
import type { TagsFormat } from "@/types/tag";
import type { PlayerFormat, WaitlistPlayer } from "@/types/player";

export type TablePageLayoutProps = {
    table: TableFormat;
    allTags: TagsFormat[];
    players: PlayerFormat[];
    dungeonMaster: PlayerFormat;
    tableStatus: TableStatus;
    waitlistPlayers?: WaitlistPlayer[];
    onDeleteTable?: () => void | Promise<void>;
    onJoinWaitlist?: () => void | Promise<void>;
    onLeaveTable?: () => void | Promise<void>;
};

export function TablePageLayout(props: TablePageLayoutProps) {
    const {
        allTags,
        dungeonMaster,
        onDeleteTable,
        onJoinWaitlist,
        onLeaveTable,
        players,
        table,
        tableStatus,
        waitlistPlayers = [],
    } = props;
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [isTableInEditMode, setIsTableInEditMode] = useState(false);
    const [temporaryGameTable, setTemporaryGameTable] = useState<TableFormat | null>(null);
    const [currentDescription, setCurrentDescription] = useState(table.description);
    const [currentDungeonMaster, setCurrentDungeonMaster] = useState(dungeonMaster);
    const [currentPlayers, setCurrentPlayers] = useState(players);
    const [currentShortDescription, setCurrentShortDescription] = useState(table.shortDescription);
    const [currentTitle, setCurrentTitle] = useState(table.title);
    const [currentWaitlist, setCurrentWaitlist] = useState(table.waitlist);
    const [currentWaitlistPlayers, setCurrentWaitlistPlayers] = useState(waitlistPlayers);

    const handleAssignToDungeonMaster = (newDungeonMaster: PlayerFormat) => {
        setCurrentDungeonMaster(newDungeonMaster);
    };

    const handleRemovePlayerFromTable = (playerToRemove: PlayerFormat): void => {
        if (currentPlayers.includes(playerToRemove)) {
            setCurrentPlayers((prevState) => prevState.filter((player) => playerToRemove !== player));
        }
    };

    const handleRemovePlayerFromWaitlist = (playerIdToRemoveFromWaitlist: number) => {
        const foundPlayer = currentWaitlistPlayers.find((player) => player.id === playerIdToRemoveFromWaitlist);

        setCurrentWaitlist((prevState) =>
            prevState.filter((playerId) => playerId !== playerIdToRemoveFromWaitlist)
        );
        setCurrentWaitlistPlayers((prevState) => prevState.filter((player) => player.id !== playerIdToRemoveFromWaitlist));

        if (foundPlayer) {
            setCurrentPlayers((prevState) => [...prevState, foundPlayer as PlayerFormat]);
        }
    };

    const handleSaveTable = () => {
        setTemporaryGameTable({
            ...table,
            description: currentDescription,
            dungeonMaster: currentDungeonMaster.id,
            players: currentPlayers.map((player) => player.id),
            shortDescription: currentShortDescription,
            title: currentTitle,
            waitlist: currentWaitlist,
        });
    };

    useEffect(() => {
        console.log('temporaryTable now equals: ', temporaryGameTable);
    }, [temporaryGameTable]);

    return (
        <>
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
                                />)
                            }
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
                        <Grid container>{renderTags(table?.tags, allTags)}</Grid>

                        <TableActionsBar
                            enableEdits={setIsTableInEditMode}
                            isInEditMode={isTableInEditMode}
                            numPlayers={currentPlayers.length || 0}
                            onDeleteTable={onDeleteTable}
                            onJoinWaitlist={onJoinWaitlist}
                            onLeaveTable={onLeaveTable}
                            removePlayerFromWaitlist={handleRemovePlayerFromWaitlist}
                            saveTableCallback={handleSaveTable}
                            slots={table?.capacity || 0}
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
                                        </Typography>)}
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
        </>
    );
}

const renderTags = function (
    tags: number[] | undefined,
    allTags: TagsFormat[] | undefined
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

export default TablePageLayout;
