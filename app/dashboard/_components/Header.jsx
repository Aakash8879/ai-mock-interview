"use client"
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Header() {
    const path = usePathname();
    useEffect(() => {
        console.log(path);
    }, []);
    


  return (
    <div className="flex p-4 items-center justify-between bg-gray-800 text-white">
    <img src="/logo.svg" alt="Logo" className="w-40 h-auto" />
    <ul className="hidden md:flex gap-6">
    <li className={`hover:text-primary hover:font-bold transition cursor-pointer
${path == '/dashboard' && 'text-secondary font-bold'}`}
>
Dashboard</li>
<li className={`hover:text-primary hover:font-bold transition cursor-pointer
${path == '/dashboard' && 'text-secondary font-bold'}`}
>
Questions</li>
      <li className={`hover:text-primary hover:font-bold transition cursor-pointer
${path == '/dashboard' && 'text-secondary font-bold'}`}
>
Upgrade</li>
<li className={`hover:text-primary hover:font-bold transition cursor-pointer
${path == '/dashboard' && 'text-secondary font-bold'}`}
>How It Works?</li>
    </ul>
   <UserButton/>
  </div>
  );
}

export default Header
