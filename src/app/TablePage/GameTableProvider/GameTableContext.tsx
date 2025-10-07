import React, { useContext, useEffect, useState } from "react";
import {TableFormat, MockedTables} from "@/mocks/Tables"

interface IGameTableContextType {
    table: TableFormat;
    setTable: React.Dispatch<React.SetStateAction<TableFormat | null>>;
}

interface IGameTableProviderProps {
    children: React.ReactNode;
}


const GameTableContext = React.createContext<IGameTableContextType | undefined>(undefined);

export function GameTableProvider(props: IGameTableProviderProps) {
    const [table, setTable] = useState<TableFormat | null>(null);

    useEffect(() => {
        setTable(MockedTables[0]);
    }, []);

    if (!table) {
        return <>Loading table data...</>
    }

    return (
        <GameTableContext.Provider value={{ table, setTable }}>
            { props.children }
        </GameTableContext.Provider>
    );
}

export function useGameTableContext() {
    const context = useContext(GameTableContext);

    if (!context) {
        throw new Error('useGameTableContext must be used with a GameTableProvider');
    }

    return context;
}