"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Tag } from "@/types/tag";
import Chip from "@/components/shared/Chip";

export type PlayerTagsCardProps = {
    tags: Tag[];
};

const PlayerTagsCard: React.FC<PlayerTagsCardProps> = ({ tags = [] }) => {
    return (
        <Card sx={{
            margin: "1rem",
            borderRadius: "12px",
            boxShadow: "0px 8px 15px rgba(25, 118, 210, 0.3)",
            overflow: "hidden"
        }} className="transition duration-300 transform hover:scale-105 hover:shadow-2xl">
            <CardHeader
                title="Player Tags"
                sx={{
                    background: "linear-gradient(135deg, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 1))",
                    color: "#FFFFFF",
                    fontSize: "1.5rem",
                    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.5)",
                    '& .MuiCardHeader-title': {
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        textAlign: "center",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                    }
                }}
            />
            <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Chip key={tag.id} tag={tag} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default PlayerTagsCard;