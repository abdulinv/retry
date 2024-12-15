"use server"

import { collection, getDocs, updateDoc, doc} from "firebase/firestore";
import { db } from "@/firebase/config";
import { Tasks } from "@/models/checklist/daily/daily";
import { revalidatePath } from "next/cache";

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
  updatedData:Tasks
) {
  const taskRef = doc(db, collection, taskId);
  await updateDoc(taskRef, updatedData);
  console.log("Task updated!");
  revalidatePath("manage/Daily")
}

// export async function addTask(collectionId:string,doc:any) {
//   try {
//     const docRef = await addDoc(collection(db, collectionId), doc);
//     console.log("Document written with ID: ", docRef.id);
//     revalidatePath("manage/Daily")
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
