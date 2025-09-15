"use client";

import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/hooks/use-translation";
import { ArrowRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DashboardPage() {
  const {
    loading,
    setQuery,
    response,
    translate,
    setTranslateLanguage,
    sources,
  } = useTranslation();

  const escapeRegExp = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const renderHighlighted = (text: string) => {
    if (!text) return null;
    const termEntries: Array<{ value: string; sourceIdx: number }> = [];
    (sources || []).forEach((s, idx) => {
      if (s.english) termEntries.push({ value: s.english, sourceIdx: idx });
      if (s.korean) termEntries.push({ value: s.korean, sourceIdx: idx });
    });
    const uniqueTerms = Array.from(
      new Map(termEntries.map((t) => [t.value.toLowerCase(), t])).values()
    ).sort((a, b) => b.value.length - a.value.length);
    if (uniqueTerms.length === 0) {
      return text
        .split(/(\n)/)
        .map((seg, i) =>
          seg === "\n" ? <br key={i} /> : <span key={i}>{seg}</span>
        );
    }
    const pattern = uniqueTerms.map((t) => escapeRegExp(t.value)).join("|");
    const regex = new RegExp(pattern, "gi");
    const nodes: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = regex.lastIndex;
      if (start > lastIndex) {
        const plain = text.slice(lastIndex, start);
        nodes.push(
          ...plain
            .split(/(\n)/)
            .map((seg, i) =>
              seg === "\n" ? (
                <br key={`${lastIndex}-${start}-${i}`} />
              ) : (
                <span key={`${lastIndex}-${start}-${i}`}>{seg}</span>
              )
            )
        );
      }
      const matchedText = match[0];
      const found = uniqueTerms.find(
        (t) => t.value.toLowerCase() === matchedText.toLowerCase()
      );
      const src =
        typeof found?.sourceIdx === "number"
          ? sources[found.sourceIdx]
          : undefined;
      nodes.push(
        <TooltipProvider key={`hl-${start}-${end}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="bg-green-950/40 text-green-200 border border-green-800/60 px-1 rounded-sm underline decoration-dotted cursor-help">
                {matchedText}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs break-words">
              <div className="text-xs space-y-1">
                {src?.source && (
                  <div>
                    <span className="text-gray-400">Source:</span> {src.source}
                  </div>
                )}
                {src?.category && (
                  <div>
                    <span className="text-gray-400">Category:</span>{" "}
                    {src.category}
                  </div>
                )}
                {src?.korean && (
                  <div>
                    <span className="text-gray-400">Korean:</span> {src.korean}
                  </div>
                )}
                {src?.english && (
                  <div>
                    <span className="text-gray-400">English:</span>{" "}
                    {src.english}
                  </div>
                )}
                {src?.description && (
                  <div className="text-gray-500">{src.description}</div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
      lastIndex = end;
    }
    if (lastIndex < text.length) {
      const tail = text.slice(lastIndex);
      nodes.push(
        ...tail
          .split(/(\n)/)
          .map((seg, i) =>
            seg === "\n" ? (
              <br key={`tail-${lastIndex}-${i}`} />
            ) : (
              <span key={`tail-${lastIndex}-${i}`}>{seg}</span>
            )
          )
      );
    }
    return nodes;
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white font-sans">
      <Header />

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <Tabs
            defaultValue="KorEng"
            className="w-full"
            onValueChange={(value) =>
              setTranslateLanguage(value as "KorEng" | "EngKor")
            }
          >
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-gray-800 border-gray-700">
              <TabsTrigger
                value="KorEng"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                한 → 영 번역
              </TabsTrigger>
              <TabsTrigger
                value="EngKor"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                영 → 한 번역
              </TabsTrigger>
            </TabsList>
            <TabsContent value="KorEng">
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <Textarea
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="번역할 한국어 내용을 입력하세요..."
                  className="h-64 text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <div className="h-64 bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-base md:text-sm shadow-xs overflow-auto whitespace-pre-wrap">
                  {renderHighlighted(response || "")}
                </div>
                {sources && sources.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <TooltipProvider>
                      {sources.map((s, idx) => (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-800 border border-gray-700 px-2 py-1 text-xs text-gray-200 cursor-help">
                              <Info className="h-3.5 w-3.5 text-green-400" />
                              Source {idx + 1}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="max-w-xs break-words"
                          >
                            <div className="text-xs space-y-1">
                              {s.source && (
                                <div>
                                  <span className="text-gray-400">Source:</span>{" "}
                                  {s.source}
                                </div>
                              )}
                              {s.category && (
                                <div>
                                  <span className="text-gray-400">
                                    Category:
                                  </span>{" "}
                                  {s.category}
                                </div>
                              )}
                              <div>
                                <span className="text-gray-400">Korean:</span>{" "}
                                {s.korean}
                              </div>
                              <div>
                                <span className="text-gray-400">English:</span>{" "}
                                {s.english}
                              </div>
                              {s.description && (
                                <div className="text-gray-500">
                                  {s.description}
                                </div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </TooltipProvider>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-center">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold"
                  onClick={translate}
                  disabled={loading}
                >
                  {loading ? "번역 중..." : "번역하기"}{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="EngKor">
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <Textarea
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter English text to translate..."
                  className="h-64 text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <div className="h-64 bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-base md:text-sm shadow-xs overflow-auto whitespace-pre-wrap">
                  {renderHighlighted(response || "")}
                </div>
                {sources && sources.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <TooltipProvider>
                      {sources.map((s, idx) => (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-800 border border-gray-700 px-2 py-1 text-xs text-gray-200 cursor-help">
                              <Info className="h-3.5 w-3.5 text-green-400" />
                              Source {idx + 1}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="max-w-xs break-words"
                          >
                            <div className="text-xs space-y-1">
                              {s.source && (
                                <div>
                                  <span className="text-gray-400">source:</span>{" "}
                                  {s.source}
                                </div>
                              )}
                              {s.category && (
                                <div>
                                  <span className="text-gray-400">
                                    category:
                                  </span>{" "}
                                  {s.category}
                                </div>
                              )}
                              <div>
                                <span className="text-gray-400">korean:</span>{" "}
                                {s.korean}
                              </div>
                              <div>
                                <span className="text-gray-400">english:</span>{" "}
                                {s.english}
                              </div>
                              {s.description && (
                                <div className="text-gray-300">
                                  {s.description}
                                </div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </TooltipProvider>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-center">
                <Button
                  size="lg"
                  className="bg-green-400 hover:bg-green-500 text-white font-bold"
                  onClick={translate}
                  disabled={loading}
                >
                  {loading ? "Translating..." : "Translate"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
