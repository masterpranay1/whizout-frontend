import { useMemo } from "react";
import Link from "next/link";

import { Sparkle } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

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
      <div className="flex flex-row items-center w-full shadow-inner bg-[#f8fbfb] px-6 rounded-full">
        <Logo />
        <NavLinks />
      </div>
    </nav>
  );
};

const AuthButtons = () => {
  return (
    <div className="flex flex-row items-center shadow-inner bg-[#f8fbfb] px-6 rounded-full py-1 lg:py-2 ml-auto">
      <div className="flex items-center">
        <Button asChild variant={"link"}>
          <Link href="/login">Login</Link>
        </Button>
        <div className="h-5">
          <Separator orientation="vertical" />
        </div>
        <Button asChild variant={"link"}>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default function Header() {
  return (
    <header className="sticky top-0 inset-x-0 z-50 px-6 py-4 flex flex-row items-center">
      <Nav />
      <AuthButtons />
    </header>
  );
}
