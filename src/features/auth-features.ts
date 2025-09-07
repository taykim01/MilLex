"use server";

import { createClient } from "@/infrastructures/supabase/server";

export async function handleSignIn(
  email: string,
  password: string
) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    const isInvalidCredentials = error.message.includes(
      "Invalid login credentials"
    );
    console.error("Error signing in:", error.message);
    if (isInvalidCredentials)
      return { data: null, error: "Invalid email or password" };
    else return { data: null, error: error.message };
  }

  return {
    data: {
      id: data.user.id,
      email: data.user.email!,
      created_at: data.user.created_at!,
    },
    error: null,
  };
}
