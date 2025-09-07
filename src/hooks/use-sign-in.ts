"use client";

import { handleSignIn } from "@/features/auth-features";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useUserStore from "@/core/states/user-state";

export function useSignIn() {
  const { user, _setUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signIn = async () => {
    setLoading(true);
    try {
      const { data, error } = await handleSignIn(email, password);
      if (!data) {
        throw new Error("User or settings data not found");
      }
      if (error) throw error;
      _setUser(data);
      router.push("/dashboard");
      toast("Signed in!");
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  const isLoggedIn = user && Object.keys(user).length > 0;

  return {
    user,
    isLoggedIn,
    loading,
    signIn,
    setEmail,
    setPassword,
    email,
    password,
  };
}
