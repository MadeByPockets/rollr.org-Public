import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

type PlayerDetailsProps = {
    preferredPronouns: string | null;
    age: number | null;
    yearsPlaying: number | null;
    discordUsername: string | null;
    preferredGames: string[] | null;
};

const PlayerDetails: React.FC<PlayerDetailsProps> = ({
                                                         age,
                                                         yearsPlaying,
                                                         discordUsername,
                                                         preferredGames,
                                                     }) => {
    return (
        <Card
            sx={{
                margin: "1rem",
                background: "linear-gradient(135deg, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 1))", // Primary Blue Gradient
                boxShadow: "0px 8px 15px rgba(25, 118, 210, 0.3)", // Deep shadow based on the color
                borderRadius: "12px", // Rounded corners
                color: "#FFFFFF", // White as the base text color for contrast
                position: "relative",
                overflow: "hidden", // Ensures clean edges
            }}
            className="transition duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
            {/* Decorative Overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-60"
                aria-hidden="true"
            ></div>

            <CardContent className="relative p-6">
                {/* Title */}
                <Typography
                    variant="h5"
                    className="font-bold uppercase text-center tracking-wide mb-4"
                    sx={{
                        color: "#FFFFFF", // Bright white for high contrast
                        textShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)", // Stronger shadow for bold presence
                        fontSize: "1.5rem", // Slightly larger title size
                    }}
                >
                    Player Details
                </Typography>

                {/* Details Section */}
                <div className="space-y-3">
                    {age !== null && (
                        <Typography
                            variant="body2"
                            className="text-sm font-medium"
                            sx={{
                                color: "#FFFFFF",
                                textShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
                                fontWeight: "bold",
                            }}
                        >
                            <span className="font-extrabold text-cyan-300">Age:</span> {age}
                        </Typography>
                    )}
                    {yearsPlaying !== null && (
                        <Typography
                            variant="body2"
                            className="text-sm font-medium"
                            sx={{
                                color: "#FFFFFF",
                                textShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
                                fontWeight: "bold",
                            }}
                        >
                            <span className="font-extrabold text-cyan-300">Years Playing:</span> {yearsPlaying}
                        </Typography>
                    )}
                    {discordUsername && (
                        <Typography
                            variant="body2"
                            className="text-sm font-medium"
                            sx={{
                                color: "#FFFFFF",
                                textShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
                                fontWeight: "bold",
                            }}
                        >
                            <span className="font-extrabold text-cyan-300">Discord Username:</span> {discordUsername}
                        </Typography>
                    )}
                    {preferredGames && preferredGames.length > 0 && (
                        <Typography
                            variant="body2"
                            className="text-sm font-medium"
                            sx={{
                                color: "#FFFFFF",
                                textShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
                                fontWeight: "bold",
                            }}
                        >
                            <span className="font-extrabold text-cyan-300">Preferred Games:</span>{" "}
                            {preferredGames.join(", ")}
                        </Typography>
                    )}
                </div>

                {/* Footer Section */}
                <div className="mt-6 text-center">
                    <Typography
                        variant="caption"
                        className="text-xs italic"
                        sx={{
                            color: "#BBDEFB", // Subtle light blue for footer text
                            textShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        All information is player-submitted.
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default PlayerDetails;

