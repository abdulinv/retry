export type Topic = {
  title:string,
  note:string,
  order:number,
  link:string,
  date:string | null,
  revised:{
    [indx:string]:boolean
    p1:boolean,
    p2:boolean,
    p3:boolean,
    p4:boolean,
    p5:boolean,
    p6:boolean
  }
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
