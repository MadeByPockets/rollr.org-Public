"use client";

import {Tag} from "@/types/tag";
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Chip from "@/components/shared/Chip";

export default function PlayerTagsCard(props : {PlayerTags: Tag[]}) {
    return (
      <Grid container>
      <Grid size={{xs:12, md:3}}>
        <Card>
          <CardHeader title="Player Tags" style={{
            background: "linear-gradient(135deg, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 1))",
            color: "#FFFFFF", // Pure white for username
            fontSize: "1.5rem",
            textShadow: "0px 3px 6px rgba(0, 0, 0, 0.5)", // Strong shadow for visibility
          }}/>
          <CardContent>
            {renderLabels(props.PlayerTags)}
          </CardContent>
        </Card>
      </Grid>
      </Grid>

    )
}

const renderLabels = (tags:Tag[]) => {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      { tags.map((tag) => <Chip key={tag.id} tag={tag} />) }
    </div>
  )
}