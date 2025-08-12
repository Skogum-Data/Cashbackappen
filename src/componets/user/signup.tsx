"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSignup, setIsSignup] = useState(false);
    const router = useRouter();

    const handleAuth = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage("");
  if (isSignup) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else if (data.user) {
      // Insert profile row with the same UUID as the auth user
      const { error: profileError } =     await supabase.from("userprofile")
      .insert([
      { user_id: data.user.id, email: data.user.email, bank_account_number: 0 }
    ]);
    console.log("data:", data.user.id, data.user.email);
      setMessage(profileError ? profileError.message : "Check your email for confirmation!");
    }
  } else {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      router.push("/");
    }
  }
};

  return (
    <form onSubmit={handleAuth} className="flex flex-col gap-4 bg-white p-8 rounded shadow w-80 text-black">
      <h2 className="text-2xl font-bold text-center mb-4">{isSignup ? "Sign Up" : "Sign In"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-indigo-600 text-white rounded p-2">
        {isSignup ? "Sign Up" : "Sign In"}
      </button>
      <button
        type="button"
        className="text-indigo-600 underline text-sm"
        onClick={() => setIsSignup((v) => !v)}
      >
        {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </button>
      {message && <p className="text-center text-sm">{message}</p>}
    </form>
  );
}