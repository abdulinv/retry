export type Topic = {
  title:string,
  note:string,
  order:number,
  link:string
}
export type Colors = "primary" | "warning" | "success" | "info" | "error";
export interface RoadMaps {
  [key: string]: string | undefined | number | Topic[] | Colors;
  stack: string;
  title: string;
  topics: Topic[];
  color: Colors;
}
export interface RoadMapDoc {
  id: string;
  doc: RoadMaps;
}
export interface RoadMapProps {
  RoadMaps: RoadMapDoc[];
}
