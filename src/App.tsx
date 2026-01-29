import { useState } from "react";
import CustomLinksSection from "./components/CustomLinksSection";
import PhonePreview from "./components/PhonePreview";
import ProfileSection from "./components/ProfileSection";
import SocialSection from "./components/SocialSection";
import type { CustomLink, SocialLinks } from "./types";

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

function App() {
  const [githubUsername, setGithubUsername] = useState("jovtrc");
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

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex max-w-400 flex-col gap-8 px-6 py-10 lg:flex-row">
        <div className="flex-1 space-y-6">
          <ProfileSection
            githubUsername={githubUsername}
            onGithubUsernameChange={setGithubUsername}
            showFollowers={showFollowers}
            onToggleFollowers={setShowFollowers}
            showRepoCount={showRepoCount}
            onToggleRepoCount={setShowRepoCount}
          />
          <SocialSection
            socialLinks={socialLinks}
            onSocialChange={handleSocialChange}
          />
          <CustomLinksSection
            links={customLinks}
            onAdd={handleAddCustomLink}
            onChange={handleCustomLinkChange}
            onRemove={handleRemoveCustomLink}
          />
        </div>
        <aside className="w-full lg:w-170">
          <PhonePreview
            githubUsername={githubUsername}
            showFollowers={showFollowers}
            showRepoCount={showRepoCount}
            socialLinks={socialLinks}
            customLinks={customLinks}
          />
        </aside>
      </div>
    </main>
  );
}

export default App;
