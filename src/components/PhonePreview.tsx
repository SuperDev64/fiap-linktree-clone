import { useProfile } from "../contexts/ProfileContext";
import type { SocialLinks } from "../types";

const SOCIAL_BADGES: Record<keyof SocialLinks, string> = {
  instagram: "IG",
  youtube: "YT",
  linkedin: "IN",
  x: "X",
};

function PhonePreview() {
  const {
    showRepoCount,
    githubUsername,
    showFollowers,
    socialLinks,
    customLinks,
    githubProfile,
  } = useProfile();

  const visibleSocial = (
    Object.keys(socialLinks) as Array<keyof SocialLinks>
  ).filter((key) => socialLinks[key].trim().length > 0);

  const visibleLinks = customLinks.filter(
    (link) => link.label.trim().length > 0 || link.url.trim().length > 0,
  );

  const username = githubUsername.trim()
    ? `@${githubUsername.trim()}`
    : "@seu-usuario";

  return (
    <section className="rounded-3xl border bg-white p-6">
      <h2 className="text-lg font-semibold">Prévia</h2>

      <div className="mt-6 flex justify-center">
        <div className="relative w-80 rounded-3xl border-slate-900 bg-slate-950 p-2">
          <div className="min-h-96 h-140 overflow-y-auto rounded-2xl bg-white px-6 pb-6 pt-10 text-center">
            {githubProfile ? (
              <img
                src={githubProfile.avatarUrl}
                alt={githubProfile.name}
                className="mx-auto size-16 rounded-full"
              />
            ) : (
              <div className="mx-auto size-16 rounded-full bg-linear-to-br from-sky-200 via-white to-emerald-100" />
            )}

            <h3 className="mt-4 text-base font-semibold">
              {githubProfile ? githubProfile.name : "Seu perfil"}
            </h3>
            <p className="text-xs text-slate-500">{username}</p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {showFollowers && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {githubProfile
                    ? `${githubProfile.followers} seguidores`
                    : "1.2k seguidores"}
                </span>
              )}
              {showRepoCount && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {githubProfile
                    ? `${githubProfile.publicRepos} repositórios`
                    : "42 repositórios"}
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {visibleSocial.length > 0 ? (
                visibleSocial.map((key) => (
                  <span
                    key={key}
                    className="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold text-slate-500"
                  >
                    {SOCIAL_BADGES[key]}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400">
                  Sem redes cadastradas
                </span>
              )}
            </div>

            <div className="mt-6 space-y-2 text-left">
              {visibleLinks.length > 0 ? (
                visibleLinks.map((link) => (
                  <div
                    key={link.id}
                    className="rounded-2xl border bg-slate-50 px-4 py-3 text-sm font-semibold"
                  >
                    {link.label.trim() || "Link personalizado"}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed px-4 py-3 text-xs text-slate-400">
                  Seus links vão aparecer aqui
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhonePreview;
