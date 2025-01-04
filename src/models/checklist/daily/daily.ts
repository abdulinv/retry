export interface Duration {
  hh:number;
  mm:number
 }

interface Task {
  text: string;
  status: boolean;
  duration?:Duration
}


export interface Tasks {
  [key:string]:string |undefined |number |Task[] | Duration,
  id?: number;
  category?:string;
  title: string;
  tasks: Task[];
  order:number;

}


export const daily = [
  {
    id: 1,
    title: "Day1",
    tasks: [
      {
        text: "Sample1",
        status: "done",
      },
      {
        text: "Sample2",
        status: "done",
      },
      {
        text: "Sample3",
        status: "done",
      },
      {
        text: "Sample1",
        status: "done",
      },
      {
        text: "Sample2",
        status: "done",
      },
      {
        text: "Sample3",
        status: "done",
      },
      {
        text: "Sample1",
        status: "done",
      },
      {
        text: "Sample2",
        status: "done",
      },
      {
        text: "Sample3",
        status: "done",
      },
    ],
  },

  {
    id: 2,
    title: "Day2",
    tasks: [
      {
        text: "Sample2",
        status: "done",
      },
    ],
  },

  {
    id: 3,
    title: "Day3",
    tasks: [
      {
        text: "Sample3",
        status: "done",
      },
    ],
  },

  {
    id: 4,
    title: "Day4",
    tasks: [
      {
        text: "",
        status: "done",
      },
    ],
  },

  {
    id: 5,
    title: "Day5",
    tasks: [
      {
        text: "",
        status: "done",
      },
    ],
  },

  {
    id: 6,
    title: "Day6",
    tasks: [
      {
        text: "",
        status: "done",
      },
    ],
  },
];

export const weekly = [
  {
    id: 1,
    title: "Week1",
    tasks: [
      {
        text: "Sample1",
        status: "done",
      },
      {
        text: "Sample2",
        status: "done",
      },
      {
        text: "Sample3",
        status: "done",
      },
    ],
  },

  {
    id: 2,
    title: "Week2",
    tasks: [
      {
        text: "Sample2",
        status: "done",
      },
    ],
  },

  {
    id: 3,
    title: "Week3",
    tasks: [
      {
        text: "Sample3",
        status: "done",
      },
    ],
  },
];

export const monthly = [
  {
    id: 1,
    title: "Week1",
    tasks: [
      {
        text: "Sample1",
        status: "done",
      },
      {
        text: "Sample2",
        status: "done",
      },
      {
        text: "Sample3",
        status: "done",
      },
    ],
  },

  {
    id: 2,
    title: "Week2",
    tasks: [
      {
        text: "Sample2",
        status: "done",
      },
    ],
  },

  {
    id: 3,
    title: "Week3",
    tasks: [
      {
        text: "Sample3",
        status: "done",
      },
    ],
  },
];