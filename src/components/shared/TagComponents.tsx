"use client";

import React from "react";
import type { Tag } from "@/types/tag";
import Chip from "@/components/shared/Chip";

export function generateTagsDisplay(tag: Tag) {
    return (
        <Chip tag={tag} key={tag.id} />
    )
}

export function renderTagsFromIds(ids: number[] | undefined, legalTags: Tag[], options: { showEventTag?: boolean, eventTagId?: number } = {}) {
    if (!ids || !legalTags || legalTags.length === 0) { return ( <></>) }
    const { showEventTag = false, eventTagId } = options;
    const validTags = ids
        .map((id) => legalTags.find((tag) => tag.id === id))
        .filter((tag): tag is Tag => Boolean(tag));

    // Sort tags: event tag (if shown) first, then "Organizer Run", then "Display Only", then others
    const sortedTags = [...validTags].sort((a, b) => {
        // Handle event tag priority if enabled
        if (showEventTag && eventTagId !== undefined) {
            if (a.id === eventTagId && b.id === eventTagId) return 0;
            if (a.id === eventTagId) return -1;
            if (b.id === eventTagId) return 1;
        }

        const priorityOrder = ["Organizer Run", "Display Only"];
        const aIndex = priorityOrder.indexOf(a.label);
        const bIndex = priorityOrder.indexOf(b.label);

        if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
        }
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return 0;
    });

    return sortedTags.map((tag) => generateTagsDisplay(tag));
}
