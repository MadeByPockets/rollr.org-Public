"use client";

import React, {JSX, useEffect, useMemo, useRef, useState} from "react";
import {Box, Button, Card, CardContent, CardHeader, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import AutoResizingTextarea from "@/components/shared/AutoResizingTextarea";
import {generateTagsDisplay, TagEditor} from "@/components/shared";
import {DMHighlightsCard, PlayerHighlightsCard} from "@/components/TablePage/players/PlayerHighlightsCard";
import TableActionsBar from "@/components/TablePage/TableActionsBar";
import type {Player} from "@/types/player";
import type {TableRecord} from "@/types/tables";
import type {Tag} from "@/types/tag";
import type {TablePageLayoutProps} from "@/components/TablePage/types";
import {useModal} from "@/components";
import EditIcon from '@mui/icons-material/Edit';
import {EditTableDetailsForm} from "@/components/TablePage/EditComponents/EditTableDetailsForm";
import Chip from "../shared/Chip";

export function TablePageLayout(props: TablePageLayoutProps) {
    const { hideModal, showModal } = useModal();

    const { allTags, dungeonMaster, onDeleteTable, onJoinWaitlist, onLeaveTable, onSaveDraft, players, table, tableStatus, waitlistPlayers, startWithEditTitle } = props;
    const canEdit = tableStatus.isOwner;
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [isTableInEditMode, setIsTableInEditMode] = useState(false);

    const [currentTitle, setCurrentTitle] = useState(table.title);
    const [currentSubtitle, setCurrentSubtitle] = useState(table.shortDescription);
    const [currentDescription, setCurrentDescription] = useState(table.description);

    const [currentDungeonMaster, setCurrentDungeonMaster] = useState(dungeonMaster);
    const [currentPlayers, setCurrentPlayers] = useState(players);
    const [currentWaitlistPlayers, setCurrentWaitlistPlayers] = useState(waitlistPlayers);
    const [currentTagIds, setCurrentTagIds] = useState<number[]>(table.tags ?? []);

    const pendingEdits = useRef({ title: currentTitle, subtitle: currentSubtitle, tags: currentTagIds });

    const handleSaveTable = (tableData: Partial<TableRecord> = {}) => {
        const nextDraft: TableRecord = {
            ...table,
            description: currentDescription,
            dungeonMaster: String(currentDungeonMaster.id),
            players: currentPlayers.map((player) => player.id),
            shortDescription: currentSubtitle,
            tags: currentTagIds,
            title: currentTitle,
            waitlist: currentWaitlistPlayers.map((player) => player.id),
            ...tableData,
        };

        void onSaveDraft?.(nextDraft);
        setIsTableInEditMode(false);
    };

    /*
     * This is a simple profanity filter that replaces any instance of common slurs with the word "dudes". It's not meant to be comprehensive,
     *  just to catch some of the more common and egregious cases. The regex is case-insensitive and looks for whole words only.
     */
    const clean = (text: string) => text.replaceAll(
        /\b(n[i1!]g+(er|a|e)s?|f[a@]g|f[a@]g+[o0]ts?|k[i1!]k[e3]s?|ch[i1!]nks?|w[e3]tb[a@]cks?|r[a@]gh[e3][a@]ds?|t[o0]w[e3]lh[e3][a@]ds?|r[e3]t[a@]rd(ed|s)?|c[o0][o0]ns?|tr[a@]nn(y|i[e3]s?)|g[o0][o0]ks?)\b/gi,
        "dudes");

    const editTableDetails = () => {
        if (!canEdit) { return }
        pendingEdits.current = { title: currentTitle, subtitle: currentSubtitle, tags: currentTagIds
    };

        const editContent = (
            <EditTableDetailsForm
                initialTitle={currentTitle}
                initialSubtitle={currentSubtitle}
                onTitleChange={t => pendingEdits.current.title = t}
                onSubtitleChange={s => pendingEdits.current.subtitle = s}
                onTagChange={t => pendingEdits.current.tags = t}
                initialTagIDs={currentTagIds}
                allTags={allTags.filter(t => t.appliesTo.tables)}
                allowEditingTitles={true}
            />
        );

        showModal(editContent, "Edit Table Details", {
            acceptText: "Save",
            onAccept: () => {
                setCurrentTitle(clean(pendingEdits.current.title));
                setCurrentSubtitle(clean(pendingEdits.current.subtitle));
                setCurrentTagIds(pendingEdits.current.tags);
                handleSaveTable({
                    title: clean(pendingEdits.current.title),
                    shortDescription: clean(pendingEdits.current.subtitle),
                    tags: pendingEdits.current.tags,
                });
            }
        });
    }

    useEffect(() => {
        if(startWithEditTitle) {
            editTableDetails();
        }
    });

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

    return (
        <Card
            sx={{
                backgroundColor: isTableInEditMode ? "lightsalmon" : "white",
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
                        <Box
                            className={`flex items-center gap-1 ${canEdit ? "cursor-pointer" : ""}`}
                            sx={{"&:hover .edit-icon": { opacity: 1 } }}
                            onClick={editTableDetails}
                        >
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
                            {canEdit ? (<EditIcon className="edit-icon text-white" sx={{ opacity: 0, transition: "opacity 0.2s" }} />) : ""}
                        </Box>
                    </Box>
                    <Box
                        className={`flex items-center gap-1 ${canEdit ? "cursor-pointer" : ""}`}
                        sx={{"&:hover .edit-icon": { opacity: 1 } }}
                        onClick={editTableDetails}
                    >
                        <Typography
                            sx={{ color: "white", opacity: 0.95 }}
                        >
                            {currentSubtitle}
                        </Typography>
                        {canEdit ? (<EditIcon className="edit-icon text-white" sx={{ opacity: 0, transition: "opacity 0.2s", fontSize: "medium" }} />) : ""}
                    </Box>

                    <Grid container onClick={editTableDetails} className={`${canEdit ? "cursor-pointer" : ""}`}>
                        {renderTags(currentTagIds, allTags, canEdit)}
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
    allTags: Tag[] | undefined,
    canEdit: boolean
): JSX.Element {
    if (!tags || !allTags) {
        return <></>;
    }
    return (
        <Grid container spacing={1} sx={{ pb: 1.5 }}>
            {tags.map((tagId) => {
                const tag = allTags.find((potentialTag) => tagId === potentialTag.id);
                return tag ? <Chip tag={tag} key={tag.id}  /> : <></>;
            })}
            {(canEdit ? <Button variant={"text"}
                    className="inline-block text-sm px-3 py-1font-outlined m-0.5 font-stretch-105% font-sans"
                    sx={{
                        color: "white",
                        textShadow: "black 1.5px 1px 1.5px",
                        '&:hover': {
                            background: '#889'
                        }
                    }}>Edit Tags...</Button>
                : "")}
        </Grid>
    );
};

export default TablePageLayout;

