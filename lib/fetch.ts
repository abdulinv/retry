"use server";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { Tasks } from "@/models/checklist/daily/daily";
import { revalidatePath } from "next/cache";
import { RoadMaps } from "@/app/roadmap/types";
import {
  Question,
  QuestionDoc,
  TestListDoc,
  TestListItem,
} from "@/app/test/[slug]/types";
import { Jobs, JobsDocs } from "@/app/JDAnalyser/types";

export async function getTasks() {
  const data: Tasks[] = [];
  const collections = ["manageDaily", "manageWeekly", "manageMonthly"];
  for (const col of collections) {
    const querySnapshot = await getDocs(collection(db, col));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => `, doc.data());
      data.push(doc.data() as Tasks);
    });
  }
  return data;
}

export async function updateTask(
  collection: string,
  taskId: string,
  updatedData: Tasks | RoadMaps | Question | TestListItem | Jobs
) {
  const taskRef = doc(db, collection, taskId);
  await updateDoc(taskRef, updatedData);
  console.log("Task updated!");
  revalidatePath("manage/Daily");
}

export async function addDocument(
  collectionId: string,
  doc: RoadMaps | Question | TestListItem | Jobs
) {
  try {
    const docRef = await addDoc(collection(db, collectionId), doc);
    console.log("Document written with ID: ", docRef.id);
    revalidatePath("manage/Daily");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getRoadMaps() {
  const rmCollection = ["rm-TypeScript", "rm-React"];
  const data: { id: string; doc: RoadMaps }[] = [];

  for (const collectionName of rmCollection) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => `, doc.data());
      data.push({ id: doc.id, doc: doc.data() as RoadMaps });
    });
  }

  return data;
}

// export async function createNewStack(collectionId:string){
//   try {
//     const docRef = await addDoc(collection(db, collectionId), doc);
//     console.log("Document written with ID: ", docRef.id);
//     revalidatePath("manage/Daily")
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

export async function getTest(collectionName: string) {
  const data: QuestionDoc[] = [];
  console.log("collection", collectionName);
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data());
    data.push({ id: doc.id, doc: doc.data() as Question });
  });

  return data;
}

export async function getTestList(collectionName: string) {
  const data: TestListDoc[] = [];
  console.log("collection", collectionName);
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data());
    data.push({ id: doc.id, doc: doc.data() as TestListItem });
  });

  return data;
}

export async function getJobs(collectionName: string) {
  const data: JobsDocs[] = [];
  console.log("collection", collectionName);
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data());
    data.push({ id: doc.id, doc: doc.data() as Jobs });
  });

  return data;
}
