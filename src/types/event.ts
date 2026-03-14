import type { Tag } from "./tag";

export interface EventLink {
  url: string;
  text: string;
}

export interface EventBannerImage {
  desktop: string;
  mobile?: string;
}

export interface EventDetails {
  id: number;
  title: string;
  description: string;
  date: string;
  location?: string;
  organizer?: string;
  tags?: number[];
  imageUrl?: string;
  eventTag: Tag;
  bannerUrl: EventBannerImage;
  links: EventLink[];
  startingDate?: Date;
  endingDate?: Date;
}

export type EventDB = EventDetails;
export type EventResult = Pick<EventDetails, "id" | "title" | "description" | "date" | "location" | "organizer" | "tags" | "imageUrl">;
