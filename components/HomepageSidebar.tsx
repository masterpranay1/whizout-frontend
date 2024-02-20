import { Button } from "./ui/button";

const HomepageAuth = ({
  username,
  name,
}: {
  username: string;
  name: string;
}) => {
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

const SidebarActions = () => {
  return (
    <div className="flex flex-col border w-full py-8 px-8 rounded-xl">
      <Button
        variant={"outline"}
        className="w-full py-2 rounded-xl border border-blue-500 hover:bg-blue-50 text-slate-600"
      >
        Create Post
      </Button>

      <Button
        variant={"outline"}
        className="mt-4 w-full py-2 rounded-xl border border-teal-500 hover:bg-teal-50 text-slate-600"
      >
        Profile
      </Button>

      <Button
        variant={"outline"}
        className="mt-4 w-full py-2 rounded-xl border border-violet-500 hover:bg-violet-50 text-slate-600"
      >
        Instant Connect
      </Button>

      <Button
        variant={"outline"}
        className="mt-4 w-full py-2 rounded-xl border border-pink-500 hover:bg-pink-50 text-slate-600"
      >
        Global Chat
      </Button>
    </div>
  );
};

const HomepageSidebar = () => {
  return (
    <div className="mr-16 w-1/5">
      <HomepageAuth username="johndoe" name="John Doe" />
      <SidebarActions />
    </div>
  );
};

export default HomepageSidebar;
