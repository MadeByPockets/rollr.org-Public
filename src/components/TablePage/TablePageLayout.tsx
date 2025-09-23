import {Box, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {TableFormat} from "@/mocks/Tables"
import {TagsFormat} from "@/mocks/Tags";
import {generateTagsDisplay} from "@/components/shared/TagComponents";
import { JSX } from "react";



export type TablePageProps = {
    table: TableFormat,
    allTags: TagsFormat[]
}


export default function TablePageLayout({table, allTags} : TablePageProps) {
    return(
        <>
            {/** ----- Main Card --------- **/}
    <Card sx={{
        borderRadius: "5%",
        padding: "15px",
        boxShadow: "0px 8px 15px rgba(25, 118, 210, 0.3)"
    }}>

        {/** --------------- START CONTENT ----------------- **/}
        <Grid container>
            {/** ---------------- HEADER ----------------**/}
            <Grid container spacing={2} direction="column" sx={{
                paddingLeft: 2,
                background: "linear-gradient(135deg, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 1))", // Primary Blue Gradient, // Deep shadow based on the color
            }}>
                {/** ----------- title ------------ **/}
                <CardHeader title={table.title}/>

                {/** ----------- Short Description -------- **/}
                <Typography>{table.shortDescription}</Typography>

                {/** ---------------- Tags --------------**/}
                <Grid>
                    {
                    renderTags(table.tags, allTags)
                }
                </Grid>
            </Grid>

            {/** ------------ Main Body ------------------- **/}
            <Grid container direction="row">
            <CardContent className="bg-gray-200">
                <Grid container direction="row">
                    <Grid>
                        <Typography sx={{whiteSpace:'pre-wrap'}}>{table.description}</Typography>
                    </Grid>
                    <Grid>
                        Placeholder
                    </Grid>
                </Grid>
            </CardContent>
        </Grid>
        </Grid>
    </Card>
            </>
    )
}

const renderTags = function (tags: number[] | undefined, allTags: TagsFormat[] | undefined) : JSX.Element {
    if (!tags || ! allTags) { return (<></>) }
    return (
        <Grid container spacing={1} paddingBottom={1.5}>
        {
            tags.map(
                (tagId) => {
                    const tag = allTags.find(
                        (potentialTag) => tagId === potentialTag.id
                    )
                    return tag ? generateTagsDisplay(tag) : (<></>);
                }
            )
            }
        </Grid>
        )
}