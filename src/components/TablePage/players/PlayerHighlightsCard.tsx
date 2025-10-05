import Image from "next/image";
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import {PlayerFormat} from "@/mocks/Players";
import {TagsFormat} from "@/mocks/Tags";
import {renderTagsFromIds} from "@/components/shared/TagComponents";
import Button from "@mui/material/Button";


export type PlayerHighlightsCardProps = {
    addToTable?: (player: PlayerFormat) => void;
    allTags: TagsFormat[];
    canChangeDungeonMaster: boolean;
    canEdit: boolean;
    handleAssignToDungeonMaster: (player: PlayerFormat) => void;
    isWaitList?: boolean;
    player: PlayerFormat;
    removeFromTable: (player: PlayerFormat) => void;
}

export const PlayerHighlightsCard = function(props: PlayerHighlightsCardProps) {
    const {
        allTags,
        canChangeDungeonMaster,
        canEdit,
        handleAssignToDungeonMaster,
        isWaitList,
        player,
        removeFromTable
    } = props;

    return (
        <Card
            elevation={3}
            sx={{
                backgroundColor: canEdit ? "#fffbea" : "#f5f9fa",
                marginBottom:"6px"
            }}
        >
            <CardContent>
                <Grid container spacing={2} direction="column">
                    <Grid container direction="row">
                        <Grid>
                            <Image
                                alt={player.username + "'s profile pic"}
                                height={64}
                                src={player.miniPic}
                                width={64}
                            />
                        </Grid>
                        <Grid>
                            <Typography variant="h5">
                                {player.username}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid>
                        {
                            renderTagsFromIds(player.tags, allTags)
                        }
                    </Grid>
                </Grid>
                {canEdit && (
                    <Grid>
                        <Button onClick={() => removeFromTable(player)}>
                            { isWaitList && (
                                <p>Deny Player</p>
                            ) || (
                                <p>Remove Player</p>
                            )
                            }
                        </Button>
                        {canChangeDungeonMaster && (
                            <Button onClick={() => {
                                handleAssignToDungeonMaster(player);
                                removeFromTable(player);
                            }}>
                                <p>Assign to DungeonMaster</p>
                            </Button>
                        )}
                    </Grid>
                )}
            </CardContent>
        </Card>
    )
}

export const DMHighlightsCard = function({canEdit, player, allTags}:{canEdit: boolean, player: PlayerFormat, allTags:TagsFormat[]}) {
    return (
        <Card
        elevation={3}
        sx={{
            backgroundColor: "#f5f9fa",
            marginBottom:"6px"
        }}
        >
            <CardHeader slotProps={{title: { variant: "h4"}}} title="Game Master"/>
            <CardContent sx={{ backgroundColor: canEdit ? '#fffbea' : 'inherit' }}>
                <Grid container spacing={2} direction="column">

                    <Grid>
                        <Typography variant="h5">
                            {player.username}
                        </Typography>
                    </Grid>
                    <Grid container direction="row">
                        <Grid>
                            <Image
                                alt={player.username + "'s profile pic"}
                                height={120}
                                src={player.imageUrl ? player.imageUrl : ""}
                                width={256}
                            />
                        </Grid>

                        <Grid>
                            {
                                renderTagsFromIds(player.tags, allTags)
                            }
                        </Grid>
                        <Typography>{player.description}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        )
}