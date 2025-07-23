import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

export const createBoard = async (title) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const boardsRef = collection(db, "users", user.uid, "boards");
  const docRef = await addDoc(boardsRef, {
    title,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};
