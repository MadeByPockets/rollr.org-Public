import EventPageLayout from "@/components/EventPage/EventPageLayout";
import {eventObjects} from "@/mocks/EventDB";
import {Players} from "@/mocks/Players"
import {SearchResultsTablesOnly} from "@/mocks/SearchResults"
import {SearchResultsPlayersOnly} from "@/mocks/SearchResults"
import {Tags} from "@/mocks/Tags"

const EventPage = async () => {

    return (
        <EventPageLayout
            event={eventObjects[0]}
            attendees={SearchResultsPlayersOnly.length}
            numGames={SearchResultsTablesOnly.length}
            tables={SearchResultsTablesOnly}
            allTags={Tags}
            players={SearchResultsPlayersOnly}
        />
    )
}

export default EventPage;