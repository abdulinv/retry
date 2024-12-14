import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Tasks } from "@/models/checklist/daily/daily";

export async function getTasks() {
  const querySnapshot = await getDocs(collection(db, "manage"));
  const data:Record<string,Tasks[]> = {};
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data());
    data[doc.id] =  doc.data()[doc.id] ;
  });
  return data;
}
