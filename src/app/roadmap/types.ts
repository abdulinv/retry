type Topics = {
  title:string,
  note:string,
  order:number
}[]
export type Colors = "primary" | "warning" | "success" | "info" | "error";
export interface RoadMaps {
  [key: string]: string | undefined | number | Topics | Colors;
  stack: string;
  title: string;
  topics: Topics;
  color: Colors;
}
export interface RoadMapDoc {
  id: string;
  doc: RoadMaps;
}
export interface RoadMapProps {
  RoadMaps: RoadMapDoc[];
}
