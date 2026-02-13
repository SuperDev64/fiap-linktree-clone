"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { SocialLinks, CustomLink, GithubProfile } from "@/types/types";
import { useAuth } from "./AuthContext";
import { loadUserProfile, saveUserProfile } from "@/services/profile";

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

type ProfileContextType = {
  githubUsername: string;
  showFollowers: boolean;
  showRepoCount: boolean;
  socialLinks: SocialLinks;
  customLinks: CustomLink[];
  githubProfile: GithubProfile | null;
  setGithubUsername: (username: string) => void;
  setShowFollowers: (show: boolean) => void;
  setShowRepoCount: (show: boolean) => void;
  handleSocialChange: (field: keyof SocialLinks, value: string) => void;
  handleCustomLinkChange: (
    id: string,
    field: keyof CustomLink,
    value: string,
  ) => void;
  handleAddCustomLink: () => void;
  handleRemoveCustomLink: (id: string) => void;
  fetchGithubProfileData: () => void;
  handleSaveProfile: () => Promise<void>;
  loadProfileData: (slug: string) => Promise<void>;
};

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, profileSlug } = useAuth();

  const INITIAL_SOCIAL_LINKS: SocialLinks = {
    instagram: "",
    youtube: "",
    linkedin: "",
    x: "",
  };

  const INITIAL_CUSTOM_LINKS: CustomLink[] = [
    { id: "link-1", label: "Meu blog", url: "https://meusite.dev" },
    { id: "link-2", label: "Podcasts", url: "https://youtube.com/@podcast" },
  ];

  const [githubUsername, setGithubUsername] = useState("");
  const [githubProfile, setGithubProfile] = useState<GithubProfile | null>(
    null,
  );
  const [showFollowers, setShowFollowers] = useState(true);
  const [showRepoCount, setShowRepoCount] = useState(true);
  const [socialLinks, setSocialLinks] =
    useState<SocialLinks>(INITIAL_SOCIAL_LINKS);
  const [customLinks, setCustomLinks] =
    useState<CustomLink[]>(INITIAL_CUSTOM_LINKS);

  const handleSocialChange = (field: keyof SocialLinks, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [field]: value }));
  };

  const handleCustomLinkChange = (
    id: string,
    field: keyof CustomLink,
    value: string,
  ) => {
    setCustomLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link)),
    );
  };

  const handleAddCustomLink = () => {
    const newLink: CustomLink = {
      id: `link-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      label: "",
      url: "",
    };
    setCustomLinks((prev) => [...prev, newLink]);
  };

  const handleRemoveCustomLink = (id: string) => {
    setCustomLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const fetchGithubProfileData = useCallback(
    async (signal?: AbortSignal) => {
      const username = githubUsername.trim();

      if (!username) return;

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`,
          { signal },
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do GitHub");
        }

        const data = await response.json();
        setGithubProfile({
          name: data.name,
          avatarUrl: data.avatar_url,
          followers: data.followers,
          publicRepos: data.public_repos,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [githubUsername],
  );

  const handleSaveProfile = async () => {
    if (!user || !profileSlug) return;

    try {
      await saveUserProfile(profileSlug, {
        userId: user.uid,
        githubUsername,
        showFollowers,
        showRepoCount,
        socialLinks,
        customLinks,
      });
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
    }
  };

  const loadProfileData = async (profileSlug: string) => {
    try {
      const data = await loadUserProfile(profileSlug);

      if (data) {
        setGithubUsername(data.githubUsername);
        setShowFollowers(data.showFollowers);
        setShowRepoCount(data.showRepoCount);
        setSocialLinks(data.socialLinks);
        setCustomLinks(data.customLinks);
      }
    } catch (error) {
      console.log("Erro ao carregar perfil:", error);
    }
  };

  useEffect(() => {
    if (profileSlug) {
      loadProfileData(profileSlug);
    }
  }, [profileSlug]);

  const values = useMemo(
    () => ({
      githubUsername,
      showFollowers,
      showRepoCount,
      socialLinks,
      customLinks,
      githubProfile,
      setGithubUsername,
      setShowFollowers,
      setShowRepoCount,
      handleSocialChange,
      handleCustomLinkChange,
      handleAddCustomLink,
      handleRemoveCustomLink,
      fetchGithubProfileData: () => fetchGithubProfileData(),
      handleSaveProfile,
      loadProfileData,
    }),
    [
      githubUsername,
      showFollowers,
      showRepoCount,
      socialLinks,
      customLinks,
      githubProfile,
      setGithubUsername,
      setShowFollowers,
      setShowRepoCount,
      handleSocialChange,
      handleCustomLinkChange,
      handleAddCustomLink,
      handleRemoveCustomLink,
      fetchGithubProfileData,
      handleSaveProfile,
      loadProfileData,
    ],
  );

  return (
    <ProfileContext.Provider value={values}>{children}</ProfileContext.Provider>
  );
};

const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile deve ser usado dentro de um ProfileProvider");
  }

  return context;
};

export { ProfileProvider, useProfile };
