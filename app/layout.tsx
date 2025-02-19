import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Quizify",
  description:
    "Quizify is a platform to attempt quizzes on various topics and improve your knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <TooltipProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {/* header */}
              <Navbar />
              <main className="min-h-screen">{children}</main>
              {/* footer */}
              <footer className="bg-muted-foreground/40 dark:bg-muted/50 py-8">
                <div className="container mx-auto px-4 text-center text-black/80 dark:text-gray-200">
                  <p>© 2025 Pratham Chhabra. All rights reserved.</p>
                </div>
              </footer>
            </ThemeProvider>
          </body>
        </html>
      </TooltipProvider>
    </ClerkProvider>
  );
}
