import { firebaseAuth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password,
    );

    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
