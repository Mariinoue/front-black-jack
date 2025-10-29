"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import Button from "@/src/components/button/button";
import Input from "@/src/components/input/input";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const request = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const response = await request.json();

      if (!request.ok) {
        throw new Error(response.message || "Email ou senha inválidos");
      }

      if (!response.token) {
        throw new Error("Login falhou, token não recebido.");
      }

      localStorage.setItem("blackjack-token", response.token);
      router.push("/blackjack");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ocorreu um erro desconhecido.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="text-center text-xs text-gray-400 bg-gray-800 p-3 rounded-md border border-gray-700">
        <p>Use os dados de teste para entrar:</p>
        <p>
          Email: <strong>email@teste.com</strong>
        </p>
        <p>
          Senha: <strong>123456</strong>
        </p>
      </div>

      {error && (
        <p className="w-full text-center text-red-500 text-sm font-medium">
          {error}
        </p>
      )}

      <Input
        label="E-mail"
        type="email"
        name="email"
        id="email"
        placeholder=""
        value={email}
        handleChange={(value) => setEmail(value)}
        readOnly={loading}
        required
      />
      <Input
        label="Senha"
        type="password"
        name="password"
        id="password"
        placeholder=""
        minLength={6}
        value={password}
        handleChange={(value) => setPassword(value)}
        readOnly={loading}
        required
      />
      <Button type="submit" disabled={loading || !email || !password}>
        {loading ? "Carregando..." : "Entrar"}
      </Button>
    </form>
  );
};

export default LoginForm;
