"use client";

import { useState } from "react";
import TextInput from "./TextInput";
import { loginUser } from "@/services/auth";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await loginUser(email, password);
      } else {
        // Lógica de registro
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 border rounded-3xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Entrar" : "Registrar"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <TextInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Senha</label>
          <TextInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            disabled={loading}
          />
          {!isLogin && (
            <p className="text-xs text-slate-500 mt-1">
              Mínimo de 6 caracteres
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar Conta"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          {isLogin ? (
            <>
              Não tem uma conta?{" "}
              <span className="font-semibold text-emerald-600">
                Criar conta
              </span>
            </>
          ) : (
            <>
              Já tem uma conta?{" "}
              <span className="font-semibold text-emerald-600">Entrar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
