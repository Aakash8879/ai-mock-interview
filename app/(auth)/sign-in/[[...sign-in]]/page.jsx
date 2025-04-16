"use client";

import { SignIn } from "@clerk/nextjs";

const theme = {
  primary: "#4f46e5", // indigo-600
  primaryHover: "#4338ca", // indigo-700
  secondary: "#e0f2fe", // blue-100
  background: "from-indigo-100 to-blue-200", // Tailwind gradient
};

export default function Page() {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.background} p-4`}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center space-y-6">
        

        <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
        <p className="text-gray-500 text-sm mb-2">Sign in to continue</p>

        <div className="flex justify-center ">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: `bg-[${theme.primary}] hover:bg-[${theme.primaryHover}] text-white transition-colors`,
                card: "shadow-none",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
