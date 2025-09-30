export interface UpdatableValues {
    description?: string,
    shortDescription?: string,
    tags?: number[],
    communicationPrefs?: string,
    owner?: string,
    dungeonMaster?: string,
}

export type TableStatus = {
    isPlayer: boolean,
    isDM: boolean,
    isOwner: boolean,
    onWaitlist: boolean,
}
