"use client"
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

/**
 * DEPRECATED: GameTableProvider is a no-op passthrough.
 * TablePageLayout and its children are now fully prop-driven.
 */
export function GameTableProvider(props: IGameTableProviderProps) {
    return <>{props.children}</>;
}

/**
 * DEPRECATED: useGameTableContext is a compatibility stub and should not be used.
 * Returns a benign default to avoid runtime errors.
 */
export function useGameTableContext(): IGameTableContextType {
    return {
        table: MockedTables[0],
        setTable: (() => { /* no-op */ }) as React.Dispatch<React.SetStateAction<TableFormat | null>>,
    };
}