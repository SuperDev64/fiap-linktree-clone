import { firebaseDb } from "@/config/firebase";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export const getUserProfileSlug = async (userId: string): Promise<string> => {
  try {
    const profileDoc = await getDoc(doc(firebaseDb, "users", userId));

    if (profileDoc.exists()) {
      return profileDoc.data().profileSlug;
    }

    throw new Error("Perfil do usuário não encontrado");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const saveUserProfile = async (slug: string, profileData: any) => {
  try {
    await updateDoc(doc(firebaseDb, "profiles", slug), {
      ...profileData,
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loadUserProfile = async (slug: string) => {
  try {
    const profileDoc = await getDoc(doc(firebaseDb, "profiles", slug));

    if (!profileDoc.exists()) {
      return null;
    }

    const data = profileDoc.data();

    return {
      userId: data.userId,
      githubUsername: data.githubUsername || "",
      showFollowers: data.showFollowers ?? true,
      showRepoCount: data.showRepoCount ?? true,
      socialLinks: data.socialLinks || {
        x: "",
        linkedin: "",
        youtube: "",
        instagram: "",
      },
      customLinks: data.customLinks || [],
    };
  } catch (error) {
    console.log("Erro ao carregar perfil:", error);
  }
};

export const checkSlugAvailable = async (slug: string): Promise<boolean> => {
  try {
    const profileDoc = await getDoc(doc(firebaseDb, "profiles", slug));

    if (!profileDoc.exists()) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Erro ao verificar slug:", error);
    return false;
  }
};

export const updateUserSlug = async (
  userId: string,
  newSlug: string,
  oldSlug = "",
) => {
  try {
    if (!checkSlugAvailable(newSlug)) {
      return false;
    }

    const oldProfileDoc = await getDoc(doc(firebaseDb, "profiles", oldSlug));

    if (!oldProfileDoc.exists()) {
      throw new Error("Perfil antigo não encontrado");
    }

    const profileData = oldProfileDoc.data();

    await updateDoc(doc(firebaseDb, "profiles", newSlug), {
      ...profileData,
      updatedAt: serverTimestamp(),
    });

    await updateDoc(doc(firebaseDb, "users", userId), {
      profileSlug: newSlug,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Erro ao atualizar slug do usuário:", error);
    return false;
  }
};
