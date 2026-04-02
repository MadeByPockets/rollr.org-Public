"use client"
import React, { useState } from "react";
import { 
    Box, 
    Button, 
    TextField, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    IconButton, 
    Tooltip, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel,
    CircularProgress 
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CANDIDATE_TIMEZONES } from "../EventBasicInfo";

export type EventBasicInfoEditPayload = {
    description: string;
    startingDate?: string;
    endingDate?: string;
    date: string; // timeInfo
    timezone: string;
};

type EventBasicInfoEditProps = {
    initialValue: EventBasicInfoEditPayload;
    onCancel: () => void;
    onSave: (payload: Partial<EventBasicInfoEditPayload>) => Promise<void> | void;
};

export default function EventBasicInfoEdit({
                                               initialValue,
                                               onCancel,
                                               onSave,
                                           }: EventBasicInfoEditProps) {

    // Helper to get YYYY-MM-DDThh:mm wall time for a specific timezone
    const toWallTimeISO = (dateInput: string | undefined, timeZone: string) => {
        if (!dateInput) return "";
        const d = new Date(dateInput);
        if (isNaN(d.getTime())) return "";

        const parts = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', hour12: false,
            timeZone: timeZone
        }).formatToParts(d);
        
        const f = (type: string) => parts.find(p => p.type === type)?.value;
        // Some environments might return 24 for hour 0 if hour12 is false, but usually 00.
        // Also handle the order of parts.
        const year = f('year');
        const month = f('month');
        const day = f('day');
        let hour = f('hour');
        if (hour === '24') hour = '00';
        const minute = f('minute');

        return `${year}-${month}-${day}T${hour}:${minute}`;
    };

    // Helper to combine wall time + timezone into UTC ISO string
    const toUTCISOString = (wallTime: string, timeZone: string) => {
        if (!wallTime) return undefined;
        
        // We need to find the offset for this wall time in the target timezone.
        const d = new Date(wallTime + ":00Z"); 
        
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: timeZone,
            timeZoneName: 'longOffset'
        }).formatToParts(d);
        
        const offsetPart = parts.find(p => p.type === 'timeZoneName')?.value || "GMT";
        const offset = offsetPart.replace('GMT', ''); 
        
        const isoWithOffset = `${wallTime}:00${offset || "+00:00"}`;
        return new Date(isoWithOffset).toISOString();
    };

    const [description, setDescription] = useState(initialValue.description);
    const [timezone, setTimezone] = useState(initialValue.timezone);
    const [startingDate, setStartingDate] = useState(toWallTimeISO(initialValue.startingDate, initialValue.timezone));
    const [endingDate, setEndingDate] = useState(toWallTimeISO(initialValue.endingDate, initialValue.timezone));
    const [timeInfo, setTimeInfo] = useState(initialValue.date);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const patch: Partial<EventBasicInfoEditPayload> = {};

            if (description !== initialValue.description) patch.description = description;
            if (timeInfo !== initialValue.date) patch.date = timeInfo;
            if (timezone !== initialValue.timezone) patch.timezone = timezone;

            if (startingDate !== toWallTimeISO(initialValue.startingDate, timezone) || timezone !== initialValue.timezone) {
                patch.startingDate = toUTCISOString(startingDate, timezone);
            }

            if (endingDate !== toWallTimeISO(initialValue.endingDate, timezone) || timezone !== initialValue.timezone) {
                patch.endingDate = toUTCISOString(endingDate, timezone);
            }

            if (Object.keys(patch).length > 0) {
                await onSave(patch);
            } else {
                onCancel();
            }
        } catch (error) {
            console.error("Failed to save basic info changes", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Card sx={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, rgba(225, 225, 225, 1), rgba(250, 250, 250, 1))',
            border: '2px dashed rgba(25,118,210,0.5)',
            width: '100%'
        }}>
            <CardContent sx={{ position: 'relative' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1, gap: 1 }}>
                    <Tooltip title="Cancel">
                        <IconButton size="small" onClick={onCancel} color="error" disabled={isSaving}>
                            <CancelIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Apply Changes">
                        <IconButton size="small" onClick={handleSave} color="primary" disabled={isSaving}>
                            {isSaving ? <CircularProgress size={24} /> : <CheckCircleIcon />}
                        </IconButton>
                    </Tooltip>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant={"body1"} fontSize={"x-large"} fontWeight={"bold"} sx={{ mb: 1 }}>
                        Event Dates & Times:
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="Starting Date"
                                type="datetime-local"
                                size="small"
                                value={startingDate}
                                onChange={(e) => setStartingDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="Ending Date"
                                type="datetime-local"
                                size="small"
                                value={endingDate}
                                onChange={(e) => setEndingDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Display Timezone</InputLabel>
                                <Select
                                    label="Display Timezone"
                                    value={timezone}
                                    onChange={(e) => setTimezone(e.target.value)}
                                >
                                    {CANDIDATE_TIMEZONES.map(tz => (
                                        <MenuItem key={tz} value={tz}>{tz}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant={"h5"}>
                            Hours of Operation:
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            variant="standard"
                            placeholder="e.g. Mon-Fri 9am-5pm"
                            value={timeInfo}
                            onChange={(e) => setTimeInfo(e.target.value)}
                            sx={{ mt: 1 }}
                        />
                    </Box>
                </Box>

                <Typography variant={"h5"} paddingTop={2}>
                    About:
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    variant="standard"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                        paddingTop: 1,
                        '& .MuiInputBase-root': {
                            lineHeight: 1.5,
                            whiteSpace: 'pre-wrap'
                        }
                    }}
                />

                <Box sx={{
                    mt: 2,
                    width: '100%',
                    p: 1.5,
                    borderRadius: 2,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    background: 'linear-gradient(135deg, rgba(180, 180,180, 1), rgba(225, 225, 225, 0.8))',
                    color: 'rgba(0,0,0,0.5)',
                    border: '1px dashed rgba(0,0,0,0.2)'
                }}>
                    Location Data (Not Editable)
                </Box>
            </CardContent>
        </Card>
    );
}
