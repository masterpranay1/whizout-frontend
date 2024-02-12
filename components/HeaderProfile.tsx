"use client";

import Link from "next/link";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User } from "lucide-react";
import { useUser } from "./contexts/UserContext";
import { Fragment, useState } from "react";

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

const ProfileDropdown = () => {
  const [user, setUser] = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-slate-50 py-4 px-4 shadow-inner rounded-3xl cursor-pointer hover:animate-out">
          <User size={24} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-4 w-64 mr-4 mt-4 rounded-3xl border shadow-inner bg-slate-50">
        <DropdownMenuLabel className="text-md my-2">
          Hi!!, <span className="font-bold">{user?.name}</span>
        </DropdownMenuLabel>
        <DropdownMenuItem className="p-0">
          <Link href="/profile" className="w-full p-2">
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <Link
            href={"/"}
            className="w-full p-2"
            onClick={() => {
              setUser(null);
              localStorage.removeItem("user");
            }}
          >
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Profile = () => {
  return <ProfileDropdown />;
};

export default function HeaderProfile() {
  const [user] = useUser();

  return (
    <div className="flex items-center gap-4">
      {user ? <Profile /> : <AuthButtons />}
    </div>
  );
}
