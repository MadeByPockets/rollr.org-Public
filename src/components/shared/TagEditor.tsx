"use client";

import React, { useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import type { Tag } from "@/types/tag";
import {TagSelector} from "@/components/TablePage/EditComponents/TagSelector";

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
  const selectedIds = useMemo(() => selectedTags.map((tag) => tag.id), [selectedTags]);

  const onTagChange = (newSelectedIds: number[]) => {
    const addedTags = newSelectedIds.filter((id) => !selectedIds.includes(id));
    const removedTags = selectedIds.filter((id) => !newSelectedIds.includes(id));

    addedTags.forEach((id) => onToggleTag(id));
    removedTags.forEach((id) => onToggleTag(id));
  }

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
            <TagSelector initialTagIDs={selectedIds} allTags={possibleTags} onTagChange={onTagChange} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
