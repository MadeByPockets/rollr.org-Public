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
import { useModal } from "@/app/TablePage/ModalProvider/ModalContext";
import {MockedPlayers, PlayerFormat} from "@/mocks/Players";
import Image from "next/image";
import { CardHeader } from "@mui/material";

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
    const {
        enableEdits,
        isInEditMode,
        numPlayers,
        removePlayerFromWaitlist,
        slots,
        saveTableCallback,
        tableStatus,
        waitlist
    } = props;
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

    const renderPlayerWaitlistModalContent = (canMovePlayersToTable?: boolean) => {
        const waitlistPlayers: PlayerFormat[] =
            waitlist.map((playerId: number) =>
                MockedPlayers.find((player: PlayerFormat) =>
                    playerId === player.id
                )
            ).filter((p): p is PlayerFormat => p !== undefined);

        if (waitlist.length === 0) {
            return (
                <p>Waitlist is empty!</p>
            );
        }

        return (
            <div className="flex flex-col items-center">
                <CardHeader slotProps={{title: {variant: "h4"}}} title="Waitlist Players: "/>
                <ul className="gap-8">
                    {waitlistPlayers.map((player) => (
                        <li
                            className={`${canMovePlayersToTable ? 'bg-amber-100' : 'bg-gray-200'} mb-8 flex flex-row flex-start space-between justify-center items-center`}
                            key={player.id}
                            onClick={() => canMovePlayersToTable ? removePlayerFromWaitlist(player.id) : {}}
                            tabIndex={0}
                        >

                            <Image
                                alt={player.username + "'s profile pic"}
                                height={64}
                                src={player.miniPic || ""}
                                width={64}
                            />
                            <div>{player.username}</div>
                        </li>
                    ))}
                </ul>
                <button onClick={() => hideModal()}>close modal</button>
            </div>
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