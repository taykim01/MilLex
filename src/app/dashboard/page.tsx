"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/hooks/use-translation";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { loading, setQuery, response, translate, setTranslateLanguage } =
    useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
              ROKMC_BIGDATA
            </span>
          </Link>
          <nav>
            <Button variant="ghost">로그아웃</Button>
          </nav>
        </div>
      </header>

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
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
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
              </div>
              <div className="mt-4 flex justify-center">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold"
                  onClick={translate}
                  disabled={loading}
                >
                  {loading ? "번역 중..." : "`번역하기"}{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="EngKor">
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
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

      <footer className="py-6 bg-gray-950">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500">
          <p>&copy; 2025 ROKMC_BIGDATA. All rights reserved.</p>
          <p className="mt-2 text-sm">
            본 프로젝트는 국방 및 군사 목적으로 개발되었습니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
