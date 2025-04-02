import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";

export async function getItems(userId) {
  const items = [];
  try {
    const itemsRef = collection(doc(db, "users", userId), "items");
    const snapshot = await getDocs(itemsRef);

    snapshot.forEach((docSnap) => {
      items.push({
        id: docSnap.id,
        ...docSnap.data(),
      });
    });

    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

export async function addItem(userId, item) {
  try {
    const itemsRef = collection(doc(db, "users", userId), "items");
    const docRef = await addDoc(itemsRef, item);
    return docRef.id;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}