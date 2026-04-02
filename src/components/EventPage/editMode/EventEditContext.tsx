"use client"
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { EventEditContextValue, EventDB } from "@/types/event";

type ExtendedEventEditContextValue = EventEditContextValue & {
    event: EventDB | null;
};

/**
 * Default Values for stability
 */
const defaultValue: ExtendedEventEditContextValue = {
    isOwner: false,
    updateEvent: async () => false,
    updateImages: () => {},
    event: null,
}

/**
 * Default call (safe fallback)
 * Components using this without a provider will behave as non-owner.
 */
const EventEditContext = createContext<ExtendedEventEditContextValue>(defaultValue);

/**
 * Provider props
 */
type EventEditProviderProps = {
    value?: Partial<EventEditContextValue>;
    initialEvent: EventDB;
    children: ReactNode;
};

/**
 * Provider component
 */
export function EventEditProvider({
                                      value,
                                      initialEvent,
                                      children,
                                  }: EventEditProviderProps) {
    const [event, setEvent] = useState<EventDB>(initialEvent);

    // Update internal state if initialEvent changes (e.g. from parent fetch)
    useEffect(() => {
        setEvent(initialEvent);
    }, [initialEvent]);

    const handleUpdateEvent = async (patch: Partial<EventDB>) => {
        if (value?.updateEvent) {
            const result = value.updateEvent(patch);
            
            // Handle both Promise<boolean> and void/boolean return
            if (result instanceof Promise) {
                const success = await result;
                if (success) {
                    setEvent(prev => ({ ...prev, ...patch }));
                }
                return success;
            } else {
                // If it's a boolean, use it. If void, assume true.
                const success = result === false ? false : true;
                if (success) {
                    setEvent(prev => ({ ...prev, ...patch }));
                }
                return success;
            }
        }
        return false;
    };

    /**
     * automatically fill in default values if data is missing or incomplete
     */
    const mergedValue: ExtendedEventEditContextValue = {
        ...defaultValue,
        ...value,
        event,
        updateEvent: handleUpdateEvent,
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
export function useEventEdit(): ExtendedEventEditContextValue {
    const context = useContext(EventEditContext);

    // Optional guard (useful during development)
    if (!context) {
        throw new Error("useEventEdit must be used within an EventEditProvider");
    }

    return context;
}