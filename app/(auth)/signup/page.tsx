import { cn } from "@/lib/utils";
import { Fragment } from "react";
import Link from "next/link";

import SignupForm from "@/components/SignupForm";

const Header = () => {
  return (
    <Fragment>
      <p className="text-3xl font-bold text-teal-600">
        Welcome to the community
      </p>
      <p className="text-base text-slate-400">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-teal-600">
          Login
        </Link>
      </p>
    </Fragment>
  );
};

// signup server action
async function signup(formData: {
  email: string;
  uid: string;
  password: string;
  name: string;
}) {
  "use server";
  if (
    !formData.email ||
    !formData.name ||
    !formData.password ||
    !formData.uid
  ) {
    return {
      error: "Please fill all the fields",
    };
  }
  console.log(formData);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  console.log(data);

  if (data.error) {
    return {
      error: data.error,
    };
  }

  console.log(data.message);

  return {
    user: data.user,
    message: data.message,
  };
}

export default async function SignupPage() {
  return (
    <div className="w-full my-8">
      <div
        className={cn(
          "drop-shadow-xl lg:rounded-3xl lg:p-12 p-10 space-y-3 bg-white text-slate-800 lg:w-[50%] w-full lg:h-fit h-full mx-auto",
          "flex flex-col gap-4",
          "border"
        )}
      >
        <Header />
        <SignupForm formAction={signup} />
      </div>
    </div>
  );
}
