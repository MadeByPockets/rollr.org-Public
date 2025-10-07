"use client"
import {JSX, useEffect, useRef, useState} from "react";
import {Card, CardContent, CardHeader, Typography, Box} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useGameTableContext} from "@/app/TablePage/GameTableProvider/GameTableContext";
import { generateTagsDisplay } from "@/components/shared/TagComponents";
import {DMHighlightsCard, PlayerHighlightsCard} from "@/components/TablePage/players/PlayerHighlightsCard";
import TableActionsBar from "@/components/TablePage/TableActionsBar";
import {TableStatus} from "@/components/TablePage/types";
import { TableFormat } from "@/mocks/Tables";
import { TagsFormat } from "@/mocks/Tags";
import {MockedPlayers, PlayerFormat} from "@/mocks/Players";
import AutoResizingTextarea from "@/components/shared/AutoResizingTextarea";

export type TablePageProps = {
    // table: TableFormat;
    allTags: TagsFormat[];
    players: PlayerFormat[];
    dungeonMaster: PlayerFormat;
    tableStatus: TableStatus,
    // waitList: PlayerFormat[];
};

export default function TablePageLayout(props: TablePageProps) {
    const { allTags, dungeonMaster, players, tableStatus } = props;
    const { table, setTable } = useGameTableContext();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [isTableInEditMode, setIsTableInEditMode] = useState(false);

    const [temporaryGameTable, setTemporaryGameTable] = useState<TableFormat | null>(null);

    // TODO: need to centralize the source of truth. Probably should not be using data from the context table
    //  and data from the props passed in that are parsed from the table.
    const [currentDescription, setCurrentDescription] = useState(table.description);
    const [currentDungeonMaster, setCurrentDungeonMaster] = useState(dungeonMaster);
    const [currentPlayers, setCurrentPlayers] = useState(players);
    const [currentShortDescription, setCurrentShortDescription] = useState(table.shortDescription);
    const [currentTitle, setCurrentTitle] = useState(table.title);
    const [currentWaitlist, setCurrentWaitlist] = useState(table.waitlist);

    const handleAssignToDungeonMaster = (newDungeonMaster: PlayerFormat) => {
        setCurrentDungeonMaster(newDungeonMaster);
    }

    const handleRemovePlayerFromTable = (playerToRemove: PlayerFormat): void => {
        if (currentPlayers.includes(playerToRemove)) {
            setCurrentPlayers((prevState) => prevState.filter(player => playerToRemove !== player));
        }
    }

    const handleRemovePlayerFromWaitlist = (playerIdToRemoveFromWaitlist: number) => {
        console.log("handleRemovePlayerFromWaitlist called with ", playerIdToRemoveFromWaitlist);
        const foundPlayer = MockedPlayers.find(player => player.id === playerIdToRemoveFromWaitlist);

        if (!foundPlayer) {
            console.warn("Player not found in players list");
            return;
        }

        setCurrentWaitlist((prevState) =>
            prevState.filter(playerId =>
                playerId !== playerIdToRemoveFromWaitlist
            )
        );
        setCurrentPlayers((prevState => {

            console.log("found player = ", foundPlayer);
            console.log("currentWaitlist = ", currentWaitlist);

            return foundPlayer ? [...prevState, foundPlayer] : prevState;
        }));
    }

    const handleSaveTable = () => {
        setTemporaryGameTable({
            ...table,
            description: currentDescription,
            dungeonMaster: currentDungeonMaster.id,
            players: currentPlayers.map((player) => player.id),
            shortDescription: currentShortDescription,
            title: currentTitle
        })
    }

    useEffect(() => {
        // NOTE: this hook is just for validation purposes presently.
        // Maybe this is where the call to the backend API to update the table originates?
        console.log('temporaryTable now equals: ',temporaryGameTable);
    }, [temporaryGameTable]);

    return (
        <>
            {/* ----- Main Card --------- */}
            <Card
                sx={{
                    backgroundColor: isTableInEditMode ? "lightsalmon" : "white",
                    borderRadius: "5%",
                    p: 2,
                    boxShadow: "0px 8px 15px rgba(25, 118, 210, 0.3)",
                }}
            >
                {/* --------------- START CONTENT ----------------- */}
                <Grid container direction="column">
                    {/* ---------------- HEADER ---------------- */}
                    <Grid
                        container
                        direction="column"
                        spacing={1}
                        sx={{
                            px: 2,
                            py: 1.5,
                            borderRadius: 2,
                            background:
                                "linear-gradient(135deg, rgba(25,118,210,0.8), rgba(25,118,210,1))",
                            textShadow:'4px 4px 6px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        {/* ----------- title ------------ */}
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

                        {/* ----------- Short Description -------- */}
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
                        {/* ---------------- Tags -------------- */}
                        <Grid container>{renderTags(table?.tags, allTags)}</Grid>

                        <TableActionsBar
                            enableEdits={setIsTableInEditMode}
                            isInEditMode={isTableInEditMode}
                            numPlayers={currentPlayers.length || 0}
                            removePlayerFromWaitlist={handleRemovePlayerFromWaitlist}
                            saveTableCallback={handleSaveTable}
                            slots={table?.capacity || 0}
                            tableStatus={tableStatus}
                            waitlist={currentWaitlist}
                        />
                    </Grid>

                    {/* ------------ Main Body: Two Lanes ------------------- */}
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {/* Left Lane (larger) */}
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

                        {/* Right Lane (smaller) */}
                        <Grid size={{xs: 12, md:4}}>

                            <DMHighlightsCard canEdit={isTableInEditMode} player={currentDungeonMaster} allTags={allTags} />

                            {/* Player Cards */}
                            <Card sx={{ height: "100%" }}>
                                <CardHeader slotProps={{title: {variant: "h4"}}} title="Players: "/>
                                <CardContent>

                                    {/* Replace this block with your actual player info content */}
                                    {
                                        currentPlayers.map(
                                            (player) => {
                                                return (
                                                    <PlayerHighlightsCard
                                                        allTags={allTags}
                                                        canChangeDungeonMaster={tableStatus.isOwner || tableStatus.isDM}
                                                        canEdit={isTableInEditMode}
                                                        handleAssignToDungeonMaster={handleAssignToDungeonMaster}
                                                        key={player.id}
                                                        player={player}
                                                        removeFromTable={handleRemovePlayerFromTable}
                                                    />
                                                    )
                                            }
                                        )
                                    }
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
