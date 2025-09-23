import Box from "@mui/material/Box";
import React from "react";
import {TagsFormat} from "@/mocks/Tags";


export function generateTagsDisplay(tag: TagsFormat) {
    return (
                <span
                    key={tag.id}
                    className="inline-block text-sm px-3 py-1 rounded-full outline-black outline-2 font-outlined"
                    style={{
                        background: tag.color || '#bfbcbb',
                        color: "white",
                        textShadow: "black 0.2em 0.2em 0.4em"
                    }}
                >
                    {tag.label}
                </span>
    )
}