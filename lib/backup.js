import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("./firebase.json", import.meta.url))
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function backupAllCollections() {
  const collections = await db.listCollections();
  const backup = {};

  for (const col of collections) {
    const snapshot = await col.get();
    backup[col.id] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  fs.writeFileSync("backup.json", JSON.stringify(backup, null, 2));
  console.log("✅ Backup saved successfully!");
}

backupAllCollections();
