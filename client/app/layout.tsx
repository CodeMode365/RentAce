import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "react-hot-toast";
import StateProvider from "@/lib/redux/StateProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parkour",
  description: "Park your Dream!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StateProvider>
        <body className={inter.className}>
          <TooltipProvider delayDuration={200}>
            <Toaster />
            {children}
          </TooltipProvider>
        </body>
      </StateProvider>
    </html>
  );
}
