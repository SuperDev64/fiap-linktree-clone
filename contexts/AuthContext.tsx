"use client";

import { firebaseAuth } from "@/config/firebase";
import {
  getUserProfileSlug,
  saveUserProfile,
  updateUserSlug,
} from "@/services/profile";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  profileSlug: string | null;
  setProfileSlug: (slug: string) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profileSlug, setProfileSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (currentUser) => {
        setUser(currentUser);

        if (currentUser) {
          try {
            const slug = await getUserProfileSlug(currentUser.uid);
            setProfileSlug(slug);
          } catch (error) {
            updateUserSlug(currentUser.uid, `user-${currentUser.uid}`);
            const slug = await getUserProfileSlug(currentUser.uid);
            setProfileSlug(slug);
            saveUserProfile(slug, {
              userId: currentUser.uid,
              githubUsername: "",
              showFollowers: true,
              showRepoCount: true,
              socialLinks: {
                x: "",
                linkedin: "",
                youtube: "",
                instagram: "",
              },
              customLinks: [],
            });
          }
        } else {
          setProfileSlug(null);
        }
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, profileSlug, setProfileSlug, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth precisa ser usado com o AuthProvider");
  }

  return context;
};
