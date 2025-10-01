"use client"
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {TableStatus} from "@/components/TablePage/types";
import {deleteTable, joinWaitlist, leaveTable} from "@/app/TablePage/actions";
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import {Dispatch, SetStateAction} from "react";

export interface tableActionProps {
    numPlayers: number,
    slots: number,
    waitlist: number,
    tableStatus: TableStatus,
    enableEdits: Dispatch<SetStateAction<boolean>>,
}

export default function TableActionsBar(props: tableActionProps) {
    const { enableEdits, numPlayers, slots, tableStatus, waitlist } = props;
    const {isOwner, isPlayer, isDM} = tableStatus;
    const handleEnableEditMode = () => {
        enableEdits((prevState) => !prevState);
    }

    return (
        <Grid container direction="row">
            <Typography color="white" sx=
                {{
                    textShadow:'4px 4px 6px rgba(0, 0, 0, 0.5)'
                }}
            >
                Players: {numPlayers} / {slots}
            </Typography>

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

            {/* Edit Table Button */}
            { isOwner && (
                <Button onClick={handleEnableEditMode} sx={buttonStyle} endIcon={<EditIcon/>}>
                    Edit
                </Button>
            )}

            {/* Delete Table Button */}
            { isOwner && (
                <Button onClick={async () => { await deleteTable(); }} sx={buttonStyle} endIcon={<DeleteIcon/>}>
                    Delete Table
                </Button>
            )}

        </Grid>
    )
}

const buttonStyle = {
    marginLeft: "3px",
    backgroundColor:"blue",
    color:"white",
    borderRadius:"5px",

}