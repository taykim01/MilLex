"use client";

import { handleTranslate } from "@/features/agent-features";
import { useState } from "react";
import { toast } from "sonner";

export function useTranslation() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [translateLanguage, setTranslateLanguage] = useState<
    "KorEng" | "EngKor"
  >("KorEng");

  const translate = async () => {
    setLoading(true);
    try {
      if(!query) throw "번역할 내용을 입력하세요.";
      const { data, error } = await handleTranslate(query, translateLanguage);
      if (!data) throw "사용자 또는 설정 정보를 찾을 수 없습니다.";
      if (error) throw error;
      setResponse(data);
      toast("번역이 완료되었습니다!");
    } catch (error) {
      const err = typeof error === "string" ? error : "번역 중 오류가 발생했습니다.";
      console.error(err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    query,
    setQuery,
    response,
    translate,
    translateLanguage,
    setTranslateLanguage,
  };
}
