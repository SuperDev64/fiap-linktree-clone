"use client";

import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Redirecionar para a página de edição do perfil
      window.location.href = "/edit";
    }
  }, [user]);

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            LinkTree Clone
          </h1>
          <p className="text-lg text-slate-600">
            Crie sua página de links personalizada
          </p>
        </div>

        <AuthForm />
      </div>
    </main>
  );
}
