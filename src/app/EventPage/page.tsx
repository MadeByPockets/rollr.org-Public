import EventPageLayout from "@/components/EventPage/EventPageLayout";
import {eventObjects} from "@/mocks/EventDB";
import {Players} from "@/mocks/Players"

const EventPage = async () => {

    return (
        <EventPageLayout event={eventObjects[0]} attendees={Players.length} numGames={15}/>
    )
}

export default EventPage;