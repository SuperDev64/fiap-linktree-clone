import { useProfile } from "../contexts/ProfileContext";
import CustomLinkItem from "./CustomLinkItem";

function CustomLinksSection() {
  const {
    customLinks,
    handleAddCustomLink,
    handleCustomLinkChange,
    handleRemoveCustomLink,
  } = useProfile();

  return (
    <section className="rounded-3xl border bg-white p-6">
      <h2 className="text-lg font-semibold">Links Personalizados</h2>

      <div className="mt-6 space-y-4">
        {customLinks.map((link, index) => (
          <CustomLinkItem
            key={link.id}
            index={index}
            link={link}
            onChange={handleCustomLinkChange}
            onRemove={handleRemoveCustomLink}
          />
        ))}

        <button
          type="button"
          onClick={handleAddCustomLink}
          className="w-full cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-600"
        >
          + Adicionar novo link
        </button>
      </div>
    </section>
  );
}

export default CustomLinksSection;
