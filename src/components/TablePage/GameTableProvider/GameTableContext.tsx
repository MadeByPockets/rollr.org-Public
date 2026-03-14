"use client"
import React from "react";
import type { TableFormat } from "@/types/table";

interface IGameTableContextType {
    table: TableFormat;
    setTable: React.Dispatch<React.SetStateAction<TableFormat | null>>;
}

interface IGameTableProviderProps {
    children: React.ReactNode;
}

const GameTableContext = React.createContext<IGameTableContextType | undefined>(undefined);

export function GameTableProvider(props: IGameTableProviderProps) {
    return <>{props.children}</>;
}

export function useGameTableContext(): IGameTableContextType {
    const context = React.useContext(GameTableContext);

    if (context) {
        return context;
    }

    throw new Error('useGameTableContext is deprecated in the package build. Pass table data through props instead.');
}
