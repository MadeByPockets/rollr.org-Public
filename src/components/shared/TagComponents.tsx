import React from "react";
import {TagsFormat} from "@/mocks/Tags";


export function generateTagsDisplay(tag: TagsFormat) {
    return (
                <span
                    key={tag.id}
                    className="inline-block text-sm px-3 py-1 rounded-full outline-black outline-2 font-outlined"
                    style={{
                        marginRight: "6px",
                        marginBottom: "6px",
                        background: tag.color || '#bfbcbb',
                        color: "white",
                        textShadow: "black 0.2em 0.2em 0.4em"
                    }}
                >
                    {tag.label}
                </span>
    )
}

export function renderTagsFromIds(ids: number[] | undefined, legalTags: TagsFormat[]) {
    if (!ids || !legalTags || legalTags.length === 0) { return ( <></>) }
    const validTags =  ids.map(
            (id) => {
                return legalTags.find(
                    (tag) => tag.id === id
                )
            }
        )

    return validTags.map(
        (tag) => {
            if (tag) return generateTagsDisplay(tag)
        }
    )
}