import React, {useMemo, useState} from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "../../shared/Chip";
import {Tag} from "@/types/tag";

export function TagSelector({initialTagIDs, allTags, onTagChange}: {
  initialTagIDs: number[];
  allTags: Tag[];
  onTagChange: (tagIDs: number[]) => void;
}) {
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

  return (
    <>
      <div className="flex flex-wrap gap-2">
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
    </>
  );
}
