import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section className="w-full pt-32 md:pt-40 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
            Grow Your Knowledge
            <br />
            One Quiz at a Time
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Create engaging quizzes, challenge others, and track progress in
            real-time. The perfect platform for learning and competition.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/create">
            <Button className="px-8 py-4">Create a quiz</Button>
          </Link>
          <Link href="/attempt">
            <Button className="px-8 py-4">Attempt a quiz</Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div className="hero-image">
            <Image
              src="/quiz.png"
              width={1100}
              height={400}
              alt="Banner Preview"
              className="border-none shadow-2xl dark:border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
