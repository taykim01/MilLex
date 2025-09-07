"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/hooks/use-sign-in";
import Link from "next/link";

export default function SignInPage() {
  const { user, loading, signIn, setEmail, setPassword, email, password } =
    useSignIn();

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
              ROKMC_BIGDATA
            </span>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
              로그인
            </CardTitle>
            <CardDescription className="text-gray-400">
              보안 액세스를 위해 자격 증명을 입력하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={signIn}>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none text-gray-300"
                >
                  이메일
                </label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="service.number@rokmc.mil.kr"
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none text-gray-300"
                >
                  비밀번호
                </label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>
              <Button
                disabled={loading}
                onClick={signIn}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
              >
                로그인
              </Button>
            </form>
          </CardContent>
        </Card>
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
