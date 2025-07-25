import {TagsFormat} from "@/mocks/Tags";
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Popper, {PopperProps} from "@mui/material/Popper";
import React, {useEffect} from "react";

export default function PlayerTagsEdit(props: {
  PlayerTags: TagsFormat[],
  possibleTags: TagsFormat[],
  updatePlayerTags: (id:number) => void,
}) {
  const [inputValue, setInputValue] = React.useState('');
  const tags:number[] = props.PlayerTags.map((tag) => tag.id)


  const updateCurrentTags = (id:number) => {
    console.log(id)
    props.updatePlayerTags(id)
  }

  useEffect(() => {
  }, [props.PlayerTags]);


  const generateLabel = (tag: TagsFormat) => {

    let color = "#bfbcbb"
    if (tag.color) color = tag.color

    return (
      <span
        key={tag.id}
        className="inline-block text-sm px-3 py-1 rounded-full outline-black outline-2 font-outlined"
        style={{
          background: color,
          color: "white",
          textShadow: "black 0.2em 0.2em 0.4em"
        }}
      >
      {tag.label}

        <button type="button" onClick={() => updateCurrentTags(tag.id)}
                className="ml-2 text-red-500 bg-white bg-opacity-50 rounded-full outline-black outline-2 font-outlined">
        &times;
      </button>
      </span>
    )

  }

  const renderLabels = () => {
    const tagValues:TagsFormat[] = []
    props.possibleTags.map((tag) => {
      if (tags.includes(tag.id)) {
        tagValues.push( {id:tag.id, label:tag.label, color:tag.color, image:tag.image} as TagsFormat);
      }
    })
    return (
      <div className="mt-2 flex flex-wrap gap-2">
        {tagValues.map((tag) => generateLabel(tag))}
      </div>
    )
  }

  const tagValues:{value:number, label:string}[] = props.possibleTags.map((tag) =>
  {return {value:tag.id, label:tag.label}});

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
            {renderLabels()}
            <Grid container spacing={3}>
              <Grid sx={{marginTop:3, width: "100%"}}>
                <Autocomplete
                  key={props.PlayerTags.join('-')}
                  options={tagValues}
                  filterOptions={(options, state) => {
                    return options
                      .filter(
                        (option) =>
                          // Exclude options already in currentTags
                          !tags.includes(option.value) &&
                          // Filter based on user input
                          option.label.toLowerCase().includes(state.inputValue.toLowerCase())
                      )
                      .slice(0, 3); // Show up to 3 results
                  }}
                  value={null} // Clearing the selected value immediately
                  inputValue={inputValue} // Bind the input value to state
                  onInputChange={(event, newInputValue) => {
                    // Check if this is clearing after selection
                    if (event && event.type === 'change') {
                      setInputValue(newInputValue); // Keep input up-to-date
                    }
                  }}

                  onChange={(event, newValue) => {
                    if (newValue) {
                      updateCurrentTags(newValue.value); // Update selected tags
                    }
                    // Clear the text box after selection
                    setInputValue('');
                  }}
                  slots={{ popper: CustomPopper }}
                  renderInput={(params) => <TextField {...params} label="Select Tags" />}
                />




              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

  )
}

const CustomPopper = (props: PopperProps) => {
  return (
    <Popper
      {...props}
      modifiers={[
        {
          name: "preventOverflow",
          options: {
            boundary: "viewport", // Prevent the Popper from going outside the viewport
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, -10], // Set negative vertical offset (adjust value as needed)
          },
        },
      ]}
      placement="top-start" // Position the dropdown above the input field
    />
  );
};

