"use client"
import React, { createContext, useContext, ReactNode } from "react";
import {EventEditContextValue } from "@/types/event";

/**
 * Default Values for stability
 */
const defaultValue: EventEditContextValue = {
    isOwner: false,
    updateEvent: () => {},
    updateImages: () => {},
}

/**
 * Default call (safe fallback)
 * Components using this without a provider will behave as non-owner.
 */
const EventEditContext = createContext<EventEditContextValue>(defaultValue);

/**
 * Provider props
 */
type EventEditProviderProps = {
    value?: Partial<EventEditContextValue>;
    children: ReactNode;
};

/**
 * Provider component
 */
export function EventEditProvider({
                                      value,
                                      children,
                                  }: EventEditProviderProps) {

    /**
     * automatically fill in default values if data is missing or incomplete
     */
    const mergedValue: EventEditContextValue = {
        ...defaultValue,
        ...value,
    }

    return (
        <EventEditContext.Provider value={mergedValue}>
            {children}
            </EventEditContext.Provider>
    );
}

/**
 * Hook for consuming context
 */
export function useEventEdit(): EventEditContextValue {
    const context = useContext(EventEditContext);

    // Optional guard (useful during development)
    if (!context) {
        throw new Error("useEventEdit must be used within an EventEditProvider");
    }

    return context;
}