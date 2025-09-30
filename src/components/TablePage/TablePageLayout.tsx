"use client"
import {Card, CardContent, CardHeader, Typography, Box} from "@mui/material";
import { TableFormat } from "@/mocks/Tables";
import { TagsFormat } from "@/mocks/Tags";
import { generateTagsDisplay } from "@/components/shared/TagComponents";
import { JSX } from "react";
import Grid from "@mui/material/Grid";
import {PlayerFormat} from "@/mocks/Players";
import {DMHighlightsCard, PlayerHighlightsCard} from "@/components/TablePage/players/PlayerHighlightsCard";
import TableActionsBar from "@/components/TablePage/TableActionsBar";
import {TableStatus} from "@/components/TablePage/types";

export type TablePageProps = {
    table: TableFormat;
    allTags: TagsFormat[];
    players: PlayerFormat[];
    dungeonMaster: PlayerFormat;
    tableStatus: TableStatus,
    waitList: PlayerFormat[];
};

export default function TablePageLayout({ table, allTags, players, dungeonMaster, tableStatus}: TablePageProps) {
    return (
        <>
            {/* ----- Main Card --------- */}
            <Card
                sx={{
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
                            <CardHeader
                                title={table.title}
                                sx={{
                                    p: 0,
                                    "& .MuiCardHeader-title": {
                                        color: "white",
                                        fontWeight: 700,
                                    },
                                }}
                            />

                        </Box>

                        {/* ----------- Short Description -------- */}
                        <Typography sx={{ color: "white", opacity: 0.95 }}>
                            {table.shortDescription}
                        </Typography>

                        {/* ---------------- Tags -------------- */}
                        <Grid container>{renderTags(table.tags, allTags)}</Grid>

                        <TableActionsBar numPlayers={table.capacity || 0} tableStatus={tableStatus} slots={table.capacity || 0} waitlist={0}/>
                    </Grid>

                    {/* ------------ Main Body: Two Lanes ------------------- */}
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {/* Left Lane (larger) */}
                        <Grid size={{xs: 12, md:8}}>
                            <Card sx={{ height: "100%" }}>
                                <CardContent>
                                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                                        {table.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Right Lane (smaller) */}
                        <Grid size={{xs: 12, md:4}}>

                            <DMHighlightsCard player={dungeonMaster} allTags={allTags} />

                            {/* Player Cards */}
                            <Card sx={{ height: "100%" }}>
                                <CardHeader slotProps={{title: {variant: "h4"}}} title="Players: "/>
                                <CardContent>

                                    {/* Replace this block with your actual player info content */}
                                    {
                                        players.map(
                                            (player) => {
                                                return (
                                                    <PlayerHighlightsCard key= {player.id} player={player} allTags={allTags}/>
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
