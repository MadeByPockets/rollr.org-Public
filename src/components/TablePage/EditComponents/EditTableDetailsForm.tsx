import React, {useMemo, useState} from "react";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import CasinoIcon from "@mui/icons-material/Casino";
import {getRandomTagline, getRandomTitle} from "@/components/shared/NameGenerator";
import Chip from "../../shared/Chip";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import {Tag} from "@/types/tag";

export function EditTableDetailsForm({initialTitle, initialSubtitle, onTitleChange, onSubtitleChange, initialTagIDs, allTags, onTagChange}: {
  initialTitle: string;
  initialSubtitle: string;
  onTitleChange: (title: string) => void;
  onSubtitleChange: (subtitle: string) => void;
  onTagChange: (tagIDs: number[]) => void;
  initialTagIDs: number[],
  allTags: Tag[],
}) {
  const [title, setTitle] = useState(initialTitle);
  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const [tagList, updateTagList] = useState(initialTagIDs);
  const [inputValue, setInputValue] = useState("");

  const toggleTag = (id: number) => tagList.find(t => t === id) ? removeTag(id) : addTag(id);
  const addTag = (id: number) => {
    const newList = [...tagList, id];
    updateTagList(newList);
    onTagChange(newList);
  };
  const removeTag = (id: number) => {
    const newList = tagList.filter(t => t !== id);
    updateTagList(newList);
    onTagChange(newList);
  }
  const selectedTags = useMemo(() => allTags.filter(tag => tagList.includes(tag.id)), [allTags, tagList]);
  const options = useMemo(
      () => allTags.map((tag) => ({ value: tag.id, label: tag.label })),
      [allTags]
  );

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    onTitleChange(newTitle);
  };

  const handleSubtitleChange = (newSubtitle: string) => {
    setSubtitle(newSubtitle);
    onSubtitleChange(newSubtitle);
  };

  return (
    <>
      <Box className={"flex flex-col gap-4"}>
        <Box className={"inline-flex"}>
          <TextField
              sx={{minWidth: "400px"}}
              label="Title"
              onChange={(e) => handleTitleChange(e.target.value)}
              variant="filled"
              value={title}
          />
          <CasinoIcon sx={{cursor: "pointer", alignSelf: "center", ml: 1}}
                      onClick={() => handleTitleChange(getRandomTitle())}/>
        </Box>
        <Box className={"inline-flex min-w-96"}>
          <TextField
              sx={{minWidth: "400px"}}
              label="Short Description or Tagline"
              onChange={(e) => handleSubtitleChange(e.target.value)}
              variant="filled"
              value={subtitle}
          />
          <CasinoIcon sx={{cursor: "pointer", alignSelf: "center", ml: 1}}
                      onClick={() => handleSubtitleChange(getRandomTagline())}/>
        </Box>
      </Box>
      <Box>

        <div className="mt-8 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
              <Chip
                  key={tag.id}
                  tag={tag}
                  removeCallback={() => toggleTag(tag.id)}
              />
          ))}
        </div>
        <Grid container spacing={3}>
          <Grid sx={{ marginTop: 3, width: "100%", minWidth: "550px" }}>
            <Autocomplete
                key={tagList.join("-")}
                options={options}
                filterOptions={(availableOptions, state) =>
                    availableOptions
                        .filter(
                            (option) =>
                                !tagList.includes(option.value) &&
                                option.label.toLowerCase().includes(state.inputValue.toLowerCase())
                        )
                }
                value={null}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  if (event && event.type === "change") {
                    setInputValue(newInputValue);
                  }
                }}
                onChange={(event, newValue) => {
                  if (newValue) {
                    toggleTag(newValue.value);
                  }
                  setInputValue("");
                }}
                renderInput={(params) => <TextField {...params} label="Select Tags" />}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}