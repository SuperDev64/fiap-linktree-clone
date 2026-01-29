import TextInput from "./TextInput";

type ProfileSectionProps = {
  githubUsername: string;
  onGithubUsernameChange: (value: string) => void;
  showFollowers: boolean;
  onToggleFollowers: (value: boolean) => void;
  showRepoCount: boolean;
  onToggleRepoCount: (value: boolean) => void;
};

function ProfileSection({
  githubUsername,
  onGithubUsernameChange,
  showFollowers,
  onToggleFollowers,
  showRepoCount,
  onToggleRepoCount,
}: ProfileSectionProps) {
  return (
    <section className="rounded-3xl border bg-white p-6">
      <h2 className="text-lg font-semibold">Configuração do Perfil</h2>

      <div className="mt-6">
        <label className="text-sm font-semibold mb-4 block">
          Usuário do GitHub
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <TextInput
              type="text"
              value={githubUsername}
              onChange={(event) => onGithubUsernameChange(event.target.value)}
              placeholder="seu-usuario"
              className="flex-1"
            />
            <button
              type="button"
              className="h-10 cursor-pointer rounded-2xl border bg-slate-50 px-4 text-sm font-semibold text-slate-700"
            >
              Buscar
            </button>
          </div>
        </label>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex cursor-pointer items-center justify-between rounded-2xl border bg-slate-50 px-4 py-3">
            <div>
              <span className="text-sm font-semibold">Mostrar seguidores</span>
              <span className="block text-xs text-slate-500">
                Exibe contagem no perfil.
              </span>
            </div>
            <input
              type="checkbox"
              checked={showFollowers}
              onChange={(event) => onToggleFollowers(event.target.checked)}
              className="h-4 w-4 accent-emerald-600"
            />
          </label>
          <label className="flex cursor-pointer items-center justify-between rounded-2xl border bg-slate-50 px-4 py-3">
            <div>
              <span className="text-sm font-semibold">
                Mostrar repositórios
              </span>
              <span className="block text-xs text-slate-500">
                Exibe numero de repos.
              </span>
            </div>
            <input
              type="checkbox"
              checked={showRepoCount}
              onChange={(event) => onToggleRepoCount(event.target.checked)}
              className="h-4 w-4 accent-emerald-600"
            />
          </label>
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
