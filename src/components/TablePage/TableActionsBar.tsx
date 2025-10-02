"use client"
import {Dispatch, SetStateAction} from "react";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {deleteTable, joinWaitlist, leaveTable} from "@/app/TablePage/actions";
import {TableStatus} from "@/components/TablePage/types";

export interface tableActionProps {
    enableEdits: Dispatch<SetStateAction<boolean>>;
    isInEditMode: boolean;
    numPlayers: number;
    saveTableCallback: () => void;
    slots: number;
    tableStatus: TableStatus;
    waitlist: number;
}

export default function TableActionsBar(props: tableActionProps) {
    const { enableEdits, isInEditMode, numPlayers, slots, saveTableCallback, tableStatus, waitlist } = props;
    const {isOwner, isPlayer, isDM} = tableStatus;
    const handleEnableEditMode = () => {
        enableEdits((prevState) => !prevState);
    }

    const handleSaveTable = () => {
        saveTableCallback();
        console.log("called 'save table'");
        enableEdits((prevState) => !prevState);
    };

    const canEditTable = isOwner && !isInEditMode;
    const canSaveTable = isOwner && isInEditMode;

    return (
        <Grid container direction="column" spacing={1}>
            <Grid container direction="row">
                <Typography color="white" sx=
                    {{
                        textShadow:'4px 4px 6px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    Players: {numPlayers} / {slots}
                </Typography>
            </Grid>

            <Grid container direction="row">
            {/* Join Waitlist Button */}
            { !isOwner && !isPlayer && !isDM && waitlist && (
                <Button onClick={async () => { await joinWaitlist(); }} sx={buttonStyle}>
                    Join Waitlist
                </Button>
            )}

            {/* Leave Table Button */}
            {!isOwner && isPlayer && (
                <Button onClick={async () => { await leaveTable(); }} sx={buttonStyle}>
                    Leave Table
                </Button>
            )}

            {/* Edit/Save Table Button */}
            { canEditTable ? (
                <Button onClick={handleEnableEditMode} sx={buttonStyle} endIcon={<EditIcon/>}>
                    Edit
                </Button>
            ) : canSaveTable ? (
                <Button onClick={handleSaveTable} sx={buttonStyle} endIcon={<SaveIcon/>}>
                    Save
                </Button>
            ) : null}

            {/* Delete Table Button */}
            { isOwner && (
                <Button onClick={async () => { await deleteTable(); }} sx={buttonStyle} endIcon={<DeleteIcon/>}>
                    Delete Table
                </Button>
            )}
            </Grid>

        </Grid>
    )
}

const buttonStyle = {
    marginLeft: "3px",
    backgroundColor:"blue",
    color:"white",
    borderRadius:"5px",

}