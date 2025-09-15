"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const showAuthButton = pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container px-5 sm:px-6 md:px-8 !max-w-full flex h-14 items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
            MilLex
          </span>
        </Link>
        {showAuthButton && (
          <nav>
            <Button variant="ghost">로그아웃</Button>
          </nav>
        )}
      </div>
    </header>
  );
}
