"use client";
import { cn, relativeTimeFromDates } from "@/lib/utils";
import { Button } from "./ui/button";
import { Heart, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import useSWR from "swr";

interface Post {
  username: string;
  content: string;
  created: string;
  likes: number;
  image?: string;
}

async function getPostsId() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/get-all-posts`,
    {
      method: "GET",
      next: {
        tags: ["posts"],
        revalidate: 0,
      },
    }
  ).then((res) => res.json());

  // console.log(res);
  return res;
}

async function getPostById(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/get-post-by-id/${id}`,
    {
      method: "GET",
      next: {
        tags: ["posts"],
        revalidate: 0,
      },
    }
  ).then((res) => res.json());

  // console.log(res);

  return res;
}

async function getAllPosts() {
  const postsId = await getPostsId();

  let posts = [];

  for (let i = 0; i < postsId.length; i++) {
    posts.push(await getPostById(postsId[i]));
  }

  return posts;
}

const useFetchPosts = () => {
  const { data: posts, isLoading, mutate } = useSWR("posts", getAllPosts);
  const [refresh, setRefresh] = useState(false);

  const refreshPosts = async () => {
    setRefresh(true);
    await mutate();
    setRefresh(false);
  };

  return {
    posts: posts || [],
    loading: isLoading,
    fetchPosts: refreshPosts,
    refreshing: refresh,
  };
};

const PostCardUserInfo = ({
  username,
  created,
}: {
  username: string;
  created: string;
}) => {
  return (
    <div className="flex flex-col text-slate-600">
      <h1 className="text-xl font-bold">{username}</h1>
      <p className="text-sm">{relativeTimeFromDates(new Date(created))}</p>
    </div>
  );
};

const PostCardActions = () => {
  return (
    <div className="flex flex-row gap-4 mt-4">
      <Button
        variant={"outline"}
        className="flex flex-row gap-2 items-center rounded-xl border border-red-600 hover:bg-red-50"
      >
        <Heart size={24} className="text-red-600" />
        <span className="text-red-600">Like</span>
      </Button>
      <Button
        variant={"outline"}
        className="flex flex-row gap-2 items-center rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50"
      >
        Comment
      </Button>
    </div>
  );
};

const PostCard = ({
  post,
  cId,
  pId,
}: {
  post: Post;
  cId: string;
  pId: string;
}) => {
  const colors = [
    "border-red-500",
    "border-blue-500",
    "border-green-500",
    "border-yellow-500",
    "border-indigo-500",
    "border-purple-500",
    "border-pink-500",
    "border-teal-500",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={cn([
        "w-full border flex flex-col p-4 rounded-2xl shadow-lg",
        "border",
        randomColor,
        // "shadow-inner",
        // "bg-gradient-to-br from-slate-50 to-slate-100",
      ])}
    >
      <PostCardUserInfo username={post.username} created={post.created} />
      <p className="text-base my-4">{post.content}</p>
      {post.image && (
        <div className="w-full h-72">
          <Image
            src={`${process.env.NEXT_PUBLIC_PB_URL}/${cId}/${pId}/${post.image}`}
            alt="post-image"
            width={400}
            height={400}
            className={cn([
              "h-full w-full object-cover rounded-lg",
              "hover:brightness-50 transition-all duration-300 ease-in-out cursor-pointer",
              "border border-slate-100",
            ])}
          />
        </div>
      )}
      <PostCardActions />
    </div>
  );
};

const SkeletonPostCard = () => {
  return (
    <div
      className={cn([
        "w-full border flex flex-col p-4 rounded-2xl shadow-md",
        "border",
        "border-gray-200",
        "shadow-inner",
      ])}
    >
      <div className="flex flex-row items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-16 h-3" />
        </div>
      </div>
      <Skeleton className="w-3/4 h-4 my-4" />
      <Skeleton className="w-3/4 h-4 my-4" />
      <Skeleton className="w-3/4 h-4 my-4" />
    </div>
  );
};

const RefreshButton = ({
  onClick,
  loading,
}: {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
}) => {
  return (
    <Button
      variant={"outline"}
      className="mr-4 w-fit ml-auto py-2 rounded-xl border border-teal-500 hover:bg-teal-50 text-slate-600"
      onClick={onClick}
    >
      <RefreshCcw
        size={24}
        className={cn([loading ? "animate-spin" : "", "text-teal-500 mr-2"])}
      />
      {loading ? "Loading" : "Refresh"}
    </Button>
  );
};

const PostsSection = () => {
  const { posts, loading, fetchPosts, refreshing } = useFetchPosts();

  return (
    <div className="w-2/5 flex flex-col gap-4 px-8">
      <ScrollArea className="w-full h-screen px-4">
        <RefreshButton
          onClick={async () => {
            await fetchPosts();
          }}
          loading={refreshing || loading}
        />
        <div className="w-full flex flex-col gap-4 mt-4">
          {posts.map((post, index) => (
            <PostCard
              key={index}
              post={{
                username:
                  post.expand.userId.name || post.expand.userId.username,
                content: post.content,
                created: post.created,
                likes: post.likes,
                image: post.image,
              }}
              cId={post.collectionId}
              pId={post.id}
            />
          ))}

          {loading && (
            <div className="flex flex-col gap-4">
              <SkeletonPostCard />
              <SkeletonPostCard />
              <SkeletonPostCard />
            </div>
          )}
        </div>
        <ScrollBar hidden={true} />
      </ScrollArea>
    </div>
  );
};

export default PostsSection;
