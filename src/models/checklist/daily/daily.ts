
interface Task{
    text:string,
    status:string
}

export interface Tasks{
    id:number,
    title:string,
    tasks:Task[]
}
type DataType = Record<string,Tasks[]>

export const data:DataType = {
  Daily: [
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
      title:"Day2",
      tasks: [
        {
          text: "Sample2",
          status: "done",
        },
      ],
    },

    {
      id: 3,
      title:"Day3",
      tasks: [
        {
          text: "Sample3",
          status: "done",
        },
      ],
    },

    {
      id: 4,
      title:"Day4",
      tasks: [
        {
          text: "",
          status: "done",
        },
      ],
    },

    {
      id: 5,
      title:"Day5",
      tasks: [
        {
          text: "",
          status: "done",
        },
      ],
    },

    {
      id: 6,
      title:"Day6",
      tasks: [
        {
          text: "",
          status: "done",
        },
      ],
    },
  ],
  Weekly: [
    {
      id: 1,
     title:"Week1",
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
     title:"Week2",
      tasks: [
        {
          text: "Sample2",
          status: "done",
        },
      ],
    },

    {
      id: 3,
      title:"Week3",
      tasks: [
        {
          text: "Sample3",
          status: "done",
        },
      ],
    },

   
  ],
  Monthly:[
    {
        id: 1,
        title: "December",
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
  ]
};
