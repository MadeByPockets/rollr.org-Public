import { create } from 'zustand';
import {Tables, TableFormat} from "@/mocks/Tables";
import {Players, PlayerFormat} from "@/mocks/Players";

interface GlobalState {
    players: PlayerFormat[];
    tables: TableFormat[];

    // player actions
    addPlayer: (player: PlayerFormat) => void;
    updatePlayer: (player: PlayerFormat) => void;
    deletePlayer: (playerId: number) => void;

    // game table actions
    addTable: (table: TableFormat) => void;
    updateTable: (table: TableFormat) => void;
    deleteTable: (tableId: number) => void;
    removePlayerFromTable: (tableId: number, playerId: number) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
    players: Players,
    tables: Tables,

    // player methods
    addPlayer: (player: PlayerFormat) => set((state) => ({
        players: [...state.players, player],
    })),
    deletePlayer: (playerId: number) =>
        set((state) => ({
            players: state.players.filter((p) => p.id !== playerId),
        })),
    updatePlayer: (updatedPlayer: PlayerFormat) => set((state) => ({
        players: state.players.map((p) => p.id === updatedPlayer.id ? updatedPlayer : p)
    })),

    // table methods
    addTable: (table: TableFormat) =>
        set((state) => ({
            tables: [...state.tables, table],
        })),
    deleteTable: (tableId: number) =>
        set((state) => ({
            tables: state.tables.filter((t) => t.id !== tableId),
        })),
    removePlayerFromTable: (tableId: number, playerId: number) =>
        set((state) => ({
            tables: state.tables.map((t) =>
                t.id === tableId ? { ...t, playerIds: t.players.filter((id) => id !== playerId)} : t
            ),
        })),
    updateTable: (updatedTable: TableFormat) =>
        set((state) => ({
            tables: state.tables.map((t) =>
                t.id === updatedTable.id ? updatedTable : t
            ),
        })),
}));