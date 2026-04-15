"use client";

import React, { useMemo, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Popper, { PopperProps } from "@mui/material/Popper";
import TextField from "@mui/material/TextField";
import type { Tag } from "@/types/tag";
import Chip from "@/components/shared/Chip";

export interface TagEditorProps {
  title?: string;
  selectedTags: Tag[];
  possibleTags: Tag[];
  onToggleTag: (id: number) => void;
}

export function TagEditor({
  title,
  selectedTags,
  possibleTags,
  onToggleTag,
}: TagEditorProps) {
  const [inputValue, setInputValue] = useState("");
  const selectedIds = useMemo(() => selectedTags.map((tag) => tag.id), [selectedTags]);

  const options = useMemo(
    () => possibleTags.map((tag) => ({ value: tag.id, label: tag.label })),
    [possibleTags]
  );

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <Card>
          {title ? (<CardHeader
            title={title}
            style={{
              background: "linear-gradient(135deg, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 1))",
              color: "#FFFFFF",
              fontSize: "1.5rem",
              textShadow: "0px 3px 6px rgba(0, 0, 0, 0.5)",
            }}
          />) : ""}
          <CardContent>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Chip
                  key={tag.id}
                  tag={tag}
                  removeCallback={() => onToggleTag(tag.id)}
                />
              ))}
            </div>
            <Grid container spacing={3}>
              <Grid sx={{ marginTop: 3, width: "100%" }}>
                <Autocomplete
                  key={selectedIds.join("-")}
                  options={options}
                  filterOptions={(availableOptions, state) =>
                    availableOptions
                      .filter(
                        (option) =>
                          !selectedIds.includes(option.value) &&
                          option.label.toLowerCase().includes(state.inputValue.toLowerCase())
                      )
                      .slice(0, 3)
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
                      onToggleTag(newValue.value);
                    }
                    setInputValue("");
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
  );
}

const CustomPopper = (props: PopperProps) => {
  return (
    <Popper
      {...props}
      modifiers={[
        {
          name: "preventOverflow",
          options: { boundary: "viewport" },
        },
        {
          name: "offset",
          options: { offset: [0, -10] },
        },
      ]}
      placement="top-start"
    />
  );
};
