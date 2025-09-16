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
  let similarNotes: TermsTable[] = [];

  try {
    const queryVector = await openAIService.generateEmbedding(
      query,
      "text-embedding-3-large"
    );
    similarNotes = await termsService.getSimilarVector(
      queryVector,
      "query_term",
      5,
      undefined,
      0.75,
      12000
    );
  } catch (error) {
    console.warn(
      "Vector similarity search failed, proceeding without context:",
      error
    );
  }

  console.log({
    similarNotes: similarNotes.map((note) => ({
      korean: note.korean,
      english: note.english,
    })),
  });

  const refinedNotes = (similarNotes || []).map((note) => ({
    korean: note.korean,
    english: note.english,
    description: note.description,
    source: note.source,
    category: note.category,
  }));

  let filteredNotes = refinedNotes;
  try {
    const filterMessages: ChatCompletionParam[] = [
      {
        role: "system",
        content:
          "You are a precise filter. Return ONLY JSON, no prose. Given a user query and a list of term objects, return an array of the term objects that are ACTUALLY present in the query as whole words or apparent mentions. Consider both Korean and English fields. If none, return an empty array [].",
      },
      {
        role: "user",
        content: JSON.stringify({
          query,
          terms: refinedNotes,
        }),
      },
    ];

    const filterResponse = await openAIService.generateResponse(
      filterMessages,
      "text",
      "gpt-4o-mini"
    );
    const parsed = JSON.parse(filterResponse || "[]");
    if (Array.isArray(parsed)) {
      filteredNotes = parsed.filter(
        (t) => typeof t === "object" && (t.korean || t.english)
      );
    }
  } catch {
    filteredNotes = refinedNotes;
  }

  const semanticMessages: ChatCompletionParam[] = [
    {
      role: "system",
      content: `
          ${contextPrompt}

          #ROLE#
          Your role is to translate the user's input into ${
            translateLanguage === "KorEng" ? "English" : "Korean"
          } from ${translateLanguage === "KorEng" ? "Korean" : "English"}.
          Provide accurate translations, especially for military terms.

          #GOAL#
          Respond to the user's query given the relevant notes.

          #RELEVANT TERMS IN QUERY#
          ${JSON.stringify(filteredNotes || [])}
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
    sources: filteredNotes,
    error: null,
  };
}
