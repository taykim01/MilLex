import { Footer } from "@/components/common/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrainCircuit, Database, Languages, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white font-sans">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-40 bg-gray-800/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
                MilLex
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300 md:text-xl">
                대한민국 국군을 위한 AI/빅데이터 기반 군사 전문 번역 솔루션.
                <br />
                방대한 국군 빅데이터를 학습하여 가장 정확하고 신뢰도 높은 번역을
                제공합니다.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/sign-in">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold"
                  >
                    지금 시작하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                핵심 기능
              </h2>
              <p className="mt-4 text-gray-400">
                최첨단 기술로 전장의 소통을 혁신합니다.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="items-center">
                  <div className="p-3 rounded-full bg-green-900/50">
                    <Shield className="h-8 w-8 text-green-400" />
                  </div>
                  <CardTitle className="mt-4">군사 전문 용어</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-400 text-left">
                    방대한 군사 문서와 교신 기록을 학습하여 군사 전문 용어 및
                    은어까지 정확하게 번역합니다.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="items-center">
                  <div className="p-3 rounded-full bg-green-900/50">
                    <Languages className="h-8 w-8 text-green-400" />
                  </div>
                  <CardTitle className="mt-4">한-영 번역</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-400 text-left">
                    한미 연합 작전 및 정보 공유 등, 군사 환경에 필수적인
                    한국어와 영어 간의 완벽한 소통을 지원합니다.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="items-center">
                  <div className="p-3 rounded-full bg-green-900/50">
                    <BrainCircuit className="h-8 w-8 text-green-400" />
                  </div>
                  <CardTitle className="mt-4">AI 기반 번역</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-400 text-left">
                    최신 자연어 처리(NLP) 모델을 사용하여 군사적 맥락과 뉘앙스를
                    정확히 파악하고 번역합니다.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="items-center">
                  <div className="p-3 rounded-full bg-green-900/50">
                    <Database className="h-8 w-8 text-green-400" />
                  </div>
                  <CardTitle className="mt-4">빅데이터 통합</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-400 text-left">
                    새로운 데이터를 지속적으로 학습하여 최신 군사 용어와
                    변화하는 언어 패턴에 항상 대응합니다.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-28 bg-gray-800/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              전장의 소통, 지금 바로 혁신하십시오.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-400">
              MilLex와 함께라면 언어의 장벽은 더 이상 없습니다. 지금 바로
              로그인하여 미래의 군사 통신을 경험하세요.
            </p>
            <div className="mt-8">
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  로그인
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
