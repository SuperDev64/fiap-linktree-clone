import { useProfile } from "../contexts/ProfileContext";
import type { SocialLinks } from "../types";
import TextInput from "./TextInput";

const SOCIAL_FIELDS: Array<{
  key: keyof SocialLinks;
  label: string;
  placeholder: string;
  badge: string;
}> = [
  {
    key: "instagram",
    label: "Instagram",
    placeholder: "https://instagram.com/seuuser",
    badge: "IG",
  },
  {
    key: "youtube",
    label: "YouTube",
    placeholder: "https://youtube.com/@seucanal",
    badge: "YT",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/seuuser",
    badge: "IN",
  },
  { key: "x", label: "X", placeholder: "https://x.com/seuuser", badge: "X" },
];

function SocialSection() {
  const { socialLinks, handleSocialChange } = useProfile();

  return (
    <section className="rounded-3xl border bg-white p-6">
      <h2 className="text-lg font-semibold">Redes Sociais</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {SOCIAL_FIELDS.map((field) => (
          <label
            key={field.key}
            className="text-xs font-semibold text-slate-500"
          >
            {field.label}
            <div className="mt-2">
              <TextInput
                type="url"
                value={socialLinks[field.key]}
                onChange={(event) =>
                  handleSocialChange(field.key, event.target.value)
                }
                placeholder={field.placeholder}
                prefix={field.badge}
              />
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}

export default SocialSection;
