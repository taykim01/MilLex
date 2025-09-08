"use client";

import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
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

export default function SignInPage() {
  const { loading, signIn, setEmail, setPassword } = useSignIn();

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
              로그인
            </CardTitle>
            <CardDescription className="text-gray-400">
              <div className="mt-2 text-sm">
              <span className="block">시범 계정</span>
              <span className="block">이메일: <span className="font-medium text-gray-300">demo@demo.com</span></span>
              <span className="block">비밀번호: <span className="font-medium text-gray-300">demo1234</span></span>
              </div>
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
      <Footer />
    </div>
  );
}
