"use client"
import {Dispatch, SetStateAction} from "react";
import {Grid, Typography, CardHeader} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/List";
import SaveIcon from "@mui/icons-material/Save";
import Image from "next/image";
import {TableStatus} from "@/components/TablePage/types";
import { useModal } from "@/components/TablePage/ModalProvider/ModalContext";
import type { WaitlistPlayer } from "@/types/player";

export interface TableActionProps {
    enableEdits: Dispatch<SetStateAction<boolean>>;
    isInEditMode: boolean;
    numPlayers: number;
    removePlayerFromWaitlist: (playerId: number) => void;
    saveTableCallback: () => void;
    slots: number;
    tableStatus: TableStatus;
    waitlistPlayers?: WaitlistPlayer[];
    onDeleteTable?: () => void | Promise<void>;
    onJoinWaitlist?: () => void | Promise<void>;
    onLeaveTable?: () => void | Promise<void>;
}

export default function TableActionsBar(props: TableActionProps) {
    const { hideModal, showModal } = useModal();
    const {
        enableEdits,
        isInEditMode,
        numPlayers,
        removePlayerFromWaitlist,
        slots,
        saveTableCallback,
        tableStatus,
        waitlistPlayers = [],
        onDeleteTable,
        onJoinWaitlist,
        onLeaveTable,
    } = props;
    const {isOwner, isPlayer, isDM, onWaitlist} = tableStatus;

    const handleEnableEditMode = () => {
        enableEdits((prevState) => !prevState);
    };

    const handleSaveTable = () => {
        saveTableCallback();
        enableEdits((prevState) => !prevState);
    };

    const canEditTable = isOwner && !isInEditMode;
    const canSaveTable = isOwner && isInEditMode;

    const renderPlayerWaitlistModalContent = (canMovePlayersToTable?: boolean) => {
        if (waitlistPlayers.length === 0) {
            return <p>Waitlist is empty!</p>;
        }

        return (
            <div className="flex flex-col items-center">
                <CardHeader slotProps={{title: {variant: "h4"}}} title="Waitlist Players: "/>
                <ul className="gap-8">
                    {waitlistPlayers.map((player) => (
                        <li
                            className={`${canMovePlayersToTable ? 'bg-amber-100' : 'bg-gray-200'} mb-8 flex flex-row flex-start space-between justify-center items-center`}
                            key={player.id}
                            onClick={() => canMovePlayersToTable ? removePlayerFromWaitlist(player.id) : undefined}
                            tabIndex={0}
                        >
                            <Image
                                alt={player.username + "'s profile pic"}
                                height={64}
                                src={player.miniPic || "/quick-PFP.png"}
                                width={64}
                            />
                            <div>{player.username}</div>
                        </li>
                    ))}
                </ul>
                <button onClick={() => hideModal()}>close modal</button>
            </div>
        )
    };

    return (
        <Grid container direction="column" spacing={1}>
            <Grid container direction="row">
                <Typography color="white" sx={{ textShadow:'4px 4px 6px rgba(0, 0, 0, 0.5)' }}>
                    Players: {numPlayers} / {slots}
                </Typography>
            </Grid>

            <Grid container direction="row">
                {!isOwner && !isPlayer && !isDM && !onWaitlist && (
                    <Button onClick={() => onJoinWaitlist?.()} sx={buttonStyle}>
                        Join Waitlist
                    </Button>
                )}

                {!isOwner && (isPlayer || onWaitlist) && (
                    <Button onClick={() => onLeaveTable?.()} sx={buttonStyle}>
                        Leave Table
                    </Button>
                )}

                { canEditTable ? (
                    <>
                        <Button onClick={handleEnableEditMode} sx={buttonStyle} endIcon={<EditIcon/>}>
                            Edit
                        </Button>
                        <Button
                            endIcon={<ListIcon />}
                            onClick={() => showModal(renderPlayerWaitlistModalContent(canEditTable))}
                            sx={buttonStyle}
                        >
                            View Waitlist
                        </Button>
                    </>
                ) : canSaveTable ? (
                    <>
                        <Button onClick={handleSaveTable} sx={buttonStyle} endIcon={<SaveIcon/>}>
                            Save
                        </Button>
                        <Button
                            endIcon={<ListIcon />}
                            onClick={() => showModal(renderPlayerWaitlistModalContent(canSaveTable))}
                            sx={buttonStyle}
                        >
                            Edit Waitlist
                        </Button>
                    </>
                ) : null}

                { isOwner && (
                    <Button onClick={() => onDeleteTable?.()} sx={buttonStyle} endIcon={<DeleteIcon/>}>
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
};
