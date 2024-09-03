"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { data, error } = await signIn(email, password);
    if (error) {
      setError(error.message);
    } else {
      router.push("/feed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold mb-6">Log In</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Log In
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
