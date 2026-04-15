import {useState} from "react";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import CasinoIcon from "@mui/icons-material/Casino";
import {getRandomTagline, getRandomTitle} from "@/components/shared/NameGenerator";

export function EditTitleForm({initialTitle, initialSubtitle, onTitleChange, onSubtitleChange}: {
  initialTitle: string;
  initialSubtitle: string;
  onTitleChange: (title: string) => void;
  onSubtitleChange: (subtitle: string) => void;
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
              label="Subtitle or Tagline"
              onChange={(e) => handleSubtitleChange(e.target.value)}
              variant="filled"
              value={subtitle}
          />
          <CasinoIcon sx={{cursor: "pointer", alignSelf: "center", ml: 1}}
                      onClick={() => handleSubtitleChange(getRandomTagline())}/>
        </Box>
      </Box>
  );
}