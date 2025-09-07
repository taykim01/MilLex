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
      if(!query) throw new Error("Query is empty");
      const { data, error } = await handleTranslate(query, translateLanguage);
      if (!data) throw new Error("User or settings data not found");
      if (error) throw error;
      setResponse(data);
      toast("Translation finished!");
    } catch (error) {
      toast.error(error as string);
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
