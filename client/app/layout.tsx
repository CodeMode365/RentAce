import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "react-hot-toast";
import StateProvider from "@/lib/redux/StateProvider";
import AuthProvider from "@/lib/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RentAce",
  description: "Reant you free Spaces instantly!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <StateProvider>
        <AuthProvider>
          <body className={inter.className}>
            <Toaster toastOptions={{ className: "z-[100]" }} />
            <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
          </body>
        </AuthProvider>
      </StateProvider>
    </html>
  );
}
