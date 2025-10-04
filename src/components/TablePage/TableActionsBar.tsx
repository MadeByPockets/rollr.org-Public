"use client"
import {Dispatch, SetStateAction} from "react";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/List";
import SaveIcon from "@mui/icons-material/Save";
import {deleteTable, joinWaitlist, leaveTable} from "@/app/TablePage/actions";
import {TableStatus} from "@/components/TablePage/types";
import Modal from "@/components/shared/Modal";
import { useModal } from "@/app/TablePage/ModalProvider/ModalContext";

export interface tableActionProps {
    enableEdits: Dispatch<SetStateAction<boolean>>;
    isInEditMode: boolean;
    numPlayers: number;
    removePlayerFromWaitlist: (playerId: number) => void;
    saveTableCallback: () => void;
    slots: number;
    tableStatus: TableStatus;
    waitlist: number[];
}

export default function TableActionsBar(props: tableActionProps) {
    const { hideModal, showModal } = useModal();
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

    const renderPlayerWaitlistView = () => {
        return (
            <>
                <ul>
                    {waitlist.map((playerId) => <li key={playerId}>{playerId}</li>)}
                </ul>
                <button onClick={() => hideModal()}>close modal</button>
            </>
        )
    }

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
                <>
                    <Button onClick={handleEnableEditMode} sx={buttonStyle} endIcon={<EditIcon/>}>
                        Edit
                    </Button>
                    <Button onClick={() => showModal(renderPlayerWaitlistView())} sx={buttonStyle} endIcon={<ListIcon />}>
                        View Waitlist
                    </Button>
                </>
            ) : canSaveTable ? (
                <>
                    <Button onClick={handleSaveTable} sx={buttonStyle} endIcon={<SaveIcon/>}>
                        Save
                    </Button>
                    <Button sx={buttonStyle} endIcon={<ListIcon />}>
                        Edit Waitlist
                    </Button>
                </>
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