import { ETags } from "../enums/ETags";

export interface ServicesModel {
  id: number;
  slug: string;
  title: ETags;
  desc: string;
  values: Array<{ name: string, value: number }>
  content: any;
  articles: Array<{title: string, img: string, desc: string}>
}