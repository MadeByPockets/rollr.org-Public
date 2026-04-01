"use client"
import React, { useState } from "react";
import EventPageLayout from "@/components/EventPage/EventPageLayout";
import { MockedEventObjects } from "@/mocks/EventDB";
import { EventDB } from "@/types/event";
import {
    MockedSearchResultsTablesOnly,
    MockedSearchResultsPlayersOnly,
} from "@/mocks/SearchResults";
import { MockedTags } from "@/mocks/Tags";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box
} from "@mui/material";

const EventPage = () => {
    const event = MockedEventObjects[0];
    const [eventPatch, setEventPatch] = useState<Partial<EventDB>>({});
    const [pendingPatch, setPendingPatch] = useState<Partial<EventDB> | null>(null);

    // Merging logic happens at the page level
    const mergedEvent = { ...event, ...eventPatch };

    const updateEvent = (patch: Partial<EventDB>) => {
        setPendingPatch(patch);
    };

    const confirmUpdate = () => {
        if (pendingPatch) {
            setEventPatch((prev) => ({ ...prev, ...pendingPatch }));
            setPendingPatch(null);
        }
    };

    const cancelUpdate = () => {
        setPendingPatch(null);
    };

    const renderRawPatch = () => {
        if (!pendingPatch) return null;
        return (
            <Box
                component="pre"
                sx={{
                    bgcolor: 'grey.100',
                    p: 2,
                    borderRadius: 1,
                    overflowX: 'auto',
                    fontSize: '0.85rem',
                    fontFamily: 'monospace',
                    maxHeight: '400px'
                }}
            >
                {JSON.stringify(pendingPatch, null, 2)}
            </Box>
        );
    };

    return (
        <>
            <EventPageLayout
                mergedEvent={mergedEvent}
                isOwner={true}
                updateEvent={updateEvent}
                updateImages={() => console.log("Update Images requested")}
                attendees={MockedSearchResultsPlayersOnly.length}
                numGames={MockedSearchResultsTablesOnly.length}
                tables={MockedSearchResultsTablesOnly}
                allTags={MockedTags}
                players={MockedSearchResultsPlayersOnly}
            />

            <Dialog open={pendingPatch !== null} onClose={cancelUpdate} maxWidth="md" fullWidth>
                <DialogTitle>Confirm Staged Changes (Raw Patch)</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 1 }}>
                        {renderRawPatch()}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelUpdate}>Cancel</Button>
                    <Button onClick={confirmUpdate} variant="contained" color="primary">
                        Confirm & Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EventPage;
