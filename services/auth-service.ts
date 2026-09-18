import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";

export async function loginAdmin(
  email: string,
  password: string,
): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}
