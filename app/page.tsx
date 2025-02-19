// Main Page.tsx
"use client";
import HeroSection from "@/components/hero";
import { howItWorks } from "./data/howitworks";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 backdrop-blur-sm"
  >
    <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
      {value}
    </h3>
    <p className="text-gray-400 mt-2">{label}</p>
  </motion.div>
);

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

      <HeroSection />

      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <StatItem value="20+" label="Expert Categories" />
            <StatItem value="1K+" label="Dynamic Questions" />
            <StatItem value="95%" label="Accuracy Rate" />
            <StatItem value="24/7" label="AI Support" />
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Learning Revolutionized
            </h2>
            <p className="text-gray-400 text-lg">
              Transform your knowledge acquisition with our four-pillar approach
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-all"
              >
                <div className="w-14 h-14 mb-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-200 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent"
            >
              Ready to Elevate Your Expertise?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto"
            >
              Join our community of lifelong learners and unlock your full
              potential
            </motion.p>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
            >
              <Link href="/attempt" passHref>
                <Button
                  size="lg"
                  className="h-14 px-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl text-lg shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  Start Learning Now
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
