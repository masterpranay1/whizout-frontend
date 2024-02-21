"use client";

import { useUser } from "@/components/contexts/UserContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const [user] = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
  }, []);

  return (
    <>
      {!user && (
        <section className="px-32 py-8 mx-auto">
          <h1 className="text-4xl font-bold mt-4">
            Please login to view your profile
          </h1>
          <Button
            onClick={() => {
              router.push("/login");
            }}
            className="mt-8 px-8 py-2 bg-blue-700 text-white rounded-md"
          >
            Login
          </Button>
        </section>
      )}
      {user && (
        <section className="px-32 py-8 mx-auto">
          <Image
            src={`${process.env.NEXT_PUBLIC_PB_URL}/_pb_users_auth_/${user.id}/${user.avatar}`}
            alt={user.name}
            width={150}
            height={150}
            className="rounded-full border-4 border-gray-400"
          />

          <div className="p-4">
            <h1 className="text-4xl font-bold mt-4">{user.name}</h1>
            <p className="text-sm text-gray-500">@{user.username}</p>
            <p className="text-xl text-gray-500 mt-4">{user.email}</p>

            <Button
              onClick={() => {
                localStorage.removeItem("user");
                router.push("/login");
              }}
              className="mt-8 px-8 py-2 bg-red-700 text-white rounded-md"
            >
              Logout
            </Button>
          </div>
        </section>
      )}
    </>
  );
}
