import EventBanner from "@/components/EventPage/EventBanner";
import Grid from "@mui/material/Grid";
import EventBasicInfo from "@/components/EventPage/EventBasicInfo";
import EventTablesCard from "@/components/EventPage/EventTablesCard";
import type { EventDB } from "@/types/event";
import type { SearchResultItem } from "@/types/search";
import type { TagsFormat } from "@/types/tag";

export type EventPageProps = {
    event: EventDB;
    attendees: number;
    numGames: number;
    tables: any[];
    players: any[];
    allTags: TagsFormat[];
};

export default function EventPageLayout({event, attendees, numGames, tables, players, allTags}: EventPageProps) {
    return (
        <Grid container flexDirection="column">
            <Grid>
                <EventBanner bannerUrl={event.bannerUrl} links={event.links} title={event.title} eventTag={event.eventTag} attendees={attendees} numGames={numGames} />
            </Grid>
            <Grid container flexDirection="row" spacing={3} size={{xs:12, md:12}}>
                <Grid size={{xs:12, md:4}} spacing={3} padding={3}>
                    <EventBasicInfo description={event.description} locationId={event.location || "0"} startingDate={event.startingDate} timeInfo={event.date} endingDate={event.endingDate}/>
                </Grid>
                <Grid size={{xs:12, md:8}} spacing={3} padding={3}>
                    <EventTablesCard tables={tables} tags={allTags}/>
                </Grid>
            </Grid>
            <Grid />
        </Grid>
    )
}
