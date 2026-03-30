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

const EventPage = () => {
    const event = MockedEventObjects[0];
    const [eventPatch, setEventPatch] = useState<Partial<EventDB>>({});

    // Merging logic happens at the page level
    const mergedEvent = { ...event, ...eventPatch };

    const updateEvent = (patch: Partial<EventDB>) => {
        setEventPatch((prev) => ({ ...prev, ...patch }));
    };

    return (
        <EventPageLayout
            mergedEvent={mergedEvent}
            editContext={{ isOwner: true, updateEvent }}
            attendees={MockedSearchResultsPlayersOnly.length}
            numGames={MockedSearchResultsTablesOnly.length}
            tables={MockedSearchResultsTablesOnly}
            allTags={MockedTags}
            players={MockedSearchResultsPlayersOnly}
        />
    );
};

export default EventPage;
