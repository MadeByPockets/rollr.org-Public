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
  bannerColor?: string;
  links: EventLink[];
  eventTag: Tag;
  active: boolean;
  timezone?: string;
  startingDate?: Date | string;
  endingDate?: Date | string;
}

export type EventEditContextValue = {
  isOwner: boolean;
  updateEvent: (patch: Partial<EventDB>) => void;
  updateImages?: () => void;
};

export type EventDB = EventDetails;
export type EventResult = EventDetails;
