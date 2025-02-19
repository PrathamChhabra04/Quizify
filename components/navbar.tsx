"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./logo";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Play, ScrollText, Trophy } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Logo />
          </motion.div>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <SignedIn>
            <Button
              variant="ghost"
              className="group flex items-center gap-2 hover:bg-gray-800/50"
              asChild
            >
              <Link href="/create">
                <ScrollText className="h-4 w-4 text-purple-400 group-hover:text-purple-300" />
                <span className="hidden md:block text-gray-300">Create</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="group flex items-center gap-2 hover:bg-gray-800/50"
              asChild
            >
              <Link href="/attempt">
                <Play className="h-4 w-4 text-blue-400 group-hover:text-blue-300" />
                <span className="hidden md:block text-gray-300">Attempt</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="group flex items-center gap-2 hover:bg-gray-800/50"
              asChild
            >
              <Link href="/leaderboard">
                <Trophy className="h-4 w-4 text-yellow-400 group-hover:text-yellow-300" />
                <span className="hidden md:block text-gray-300">
                  Leaderboard
                </span>
              </Link>
            </Button>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="ml-2 border-l border-gray-700 pl-2 mt-2">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                    userButtonPopoverCard: "bg-gray-800 border-gray-700",
                    userPreviewMainIdentifier: "text-purple-400",
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
