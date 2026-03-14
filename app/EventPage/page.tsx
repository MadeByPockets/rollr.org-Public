import EventPageLayout from "@/components/EventPage/EventPageLayout";
import {MockedEventObjects} from "@/mocks/EventDB";
import {SearchResultsTablesOnly} from "@/mocks/SearchResults"
import {SearchResultsPlayersOnly} from "@/mocks/SearchResults"
import {MockedTags} from "@/mocks/Tags"

const EventPage = async () => {

    return (
        <EventPageLayout
            event={MockedEventObjects[0]}
            attendees={SearchResultsPlayersOnly.length}
            numGames={SearchResultsTablesOnly.length}
            tables={SearchResultsTablesOnly}
            allTags={MockedTags}
            players={SearchResultsPlayersOnly}
        />
    )
}

export default EventPage;