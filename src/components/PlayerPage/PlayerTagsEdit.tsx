"use client";

import React, { useMemo, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import Popper, { PopperProps } from "@mui/material/Popper";
import { Tag } from "@/types/tag";
import Chip from "@/components/shared/Chip";

export interface PlayerTagsEditProps {
  selectedTags: Tag[];
  possibleTags: Tag[];
  onToggleTag: (id: number) => void;
}

const PlayerTagsEdit: React.FC<PlayerTagsEditProps> = ({
  selectedTags = [],
  possibleTags = [],
  onToggleTag,
}) => {
  const [inputValue, setInputValue] = useState("");
  const selectedIds = useMemo(() => selectedTags.map((tag) => tag.id), [selectedTags]);

  const options = useMemo(
    () => possibleTags.map((tag) => ({ value: tag.id, label: tag.label, alternate_title: tag.alternate_title })),
    [possibleTags]
  );

  return (
    <Card sx={{
        margin: "1rem",
        borderRadius: "12px",
        boxShadow: "0px 8px 15px rgba(25, 118, 210, 0.3)",
        overflow: "hidden"
    }}>
      <CardHeader 
        title="Player Tags" 
        sx={{
            background: "linear-gradient(135deg, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 1))",
            color: "#FFFFFF",
            fontSize: "1.5rem",
            textShadow: "0px 3px 6px rgba(0, 0, 0, 0.5)",
            '& .MuiCardHeader-title': {
                fontWeight: "bold",
                fontSize: "1.5rem",
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
            }
        }}
      />
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTags.map((tag) => (
            <Chip
              key={tag.id}
              tag={tag}
              removeCallback={() => onToggleTag(tag.id)}
            />
          ))}
        </div>
        <Autocomplete
          key={selectedIds.join("-")}
          options={options}
          filterOptions={(availableOptions, state) => {
            const query = state.inputValue.toLowerCase();
            return availableOptions
              .filter(
                (option) =>
                  !selectedIds.includes(option.value) &&
                  (option.label.toLowerCase().includes(query) ||
                    option.alternate_title?.some((title) => title.toLowerCase().includes(query)))
              )
              .slice(0, 5);
          }}
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
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Tags"
              variant="outlined"
            />
          )}
        />
      </CardContent>
    </Card>
  );
};

const CustomPopper = (props: PopperProps) => {
  return (
    <Popper
      {...props}
      modifiers={[
        {
          name: "preventOverflow",
          options: {
            boundary: "viewport",
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, -10],
          },
        },
      ]}
      placement="top-start"
    />
  );
};

export default PlayerTagsEdit;
