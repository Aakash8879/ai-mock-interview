"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { user, isLoaded } = useUser();

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6 py-12 relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 animate-bg">
      {/* Gradient Animation */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 via-blue-200 to-transparent opacity-30 animate-pulse" />

      <div className="z-10 backdrop-blur-md p-10 rounded-xl bg-white/70 shadow-xl max-w-2xl w-full">
      <div className="flex justify-center p-10">
      <img src="/logo.svg"></img></div>
        <h1 className="text-4xl font-extrabold text-primary mb-4">
          Welcome to AI Mock Interview
        </h1>
        <p className="text-gray-700 max-w-xl text-lg mb-8">
          Practice real interview questions, record your answers, and get instant AI-powered feedback.
        </p>

        {isLoaded ? (
          user ? (
            <>
              <p className="mb-4 text-md text-gray-700">
                Hello {user.firstName}, ready to continue your interview journey?
              </p>
              <Link href="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
            </>
          ) : (
            <Link href="/sign-in">
              <Button size="lg">Sign In to Start</Button>
            </Link>
          )
        ) : (
          <Button size="lg" disabled>
            Loading...
          </Button>
        )}
      </div>
    </div>
  );
}
