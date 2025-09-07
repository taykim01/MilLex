"use server";

import OpenAIService, { ChatCompletionParam } from "@/services/openai.service";
import SupabaseService from "@/services/supabase.service";
import TABLES from "@/infrastructures/supabase/tables";
import { TermsTable } from "@/core/types";

const contextPrompt = `
  #CONTEXT#
  You are an AI translator, specialized in military purposes.
  This service is essentially to help translate between Korean and English for military terms.
`;

export async function handleTranslate(
  query: string,
  translateLanguage: "KorEng" | "EngKor"
) {
  const openAIService = new OpenAIService();
  const termsService = new SupabaseService<TermsTable>(TABLES.terms);
  const queryVector = await openAIService.generateEmbedding(
    query,
    "text-embedding-3-large"
  );
  const similarNotes: TermsTable[] = await termsService.getSimilarVector(
    queryVector,
    "query_term",
    5
  );
  if (similarNotes.length === 0)
    return {
      data: "No relevant notes found.",
      error: null,
    };

  const refinedNotes = similarNotes.map((note) => ({
    korean: note.korean,
    english: note.english,
    description: note.description,
    source: note.source,
    category: note.category,
  }));

  const semanticMessages: ChatCompletionParam[] = [
    {
      role: "system",
      content: `
          ${contextPrompt}

          #ROLE#
          Your role is to translate the user's input into ${translateLanguage === "KorEng" ? "English" : "Korean"} from ${translateLanguage === "KorEng" ? "Korean" : "English"}.
          Provide accurate translations, especially for military terms.

          #GOAL#
          Respond to the user's query given the relevant notes.

          #RELEVANT TERMS IN QUERY#
          ${JSON.stringify(refinedNotes)}
        `,
    },
    {
      role: "user",
      content: query,
    },
  ];
  const semanticResponse: string = await openAIService.generateResponse(
    semanticMessages,
    "text",
    "gpt-4o"
  );

  return {
    data: semanticResponse,
    error: null,
  };
}
