import type { CustomLink } from "../types";
import CustomLinkItem from "./CustomLinkItem";

type CustomLinksSectionProps = {
  links: CustomLink[];
  onAdd: () => void;
  onChange: (id: string, field: keyof CustomLink, value: string) => void;
  onRemove: (id: string) => void;
};

function CustomLinksSection({
  links,
  onAdd,
  onChange,
  onRemove,
}: CustomLinksSectionProps) {
  return (
    <section className="rounded-3xl border bg-white p-6">
      <h2 className="text-lg font-semibold">Links Personalizados</h2>

      <div className="mt-6 space-y-4">
        {links.map((link, index) => (
          <CustomLinkItem
            key={link.id}
            index={index}
            link={link}
            onChange={onChange}
            onRemove={onRemove}
          />
        ))}

        <button
          type="button"
          onClick={onAdd}
          className="w-full cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-600"
        >
          + Adicionar novo link
        </button>
      </div>
    </section>
  );
}

export default CustomLinksSection;
