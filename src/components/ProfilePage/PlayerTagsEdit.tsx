"use client";

import React from "react";
import type { Tag } from "@/types";
import TagEditor from "@/components/shared/TagEditor";

export default function PlayerTagsEdit(props: {
  PlayerTags: Tag[];
  possibleTags: Tag[];
  updatePlayerTags: (id:number) => void;
}) {
  return (
    <TagEditor
      title="Player Tags"
      selectedTags={props.PlayerTags}
      possibleTags={props.possibleTags}
      onToggleTag={props.updatePlayerTags}
    />
  );
}
