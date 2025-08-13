import Box from "@mui/material/Box";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {InputLabel, MenuItem, Typography} from "@mui/material";


export const DistanceFilter = (
    props: {
        onChange: ((event: SelectChangeEvent<string>) => void) | null;
        value: string;
    }
) => {
    return (
        <>
            <Box>
                <Typography variant="h6" gutterBottom>Distance</Typography>
                <InputLabel id="distance-selector-label">Find Results Within:</InputLabel>
                <Select
                labelId="distance-selector-label"
                id="distance-selector"
                value={props.value}
                label="Distance"
                onChange={props.onChange || undefined}
                >
                    <MenuItem value={"0"}>Online Only</MenuItem>
                    <MenuItem value={"5"}>5 miles</MenuItem>
                    <MenuItem value={"15"}>15 miles</MenuItem>
                    <MenuItem value={"30"}>30 miles</MenuItem>
                    <MenuItem value={"50"}>50 miles</MenuItem>
                    <MenuItem value={"120"}>120 miles</MenuItem>
                </Select>
                <Typography variant="body2" color="text.secondary">*</Typography>
            </Box>
        </>
    )
}