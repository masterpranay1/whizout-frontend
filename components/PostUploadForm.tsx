"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useUser } from "./contexts/UserContext";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PostUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");

  const [user] = useUser();
  const route = useRouter();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!content) {
      toast.error("Content cannot be empty");
      return;
    }

    if (!user) {
      route.push("/login");
      toast.error("You need to be logged in to upload a post");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    {
      file && formData.append("image", file as Blob);
    }
    formData.append("userId", user?.id as string);

    toast.loading("Uploading post...");

    const res = await fetch(
      `https://whizout.pockethost.io/api/collections/posts/records`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.error) {
      toast.error(data.error);
      return;
    }

    toast.success("Post uploaded successfully");

    // TODO : limit image upload size
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
      <Textarea
        placeholder="What's on your mind?"
        onChange={(event) => setContent(event.target.value)}
        name="content"
      />
      <Input
        type="file"
        name="post-image"
        className="w-fit"
        onChange={(event) => {
          if (!event.target.files) return;

          setFile(event.target.files?.[0]);
        }}
      />

      <DialogClose asChild>
        <Button
          variant={"default"}
          type="submit"
          className="w-full py-2 rounded-xl bg-blue-500 hover:bg-blue-600"
        >
          Upload
        </Button>
      </DialogClose>
    </form>
  );
}
