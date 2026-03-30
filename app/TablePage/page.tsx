"use client";

import { useMemo, useState } from "react";
import TablePageLayout from "@/components/TablePage/TablePageLayout";
import ModalProvider from "@/components/TablePage/ModalProvider/ModalProvider";
import type { TableStatus } from "@/components/TablePage/types";
import { MockedPlayers } from "@/mocks/Players";
import { MockedTables } from "@/mocks/Tables";
import { MockedTags } from "@/mocks/Tags";
import type { Player, TableRecord } from "@/types";

const currentUser = MockedPlayers[0];

const TablePage = () => {
    const [table, setTable] = useState<TableRecord>(MockedTables[0]);

    const playersById = useMemo(() => {
        return new Map(MockedPlayers.map((player) => [player.id, player]));
    }, []);

    const tablePlayers = useMemo(() => getPlayersFromIds(table.players, playersById), [playersById, table.players]);
    const waitlistPlayers = useMemo(() => getPlayersFromIds(table.waitlist ?? [], playersById), [playersById, table.waitlist]);
    const dungeonMaster = playersById.get(Number(table.dungeonMaster)) ?? MockedPlayers[0];
    const tableStatus = getTableStatus(table, currentUser.id);

    const handleSaveDraft = (nextTable: TableRecord) => {
        setTable(nextTable);
        console.log("table draft saved", nextTable);
    };

    const handleJoinWaitlist = () => {
        setTable((prevState) => {
            if (prevState.waitlist.includes(currentUser.id) || prevState.players.includes(currentUser.id)) {
                return prevState;
            }
            return {
                ...prevState,
                waitlist: [...prevState.waitlist, currentUser.id],
            };
        });
    };

    const handleLeaveTable = () => {
        setTable((prevState) => ({
            ...prevState,
            players: prevState.players.filter((playerId) => playerId !== currentUser.id),
            waitlist: prevState.waitlist.filter((playerId) => playerId !== currentUser.id),
        }));
    };

    const handleDeleteTable = () => {
        console.log("delete table requested", table.id);
        alert(`Pretend delete for table ${table.id}`);
    };

    return (
        <ModalProvider>
            <TablePageLayout
                table={table}
                allTags={MockedTags}
                dungeonMaster={dungeonMaster}
                onDeleteTable={handleDeleteTable}
                onJoinWaitlist={handleJoinWaitlist}
                onLeaveTable={handleLeaveTable}
                onSaveDraft={handleSaveDraft}
                players={tablePlayers}
                tableStatus={tableStatus}
                waitlistPlayers={waitlistPlayers}
            />
        </ModalProvider>
    );
};

function getTableStatus(table: TableRecord, viewerId: number): TableStatus {
    const isOwner = true; // Hardcoded for POC since we've removed the owner backend property
    const isPlayer = table.players.includes(viewerId);
    const isDM = Number(table.dungeonMaster) === viewerId;
    const onWaitlist = table.waitlist.includes(viewerId);

    return {
        isOwner,
        isDM,
        isPlayer,
        onWaitlist,
    };
}

function getPlayersFromIds(playerIds: number[], playersById: Map<number, Player>): Player[] {
    return playerIds
        .map((id) => playersById.get(id) || null)
        .filter((player): player is Player => player !== null);
}

export default TablePage;
