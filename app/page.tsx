import PostsSection from "@/components/PostsSection";
import HomepageSidebar from "@/components/HomepageSidebar";
import NewsSection from "@/components/NewsSection";

export default async function Home() {
  return (
    <div className="w-full flex flex-row justify-between px-8 py-8">
      <HomepageSidebar />
      <PostsSection />
      <NewsSection />
    </div>
  );
}
