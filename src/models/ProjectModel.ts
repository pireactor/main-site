import { EPhases } from "../enums/EPhases";
import { ETags } from "../enums/ETags";

export interface ProjectModel {
  slug: string;
  title: string;
  developers: number;
  months: number;
  tags: TTags[];
  desc: string;
  phases: Array<{name: string, period: string, icon: EPhases}>;
  bullets: string[];
  result: IResult[];
  img: string;
  content: any;
}

export type TTags = ETags.des | ETags.dev | ETags.srategy;

export interface IResult {
  name: string;
  value: number;
  format: TFormat;
} 
export type TFormat = "%" | "inc" | null;
