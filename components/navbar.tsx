import React from "react";
import { Button } from "./ui/button";
import { Trophy, ScrollText, Play } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Logo from "./logo";

export default async function Navbar() {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="flex items-center md:space-x-4">
          <SignedIn>
            <Button variant="ghost" className="flex items-center gap-2">
              <Link href={"/create"} className="flex items-center gap-2">
                <ScrollText className="h-4 w-4" />
                <span className="hidden md:block">Create Quiz</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <Link href={"/attempt"} className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                <span className="hidden md:block">Attempt Quiz</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <Link href={"/leaderboard"} className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span className="hidden md:block">Leaderboard</span>
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
