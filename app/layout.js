import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import ChatBot from "./dashboard/_components/chatBot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Update your metadata here
export const metadata = {
  title: "AI Mock Interviewer", // ← new title
  description: "Ace your interviews with AI-generated practice questions.",
  icons: {
    icon: "/logo.svg", // ← ensures favicon is linked
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          <ChatBot />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
