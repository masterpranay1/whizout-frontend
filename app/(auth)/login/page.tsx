import { cn } from "@/lib/utils";
import { Fragment } from "react";
import Link from "next/link";

import LoginForm from "@/components/LoginForm";

const Header = () => {
  return (
    <Fragment>
      <p className="text-3xl font-bold text-teal-600">Good to have you back!</p>
      <p className="text-base text-slate-400">
        Login to your account to continue. Don't have an account?&lsquo;
        <Link
          href="/auth/signup"
          className="hover:border-b py-1 text-slate-600"
        >
          Signup
        </Link>
      </p>
    </Fragment>
  );
};

async function login(formData: { email: string; password: string }) {
  "use server";
  if(!formData.email || !formData.password) {
    return {
      error: "Please fill all the fields"
    }
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (data.error) {
    return {
      error: data.error,
    };
  }

  return {
    user: data.user,
  };
}

export default async function loginPage() {

  return (
    <div className="w-full my-8 ">
      <div
        className={cn(
          "drop-shadow-xl lg:rounded-3xl lg:p-12 p-10 space-y-3 bg-white text-slate-800 lg:w-[30%] w-full lg:h-fit h-full mx-auto",
          "flex flex-col gap-4",
          "border"
        )}
      >
        <Header />
        <LoginForm formAction={login}/>
      </div>
    </div>
  );
}
