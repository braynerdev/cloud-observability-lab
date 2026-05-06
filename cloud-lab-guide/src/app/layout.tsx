import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarNav } from "@/components/sidebar-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Cloud } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloud Observability Lab — Guia Passo a Passo",
  description: "Guia completo para configurar Terraform, AWS, Portainer e deploy de aplicações.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <div className="flex h-screen overflow-hidden">
              <SidebarNav />
              <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4 md:px-6">
                  <p className="text-sm font-semibold md:hidden text-foreground inline-flex items-center gap-2">
                    <Cloud className="h-4 w-4" />
                    Cloud Observability Lab
                  </p>
                  <div className="ml-auto">
                    <ThemeToggle />
                  </div>
                </header>
                <main className="flex-1 px-4 py-8 md:px-10 md:py-10 pb-24 md:pb-10 max-w-4xl mx-auto w-full">
                  {children}
                </main>
              </div>
            </div>
            <MobileNav />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
