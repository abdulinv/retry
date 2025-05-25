import { Colors, RoadMaps as RoadMapType, Topic } from '@/app/roadmap/types';
import { updateTask } from '../../../lib/fetch';

export const RoadMaps = [
  {
    id: 1,
    stack: 'JavaScript',
    data: [
      {
        section: '',
        topics: [],
      },
    ],
  },

  {
    id: 1,
    stack: 'React',
    data: [
      {
        section: '',
        topics: [],
      },
    ],
  },

  {
    id: 1,
    stack: 'TypeScript',
    data: [
      {
        section: 'Basics of TS and Basic Types',
        topics: [
          'TS  Basics',
          'TS basic types',
          'TS special types',
          'objects in TS',
          'arrays and tuples in TS',
          'enums in TS',
          'literal types',
          'union types',
        ],
      },

      {
        section: 'TS installation & config',
        topics: [],
      },

      {
        section: 'Generics',
        topics: [
          'What i generic',
          'Genrtic functions',
          'Generic Types',
          'Genric classes',
          'Constraints in Generic',
          'overloading',
          'Mapped types',
          'Conditional Types',
        ],
      },

      {
        section: 'Classes and intefaces',
        topics: ['Classes'],
      },
      {
        section: 'Utility Types',
        topics: ['Utility Types'],
      },

      {
        section: 'Decorators',
        topics: ['Utility Types'],
      },

      {
        section: 'Modules and NameSpace',
        topics: ['Definition file'],
      },

      {
        section: 'React Typescript',
        topics: ['context API', 'Redux'],
      },
      {
        section: 'Express Js Typescript',
        topics: ['API creation'],
      },

      {
        section: 'Advanced Types',
        topics: [],
      },
    ],
  },
];
export async function UpdateRoadMap(
  item: RoadMapType,
  id: string,
  index: number | null,
  action: {
    prop: string;
    value: string;
  }
) {
  let itemTobeUpdated: Topic= {
    title: `add - ${new Date().getMilliseconds().toString().slice(-4)}`,
    note: 'add note here',
    order: 1,
    link: '',
    date: null,
  };
  console.log("index check",index)
  if (index || index === 0) itemTobeUpdated = item.topics[index];
  else index = item.topics.length;
  
  const updatedData = {
    ...itemTobeUpdated,
  };
  

  switch (action.prop) {
    case 'link':
      updatedData.link = action.value;
      break;
    case 'note':
      updatedData.note = action.value;
      break;
    case 'title':
      updatedData.title = action.value;
      break;
    case 'sortAsc':
      updatedData.order = (updatedData?.order || 0) + Number(action.value);
      break;
    case 'sortDsc':
      updatedData.order = (updatedData?.order || 0) - Number(action.value);
      break;
    case 'date':
      updatedData.date = action.value;
      break;
  }
  console.log("updation",id,updatedData,index)
  await updateTask(`rm-${item.stack}`, id, {
    ...item,
    topics: [
      ...item.topics.slice(0, index),
      {...updatedData},
      ...item.topics.slice(index + 1,),
    ],
  });
}

export async function UpdateRoadMapCard(
  item: RoadMapType,
  id: string,
  action: {
    prop: string;
    value: string;
  }
) {
  switch (action.prop) {
    case 'done':
      updateTask(`rm-${item.stack}`, id, {
        ...item,
        color: action.value as Colors,
      });
      break;
    case 'prog':
      updateTask(`rm-${item.stack}`, id, {
        ...item,
        color: action.value as Colors,
      });
      break;
    case 'pend':
      updateTask(`rm-${item.stack}`, id, {
        ...item,
        color: action.value as Colors,
      });
      break;
    case 'reset':
      updateTask(`rm-${item.stack}`, id, {
        ...item,
        color: action.value as Colors,
      });
      break;
    case 'title':
      updateTask(`rm-${item.stack}`, id, {
        ...item,
        title: action.value,
      });
      break;
  }
}

export function findIndex(item: RoadMapType, topic: Topic) {
  return item.topics.findIndex((item) => item.title === topic.title);
}

export async function deleteTopic(item:RoadMapType,id:string,index:number){
  await updateTask(`rm-${item.stack}`, id, {
    ...item,
    topics: [
      ...item.topics.slice(0, index),
      ...item.topics.slice(index + 1,),
    ],
  });
}