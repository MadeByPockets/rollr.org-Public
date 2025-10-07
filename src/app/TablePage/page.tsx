"use client"
import TablePageLayout from "@/components/TablePage/TablePageLayout";
import {MockedTables} from "@/mocks/Tables"
import {PlayerFormat, MockedPlayers} from "@/mocks/Players"
import {MockedTags} from "@/mocks/Tags";
import {TableStatus} from "@/components/TablePage/types";
import {GameTableProvider} from "@/app/TablePage/GameTableProvider/GameTableContext";
import ModalProvider from "./ModalProvider/ModalProvider";

const TablePage = () => {
    const tableStatus = getTableStatus();

    return (
        <GameTableProvider>
            <ModalProvider>\
                <TablePageLayout
                    allTags={MockedTags}
                    dungeonMaster={getDM(MockedPlayers[0].id)}
                    players={getPlayers(MockedTables[0].players)}
                    tableStatus={tableStatus}
                />
            </ModalProvider>
        </GameTableProvider>
    )
}

function getTableStatus(): TableStatus {
    const isOwner = MockedTables[0].owner === MockedPlayers[0].id;
    const isPlayer = MockedTables[0].players.includes(MockedPlayers[0].id)
    const isDM = MockedTables[0].dungeonMaster === MockedPlayers[0].id;
    const onWaitlist = false

    return {
        isOwner,
        isDM,
        isPlayer,
        onWaitlist,
    }
}

const getPlayers = function (players: number[]): PlayerFormat[] {
    return players.map((id) => {
        return MockedPlayers.find((player) => player.id === id) || null;
    }).filter((player) => player !== null) as PlayerFormat[];
}


const getDM = function (id: number) {
    const result = MockedPlayers.find(
        (player) => {
            return player.id === id;
        }
    )

    return result ? result : MockedPlayers[0]
}

export default TablePage