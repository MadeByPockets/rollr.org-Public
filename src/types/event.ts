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
  bannerUrl: EventBannerImage;
  links: EventLink[];
  eventTag: Tag;
  owner: number;
  active: boolean;
  startingDate?: Date | string;
  endingDate?: Date | string;
}

export type EventDB = EventDetails;
export type EventResult = EventDetails;
