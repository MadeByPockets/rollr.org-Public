"use client"
import React, { useState } from "react";
import {Card, CardContent, Typography, Button} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEventEdit } from "./editMode/EventEditContext";
import EventBasicInfoEdit from "./editMode/EventBasicInfoEdit";

export type EventBasicInfoProps = {
    description: string,
    locationId: string,
    startingDate?: Date | string,
    endingDate?: Date | string,
    timeInfo: string,
    timezone?: string
}

export const CANDIDATE_TIMEZONES = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Anchorage",
    "America/Adak",
    "Pacific/Honolulu",
    "UTC"
];

export default function EventBasicInfo(props: EventBasicInfoProps) {
    const { isOwner, updateEvent } = useEventEdit();
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return (
            <EventBasicInfoEdit
                initialValue={{
                    description: props.description,
                    startingDate: typeof props.startingDate === 'string' ? props.startingDate : props.startingDate?.toISOString(),
                    endingDate: typeof props.endingDate === 'string' ? props.endingDate : props.endingDate?.toISOString(),
                    date: props.timeInfo,
                    timezone: props.timezone || "UTC"
                }}
                onCancel={() => setIsEditing(false)}
                onSave={(payload) => {
                    updateEvent(payload);
                    setIsEditing(false);
                }}
            />
        );
    }

    return (
        <EventBasicInfoView
            {...props}
            isOwner={isOwner}
            onEdit={() => setIsEditing(true)}
        />
    );
}

type EventBasicInfoViewProps = EventBasicInfoProps & {
    isOwner: boolean;
    onEdit: () => void;
};

function EventBasicInfoView({description, locationId, startingDate, endingDate, timeInfo, timezone, isOwner, onEdit} : EventBasicInfoViewProps) {
    return (
        <Grid sx={{ position: 'relative' }}>
            <Card style={{
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(135deg, rgba(225, 225, 225, 1), rgba(250, 250, 250, 1))',
            }}>
                <CardContent>
                    {isOwner && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button size="small" onClick={onEdit} variant="outlined">Edit</Button>
                        </Box>
                    )}
                    {generateTimeInfo(timeInfo, timezone || "UTC", startingDate, endingDate)}
                    <Typography variant={"h5"} paddingTop={2}>
                        About:
                    </Typography>
                    <Typography sx={{whiteSpace: 'pre-wrap'}} paddingTop={1}>
                        {description}
                    </Typography>
                    {getLocation(locationId)}
                </CardContent>
            </Card>
        </Grid>
    )
}


const generateTimeInfo = function (timeInfo: string, timezone: string, startingDate?: Date | string, endingDate?: Date | string) {

    const formatDateTime = (dateInput: Date | string) => {
        const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        if (!d || isNaN(d.getTime())) return "";

        try {
            return new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: timezone,
                timeZoneName: 'shortGeneric'
            }).format(d).replace(',', ' @');
        } catch (e) {
            // Fallback for invalid timezones
            return d.toUTCString();
        }
    }

    let rangeText: string | null = null;
    if (startingDate && endingDate) {
        rangeText = `From ${formatDateTime(startingDate)}\nUntil ${formatDateTime(endingDate)}`;
    } else if (startingDate) {
        rangeText = `starting ${formatDateTime(startingDate)}`;
    } else if (endingDate) {
        rangeText = `until ${formatDateTime(endingDate)}`;
    }

    return (
        <Box sx={{ mt: 2 }}>
            {rangeText && (
                <Typography variant={"body1"} fontSize={"x-large"} fontWeight={"bold"} sx={{whiteSpace:"pre-wrap"}}>
                    {rangeText}
                </Typography>
            )}
            {timeInfo && (
                <Box sx={{ mt: 1 }}>
                    <Typography variant={"h5"}>
                        Hours of Operation:
                    </Typography>
                    <Typography variant={"body1"} sx={{whiteSpace:"pre-wrap"}}>
                        {timeInfo}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}


/*
    DUMMY FUNCTIONS -- these relate heavily to sensitive data, so the functions below are simply placeholders
 */

const getLocation = function(locationId: string) {
    return (<Box sx={{
            width: '100%',
            p: 1.5,
            borderRadius: 2,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, rgba(180, 180,180, 1), rgba(225, 225, 225, 0.8))',
            mt: 2
        }}>
        Location Data goes here
    </Box>
    )
}