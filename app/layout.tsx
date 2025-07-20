import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar"; // ✅ 1. Import the Navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarbonIQ - AI-Powered Carbon Budgeting Platform",
  description: "Sustainable manufacturing carbon emissions tracking and optimization",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SidebarProvider defaultOpen={true}>
            <div className="flex">
              <AppSidebar />
              <div className="flex-1 ml-64"> {/* sidebar width */}
                <Navbar /> {/* ✅ 2. Add Navbar */}
                <main className="pt-16 px-6 overflow-hidden">{children}</main> {/* pt-16 for navbar height */}
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
