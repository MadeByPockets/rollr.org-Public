
import {EventDB} from "@/mocks/EventDB";
import EventBanner from "@/components/EventPage/EventBanner";
import Grid from "@mui/material/Grid";
import EventBasicInfo from "@/components/EventPage/EventBasicInfo";

export type EventPageProps = {
    event: EventDB
    attendees:number
    numGames:number
};

export default async function EventPageLayout({event, attendees, numGames}: EventPageProps) {
    return (
        <Grid container flexDirection="column">
            <Grid>
                <EventBanner bannerUrl={event.bannerUrl} links={event.links} title={event.title} eventTag={event.eventTag} attendees={attendees} numGames={numGames} />
            </Grid>
            <Grid container flexDirection="row" >
                <EventBasicInfo description={event.description} locationId={event.location || "0"} startingDate={event.startingDate} timeInfo={event.date} endingDate={event.endingDate}/>
            </Grid>
        </Grid>
    )
}