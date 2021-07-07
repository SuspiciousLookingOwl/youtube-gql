import { Thumbnails } from "youtubei";

export const mapper = (thumbnails: Thumbnails): string[] => thumbnails.map((t) => t.url);
