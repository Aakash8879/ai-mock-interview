"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Questions", path: "/dashboard/questions" },
  { label: "Upgrade", path: "/dashboard/upgrade" },
  { label: "How It Works?", path: "/dashboard/how-it-works" },
];

function Header() {
  const path = usePathname();

  return (
    <div className="flex p-4 items-center justify-between bg-background text-foreground shadow-sm border-b">
      <img src="/logo.svg" alt="Logo" />
      <ul className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <li
            key={link.path}
            className={`cursor-pointer transition font-medium hover:text-primary 
              ${
                path === link.path
                  ? "text-secondary font-bold"
                  : "text-muted-foreground"
              }`}
          >
            {link.label}
          </li>
        ))}
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
