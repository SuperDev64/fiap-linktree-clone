"use client";

import { useState } from "react";
import TextInput from "./TextInput";
import { useAuth } from "@/contexts/AuthContext";

export const SlugEditor = () => {
  const { user, profileSlug, setProfileSlug } = useAuth();
  const [newSlug, setNewSlug] = useState(profileSlug || "");

  const handleSaveSlug = async () => {
    if (!user) return;

    try {
    } catch (error) {
      console.error("Erro ao salvar slug:", error);
    }
  };

  return (
    <div className="mt-6">
      <label className="block text-sm font-semibold mb-2">
        Seu link personalizado
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <div className="flex items-center">
            <span className="text-sm text-slate-500 mr-2">meusite.com/</span>
            <TextInput
              type="text"
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value.toLowerCase())}
              placeholder="seu-slug"
              className="flex-1"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleSaveSlug}
          className="h-10 px-4 rounded-2xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Salvar Slug
        </button>
      </div>
    </div>
  );
};
