import React from "react";
import { Button } from "./ui/button";
import { Trophy, ScrollText, Play } from "lucide-react";
import Link from "next/link";

export default async function Navbar() {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex-shrink-0 flex items-center">
          <Link
            href="/"
            className="text-xl font-bold text-primary flex items-center gap-2"
          >
            <ScrollText className="h-6 w-6" />
            Quizify
          </Link>
        </div>
        <div className="hidden sm:flex sm:items-center sm:space-x-4">
          <Button variant="ghost" className="flex items-center gap-2">
            <Link
              href={"/create"}
              className="flex-shrink-0 flex items-center gap-2"
            >
              <ScrollText className="h-4 w-4" />
              Create Quiz
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Link
              href={"/attempt"}
              className="flex-shrink-0 flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Attempt Quiz
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Link
              href={"/leaderboard"}
              className="flex-shrink-0 flex items-center gap-2"
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Link>
          </Button>
          <Button>Sign In</Button>
        </div>
      </nav>
    </header>
  );
}
