"use client";

import React from "react";
import type { Tag } from "@/types/tag";
import Chip from "@/components/shared/Chip";

export function generateTagsDisplay(tag: Tag) {
    return (
        <Chip tag={tag} key={tag.id} />
    )
}

export function renderTagsFromIds(ids: number[] | undefined, legalTags: Tag[]) {
    if (!ids || !legalTags || legalTags.length === 0) { return ( <></>) }
    const validTags = ids
        .map((id) => legalTags.find((tag) => tag.id === id))
        .filter((tag): tag is Tag => Boolean(tag));

    return validTags.map((tag) => generateTagsDisplay(tag));
}
