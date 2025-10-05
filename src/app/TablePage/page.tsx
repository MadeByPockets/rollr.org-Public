"use client"
import TablePageLayout from "@/components/TablePage/TablePageLayout";
import {Tables} from "@/mocks/Tables"
import {PlayerFormat, Players} from "@/mocks/Players"
import {Tags} from "@/mocks/Tags";
import {TableStatus} from "@/components/TablePage/types";
import {GameTableProvider} from "@/app/TablePage/GameTableProvider/GameTableContext";
import ModalProvider from "./ModalProvider/ModalProvider";

const TablePage = () => {
    const tableStatus = getTableStatus();

    return (
        <GameTableProvider>
            <ModalProvider>\
                <TablePageLayout
                    allTags={Tags}
                    dungeonMaster={getDM(Players[0].id)}
                    players={getPlayers(Tables[0].players)}
                    tableStatus={tableStatus}
                />
            </ModalProvider>
        </GameTableProvider>
    )
}

function getTableStatus(): TableStatus {
    const isOwner = Tables[0].owner === Players[0].id;
    const isPlayer = Tables[0].players.includes(Players[0].id)
    const isDM = Tables[0].dungeonMaster === Players[0].id;
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
        return Players.find((player) => player.id === id) || null;
    }).filter((player) => player !== null) as PlayerFormat[];
}


const getDM = function (id: number) {
    const result = Players.find(
        (player) => {
            return player.id === id;
        }
    )

    return result ? result : Players[0]
}

export default TablePage