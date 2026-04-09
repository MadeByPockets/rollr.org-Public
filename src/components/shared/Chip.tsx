import React from "react";
import {Tag} from "@/types/tag";

export default function Chip({ tag, removeCallback }: { tag: Tag, removeCallback?: (tagId: number) => void }) {
  const color = tag.color ?? "#bfbcbb";
  return (
      <>
      <span
          key={tag.id}
          className="inline-block text-sm px-3 py-1 rounded-full border-2 font-outlined text-white m-0.5 font-stretch-105% font-sans"
          style={{
            borderColor: `color-mix(in srgb, ${color}, black 50%)`,
            background: `linear-gradient(160deg, color-mix(in srgb, ${color}, white 10%) 0%, color-mix(in srgb, ${color}, black 60%) 100%)`,
            textShadow: "black 1.5px 1px 1.5px",
            filter: `drop-shadow(2px 2px 1.5px color-mix(in srgb, ${color}, black 80%))`
          }}
      >
          {tag.label}
          {removeCallback && (
              <button
                  type="button"
                  onClick={() => removeCallback(tag.id)}
                  className="ml-2 text-white hover:text-red-700 focus:outline-none pl-0.5 pr-1 cursor-pointer hover:bg-white rounded-full"
                  style={{
                    textShadow: "black 1px 1px 1px"
                  }}
              >
                X
              </button>
          )}
    </span>
    </>
  )

}