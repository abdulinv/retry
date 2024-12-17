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
import { Question, QuestionDoc } from "@/app/test/[slug]/types";

export async function getTasks() {
  const data: Tasks[] = [];
  let querySnapshot = await getDocs(collection(db, "manageDaily"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data());
    data.push(doc.data() as Tasks);
  });

  querySnapshot = await getDocs(collection(db, "manageWeekly"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data());
    data.push(doc.data() as Tasks);
  });

  return data;
}

export async function updateTask(
  collection: string,
  taskId: string,
  updatedData: Tasks | RoadMaps | Question
) {
  const taskRef = doc(db, collection, taskId);
  await updateDoc(taskRef, updatedData);
  console.log("Task updated!");
  revalidatePath("manage/Daily");
}

export async function addDocument(
  collectionId: string,
  doc: RoadMaps | Question
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
