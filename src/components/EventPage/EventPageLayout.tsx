"use client"
import React from "react";
import EventBanner from "@/components/EventPage/EventBanner";
import Grid from "@mui/material/Grid";
import EventBasicInfo from "@/components/EventPage/EventBasicInfo";
import EventTablesCard from "@/components/EventPage/EventTablesCard";
import type { EventDB, EventEditContextValue } from "@/types/event";
import type { Tag } from "@/types/tag";
import { EventEditProvider } from "@/components/EventPage/editMode/EventEditContext";

export type EventPageProps = {
    mergedEvent: EventDB;
    isOwner: boolean;
    updateEvent?: (patch: Partial<EventDB>) => void;
    updateImages?: () => void;
    attendees: number;
    numGames: number;
    tables: any[];
    players: any[];
    allTags: Tag[];
};

export default function EventPageLayout({
                                            mergedEvent,
                                            isOwner,
                                            updateEvent,
                                            updateImages,
                                            attendees,
                                            numGames,
                                            tables,
                                            allTags,
                                        }: EventPageProps) {
    return (
        <Grid container flexDirection="column">
            {/* 3. Context wiring */}
            <EventEditProvider value={{ isOwner, updateEvent, updateImages }}>
                <Grid>
                    <EventBanner
                        bannerUrl={mergedEvent.bannerUrl}
                        bannerColor={mergedEvent.bannerColor}
                        links={mergedEvent.links}
                        title={mergedEvent.title}
                        eventTag={mergedEvent.eventTag}
                        attendees={attendees}
                        numGames={numGames}
                    />
                </Grid>
                <Grid container flexDirection="row" spacing={3} size={{ xs: 12, md: 12 }}>
                    <Grid size={{ xs: 12, md: 4 }} spacing={3} padding={3}>
                        <EventBasicInfo
                            description={mergedEvent.description}
                            locationId={mergedEvent.location || "0"}
                            startingDate={mergedEvent.startingDate}
                            timeInfo={mergedEvent.date}
                            endingDate={mergedEvent.endingDate}
                            timezone={mergedEvent.timezone}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }} spacing={3} padding={3}>
                        <EventTablesCard tables={tables} tags={allTags} />
                    </Grid>
                </Grid>
                <Grid />
            </EventEditProvider>
        </Grid>
    );
}
