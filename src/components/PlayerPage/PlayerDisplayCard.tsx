"use client";
import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import {ProfilePictureSettings} from "../../data/values";

const {aspectRatio} = ProfilePictureSettings;

type PlayerDisplayProps = {
    profilePicture: string | null;
    username: string;
    bio: string | null;
    preferredPronouns: string | null;
};

const PlayerDisplayCard: React.FC<PlayerDisplayProps> = ({
                                                             profilePicture,
                                                             username,
                                                             bio,
                                                             preferredPronouns,
                                                         }) => {
    const [imageSrc, setImageSrc] = useState<string>("/man-walking-silhouette-clipart.jpg");

    useEffect(() => {
        async function validateImage() {
            const newImage = profilePicture || "/man-walking-silhouette-clipart.jpg";
            if (!profilePicture) {
                setImageSrc("/man-walking-silhouette-clipart.jpg");
                return;
            }

            const img = new Image();
            img.src = newImage;

            img.onload = () => {
                setImageSrc(newImage);
            };

            img.onerror = () => {
                setImageSrc("/man-walking-silhouette-clipart.jpg");
            };
        }

        validateImage();
    }, [profilePicture]);

    return (
        <Card
            sx={{
                margin: "1rem",
                background: "linear-gradient(135deg, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 1))", // Vibrant blue gradient
                boxShadow: "0px 8px 15px rgba(25, 118, 210, 0.3)", // Blue shadow to add depth
                borderRadius: "12px", // Smooth rounded corners
                color: "#FFFFFF", // White text for high contrast
                overflow: "hidden", // Clean edges
            }}
            className="transition duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
            {/* Image Section */}
            <CardMedia
                component="img"
                image={imageSrc}
                alt={`${username}'s Profile Picture`}
                sx={{
                  aspectRatio: aspectRatio,
                    height: "auto",// Updates to maintain aspect ratio and fill space nicely
                    width: "100%",
                    objectFit: "scale-down",
                }}
            />

            <CardContent className="relative p-6">
                {/* Username */}
                <Typography
                    variant="h5"
                    component="div"
                    className="font-bold text-lg uppercase text-center tracking-wide mb-2"
                    sx={{
                        color: "#FFFFFF", // Pure white for username
                        fontSize: "1.5rem",
                        textShadow: "0px 3px 6px rgba(0, 0, 0, 0.5)", // Strong shadow for visibility
                    }}
                >
                    {username}
                </Typography>

                {/* Preferred Pronouns */}
                {preferredPronouns && (
                    <Typography
                        variant="body2"
                        className="text-sm font-medium"
                        sx={{
                            color: "#E3F2FD",
                            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)", // Subtle shadow for readability
                            fontWeight: "bold", // Emphasize key details
                            marginBottom: "1rem",
                        }}
                    >
                        {preferredPronouns}
                    </Typography>
                )}

                {/* Bio */}
                {bio && (
                    <Typography
                        variant="body2"
                        className="text-sm font-light"
                        sx={{
                            color: "#E3F2FD", // Softer muted tone for secondary text
                            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)", // Subtle shadow for readability
                            fontStyle: "italic", // Distinguish bio visually
                        }}
                    >
                        {bio}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default PlayerDisplayCard;






