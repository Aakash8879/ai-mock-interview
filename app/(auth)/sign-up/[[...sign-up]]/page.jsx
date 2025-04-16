"use client";

import { SignUp } from "@clerk/nextjs";

const theme = {
  primary: "#4f46e5", // indigo-600
  primaryHover: "#4338ca", // indigo-700
  background: "from-indigo-100 to-blue-200",
};

export default function SignUpPage() {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.background} p-4`}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center space-y-6">
       

        <h1 className="text-2xl font-semibold text-gray-800">Create Account</h1>
        <p className="text-gray-500 text-sm mb-2">Join us in just a few steps</p>

        <div className="flex justify-center ">
          <SignUp
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
