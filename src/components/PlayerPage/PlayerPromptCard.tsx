import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

// Props for the PlayerPromptCard component
type PlayerPromptCardProps = {
    title: string | null;
    description: string | null;
};

const PlayerPromptCard: React.FC<PlayerPromptCardProps> = ({ title, description }) => {
    return (
        <Card
            sx={{
                margin: "1rem",
                background: "linear-gradient(135deg, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 1))", // Gradient color scheme
                boxShadow: "0px 8px 15px rgba(25, 118, 210, 0.3)", // Card shadow
                borderRadius: "12px", // Rounded corners
                color: "#FFFFFF", // Text contrast with the background
                overflow: "hidden", // Keeps consistent and clean card shape
            }}
            className="transition duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
            <CardContent className="p-6">
                {/* Title */}
                {title && (
                    <Typography
                        variant="h5"
                        className="font-bold text-lg uppercase text-center tracking-wide mb-4"
                        sx={{
                            color: "#FFFFFF", // Bright white for high visibility
                            textShadow: "0px 3px 6px rgba(0, 0, 0, 0.5)", // Strong text shadow for contrast
                            fontSize: "1.5rem",
                        }}
                    >
                        {title}
                    </Typography>
                )}

                {/* Description */}
                {description && (
                    <Typography
                        variant="body2"
                        className="text-sm font-medium text-center"
                        sx={{
                            color: "#E3F2FD", // Softer light blue for description
                            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)", // Subtle shadow
                            lineHeight: 1.6,
                            marginTop: "1rem",
                        }}
                    >
                        {description}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default PlayerPromptCard;

