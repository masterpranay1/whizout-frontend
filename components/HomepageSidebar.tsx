import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import PostUploadForm from "./PostUploadForm";
import HomepageAuth from "./HomepageAuth";
import Link from "next/link";

const CreatePostDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full py-2 rounded-xl border border-blue-500 hover:bg-blue-50 text-slate-600"
        >
          Create Post
        </Button>
      </DialogTrigger>

      <DialogContent>
        <PostUploadForm />
      </DialogContent>
    </Dialog>
  );
};

const SidebarActions = () => {
  return (
    <div className="flex flex-col border w-full py-8 px-8 rounded-xl">
      <CreatePostDialog />

      <Button
        variant={"outline"}
        className="mt-4 w-full py-2 rounded-xl border border-teal-500 hover:bg-teal-50 text-slate-600"
        asChild
      >
        <Link href={"profile"}>Profile</Link>
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
    <div className="w-1/5">
      <HomepageAuth />
      <SidebarActions />
    </div>
  );
};

export default HomepageSidebar;
