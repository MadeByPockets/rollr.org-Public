import {TagsFormat} from "@/mocks/Tags";
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"

export default function PlayerTagsCard(props : {PlayerTags: TagsFormat[]}) {
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

const renderLabels = (tags:TagsFormat[]) => {

  return (
  <div className="mt-2 flex flex-wrap gap-2">
    { tags.map((tag) => generateLabel(tag))}
  </div>
)
}

const generateLabel = (tag:TagsFormat) => {

  let color = "#bfbcbb"
  if (tag.color) color = tag.color

    return (
      <span
        key={tag.id}
        className="inline-block text-sm px-3 py-1 rounded-full outline-black outline-2 font-outlined"
        style={{background:color,
          color:"white",
          textShadow: "black 0.2em 0.2em 0.4em"
        }}
      >
      {tag.label}
      </span>
    )

}