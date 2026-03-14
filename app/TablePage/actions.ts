"use server"

import {UpdatableValues} from "@/components/TablePage/types";

export async function deleteTable(): Promise<void> {
    console.log("[server action] deleteTable called");
}

export async function delistTable(): Promise<void> {
    console.log("[server action] delistTable called");
}

export async function joinWaitlist(): Promise<void> {
    console.log("[server action] joinWaitlist called");
}

export async function requestJoinTable(): Promise<void> {
    console.log("[server action] requestJoinTable called");
}

export async function updateValues(values: UpdatableValues): Promise<void> {
    console.log("[server action] updateValues called", values);
}

export async function leaveTable(): Promise<void> {
    console.log("[server action] leaveTable called");
}

export async function removePlayer(): Promise<void> {
    console.log("[server action] removePlayer called");
}
