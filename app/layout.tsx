import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "HyreAi – Your AI-Powered Career Coach",
  description:
    "HyreAi is your ultimate AI career assistant, helping you craft professional resumes, generate tailored cover letters, and prepare for job interviews with AI-powered mock questions. Stay ahead with real-time insights on trending job roles, in-demand skills, and salary trends—all in one place. Get hired faster with HyreAi!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
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
    </ClerkProvider>
  );
}
