import React, {useState} from "react";
import {Box, Tooltip} from "@mui/material";
import TextField from "@mui/material/TextField";
import CasinoIcon from "@mui/icons-material/Casino";
import {getRandomTagline, getRandomTitle} from "@/components/shared/NameGenerator";
import {Tag} from "@/types/tag";
import {TagSelector} from "./TagSelector";

export function EditTableDetailsForm({initialTitle, initialSubtitle, onTitleChange, onSubtitleChange, allowEditingTitles, initialTagIDs, allTags, onTagChange}: {
  initialTitle: string;
  initialSubtitle: string;
  onTitleChange: (title: string) => void;
  onSubtitleChange: (subtitle: string) => void;
  allowEditingTitles?: boolean;
  onTagChange: (tagIDs: number[]) => void;
  initialTagIDs: number[],
  allTags: Tag[],
}) {
  const [title, setTitle] = useState(initialTitle);
  const [subtitle, setSubtitle] = useState(initialSubtitle);
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
      {(allowEditingTitles && <Box className={"flex flex-col gap-4 mb-8"}>
        <Box className={"inline-flex"}>
          <TextField
              sx={{minWidth: "400px"}}
              label="Title"
              onChange={(e) => handleTitleChange(e.target.value)}
              variant="filled"
              value={title}
          />
          <Tooltip title="Randomize">
            <CasinoIcon sx={{cursor: "pointer", alignSelf: "center", ml: 1}}
                    onClick={() => handleTitleChange(getRandomTitle())}/>
          </Tooltip>
        </Box>
        <Box className={"inline-flex min-w-96"}>
          <TextField
              sx={{minWidth: "400px"}}
              label="Short Description or Tagline"
              onChange={(e) => handleSubtitleChange(e.target.value)}
              variant="filled"
              value={subtitle}
          />
          <Tooltip title="Randomize">
            <CasinoIcon sx={{cursor: "pointer", alignSelf: "center", ml: 1}}
                    onClick={() => handleSubtitleChange(getRandomTagline())}/>
          </Tooltip>
        </Box>
      </Box>)}

      <TagSelector initialTagIDs={initialTagIDs} allTags={allTags} onTagChange={onTagChange} />
    </>
  );
}