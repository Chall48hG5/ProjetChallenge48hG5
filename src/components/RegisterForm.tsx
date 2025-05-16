"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

const RegisterForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccess(false);
    setLoading(true);

    const { email, password } = form;

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="votre@email.com"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      {errorMsg && <div className="text-red-600 text-sm">{errorMsg}</div>}

      {success && (
        <div className="text-green-600 text-sm">
          ✅ Compte créé ! Vérifiez votre boîte mail pour confirmer.
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Création en cours..." : "Créer un compte"}
      </Button>
    </form>
  );
};

export default RegisterForm;
