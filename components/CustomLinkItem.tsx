import type { CustomLink } from "@/types/types";
import TextInput from "./TextInput";

type CustomLinkItemProps = {
  index: number;
  link: CustomLink;
  onChange: (id: string, field: keyof CustomLink, value: string) => void;
  onRemove: (id: string) => void;
};

function CustomLinkItem({
  index,
  link,
  onChange,
  onRemove,
}: CustomLinkItemProps) {
  return (
    <div className="rounded-3xl border bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Link {index + 1}</p>
        <button
          type="button"
          onClick={() => onRemove(link.id)}
          className="cursor-pointer text-xs font-semibold text-slate-500"
        >
          Remover
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <label className="text-xs font-semibold text-slate-500">
          Label
          <div className="mt-2">
            <TextInput
              type="text"
              value={link.label}
              onChange={(event) =>
                onChange(link.id, "label", event.target.value)
              }
              placeholder="Meu portfolio"
            />
          </div>
        </label>
        <label className="text-xs font-semibold text-slate-500">
          URL
          <div className="mt-2">
            <TextInput
              type="url"
              value={link.url}
              onChange={(event) => onChange(link.id, "url", event.target.value)}
              placeholder="https://meusite.dev"
            />
          </div>
        </label>
      </div>
    </div>
  );
}

export default CustomLinkItem;
