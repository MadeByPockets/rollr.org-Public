import {Card, CardContent, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export type EventBasicInfoProps = {
    description: string,
    locationId: string,
    startingDate?: Date | string,
    endingDate?: Date | string,
    timeInfo: string
}
export default function EventBasicInfo({description, locationId, startingDate, endingDate, timeInfo} : EventBasicInfoProps) {
    return (
        <Grid>
            <Card style={{
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(135deg, rgba(225, 225, 225, 1), rgba(250, 250, 250, 1))',
            }}>
                <CardContent>
                    {generateTimeInfo(timeInfo, startingDate, endingDate)}
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


const generateTimeInfo = function (timeInfo: string, startingDate?: Date | string, endingDate?: Date | string) {

    const formatDateTime = (dateInput: Date | string) => {
        const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[d.getUTCMonth()];
        const day = d.getUTCDate();
        const year = d.getUTCFullYear();
        let hours = d.getUTCHours();
        const minutesNum = d.getUTCMinutes();
        const minutes = String(minutesNum).padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        if (hours === 0) hours = 12;
        const timeStr = minutes === '00' ? `${hours}${ampm}` : `${hours}:${minutes}${ampm}`;
        return `${month} ${day}, ${year} @ ${timeStr} UTC`;
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
        }}>
        Location Data goes here
    </Box>
    )
}