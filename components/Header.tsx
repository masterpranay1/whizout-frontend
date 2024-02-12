import { useMemo } from "react";
import Link from "next/link";

import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import HeaderProfile from "./HeaderProfile";

const Logo = () => {
  return (
    <Link href={"/"} className="mr-0 lg:mr-8 py-2 lg:py-0">
      <Sparkle size={32} className="text-slate-800" />
    </Link>
  );
};

const NavLinks = () => {
  const navigation = useMemo(
    () => [
      { name: "Explore", href: "/explore", color: "bg-neutral-600" },
      { name: "Community", href: "/community", color: "bg-blue-600" },
      { name: "Travel", href: "/travel", color: "bg-green-600" },
      { name: "Marketplace", href: "/marketplace", color: "bg-orange-600" },
      { name: "Jobs", href: "/jobs", color: "bg-teal-600" },
    ],
    []
  );

  return (
    <div className="hidden lg:flex flex-1 items-center justify-center gap-16">
      {navigation.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className="relative group flex items-center gap-2 font-medium py-4 pe-3"
        >
          <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
          <span className="text-slate-800">{item.name}</span>
          <div
            className={cn(
              "absolute -bottom-0 w-full h-1 bg-transparent rounded-full transition duration-300 ease-in-out",
              "opacity-0",
              `group-hover:${item.color || "bg-slate-800"}`,
              "group-hover:opacity-100"
            )}
          ></div>
        </Link>
      ))}
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="lg:flex-1 mr-8">
      <div className="flex flex-row items-center w-full shadow-inner bg-slate-50 px-6 rounded-full">
        <Logo />
        <NavLinks />
      </div>
    </nav>
  );
};

export default function Header() {
  return (
    <header className="bg-white sticky top-0 inset-x-0 z-50 px-6 py-4 flex flex-row items-center">
      <Nav />
      <HeaderProfile />
    </header>
  );
}
