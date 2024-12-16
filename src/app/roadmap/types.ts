type Topics = string[];
export interface RoadMaps {
[key:string]:string |undefined |number | Topics
  stack: string;
  title: string;
  topics: Topics;
}
export interface RoadMapDoc{
    id:string,
    doc:RoadMaps
}
export interface RoadMapProps {
  RoadMaps:RoadMapDoc[];
}
