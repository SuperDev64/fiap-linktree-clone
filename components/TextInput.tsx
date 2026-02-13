import type { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  prefix?: string;
};

function TextInput({ prefix, className, ...props }: TextInputProps) {
  const baseClasses =
    "h-10 w-full rounded-2xl border px-4 text-sm focus:border-emerald-600";

  if (!prefix) {
    return (
      <input
        {...props}
        className={[baseClasses, className].filter(Boolean).join(" ")}
      />
    );
  }

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
        {prefix}
      </span>
      <input
        {...props}
        className={[baseClasses, "pl-12", className].filter(Boolean).join(" ")}
      />
    </div>
  );
}

export default TextInput;
