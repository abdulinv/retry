export interface Time {
  hours: number;
  minuits: number;
}

export interface TimeInfo {
  [key: string]: string | number | Date | Time;
  date: string;
  day: string;
  week: string;
  time: Time;
}

export interface TimeDocs {
  id: string;
  doc: TimeInfo;
}
