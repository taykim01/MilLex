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
                <Textarea
                  placeholder="Translated English text will appear here..."
                  value={response || ""}
                  readOnly
                  className="h-64 text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
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
                <Textarea
                  placeholder="번역된 한국어 내용이 여기에 표시됩니다..."
                  value={response || ""}
                  readOnly
                  className="h-64 text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
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
                  className="bg-green-600 hover:bg-green-700 text-white font-bold"
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
