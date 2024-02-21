"use client";
import { useUser } from "./contexts/UserContext";
import { Button } from "./ui/button";

const HomepageAuth = ({}) => {
  const [user] = useUser();

  const { name, username } = user || {};

  return (
    <div className="p-4 border mb-4 rounded-xl text-slate-600 bg-slate-50 shadow-inner">
      {username && (
        <>
          <h2>
            Welcome back <span className="font-bold">{name}</span>
          </h2>
          <p className="text-slate-400">@{username}</p>
        </>
      )}

      {!username && (
        <>
          <h2>Welcome to Wizout</h2>
          <p className="text-slate-400">
            Connect with friends and the world around you on wizout.
          </p>
          <Button
            variant={"outline"}
            className="mt-4 w-full py-2 rounded-xl border border-blue-500 hover:bg-blue-50 text-slate-600"
          >
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
};

export default HomepageAuth;
