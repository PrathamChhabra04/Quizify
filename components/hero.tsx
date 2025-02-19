// HeroSection.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full pt-32 md:pt-40 pb-20 relative">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent"
            >
              Ignite Your
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Learning Journey
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl"
            >
              Craft interactive quizzes, challenge peers, and track progress in
              real-time. The ultimate platform for competitive learning and
              knowledge mastery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              <Link href="/create">
                <Button className="h-12 px-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl">
                  <Rocket className="mr-2 h-5 w-5" />
                  Create Quiz
                </Button>
              </Link>
              <Link href="/attempt">
                <Button
                  variant="outline"
                  className="h-12 px-8 border-gray-600 hover:bg-gray-800/50 text-white rounded-xl"
                >
                  Start Challenge
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-none">
              <Image
                src="/quiz.png"
                width={800}
                height={500}
                alt="Platform Preview"
                className="transform hover:scale-105 transition-transform duration-300"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
