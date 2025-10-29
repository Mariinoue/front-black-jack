"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";


import Button from "@/src/components/button/button";
import Input from "@/src/components/input/input";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("email@teste.com");
  const [password, setPassword] = useState("123456");
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
      const errorMessage = (err instanceof Error) ? err.message : "Ocorreu um erro desconhecido.";
      setError(errorMessage);
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit} 
    >
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
        placeholder="E-mail"
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
        placeholder="Senha"
        minLength={6}
        value={password}
        handleChange={(value) => setPassword(value)}
        readOnly={loading}
        required
      />
      <Button
        type="submit"
        disabled={loading || !email || !password}
      >
        {loading ? "Carregando..." : "Entrar"}
      </Button>
    </form>
  );
};

export default LoginForm;