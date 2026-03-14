import EventPageLayout from "@/components/EventPage/EventPageLayout";
import { MockedEventObjects } from "@/mocks/EventDB";
import {
    MockedSearchResultsTablesOnly,
    MockedSearchResultsPlayersOnly,
} from "@/mocks/SearchResults";
import { MockedTags } from "@/mocks/Tags";

const EventPage = async () => {
    return (
        <EventPageLayout
            event={MockedEventObjects[0]}
            attendees={MockedSearchResultsPlayersOnly.length}
            numGames={MockedSearchResultsTablesOnly.length}
            tables={MockedSearchResultsTablesOnly}
            allTags={MockedTags}
            players={MockedSearchResultsPlayersOnly}
        />
    );
};

export default EventPage;
