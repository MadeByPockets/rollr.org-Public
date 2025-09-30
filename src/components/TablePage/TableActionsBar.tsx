"use client"
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {TableStatus} from "@/components/TablePage/types";
import {deleteTable, joinWaitlist, leaveTable} from "@/app/TablePage/actions";

export interface tableActionProps {
    numPlayers: number,
    slots: number,
    waitlist: number,
    tableStatus: TableStatus,
}

export default function TableActionsBar(
    {
        waitlist,
        slots,
        numPlayers,
        tableStatus,
    }: tableActionProps
)
    {
        const {isOwner, isPlayer, isDM} = tableStatus;
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
                <Button onClick={async () => { await joinWaitlist(); }}>
                    Join Waitlist
                </Button>
            )}

            {/* Leave Table Button */}
            {!isOwner && isPlayer && (
                <Button onClick={async () => { await leaveTable(); }}>
                    Leave Table
                </Button>
            )}

            {/* Delete Table Button */}
            { isOwner && (
                <Button onClick={async () => { await deleteTable(); }}>
                    Delete Table
                </Button>
            )}

        </Grid>
    )
}