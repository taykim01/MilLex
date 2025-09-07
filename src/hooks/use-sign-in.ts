"use client";

import { handleSignIn } from "@/features/auth-features";
import { useEffect, useState } from "react";
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
      if(!email || !password) throw "이메일과 비밀번호를 모두 입력하세요.";
      const { data, error } = await handleSignIn(email, password);
      if (!data) throw "사용자 정보를 찾을 수 없습니다.";
      if (error) throw error;
      _setUser(data);
      router.push("/dashboard");
      toast("로그인 완료");
    } catch (error) {
      const err = typeof error === "string" ? error : "번역 중 오류가 발생했습니다.";
      console.error(err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      toast("이미 로그인되어 있습니다.");
      router.push("/dashboard");
    }
  }, [user, router]);

  return {
    user,
    loading,
    signIn,
    setEmail,
    setPassword,
    email,
    password,
  };
}
