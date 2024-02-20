import PostsSection from "@/components/PostsSection";
import HomepageSidebar from "@/components/HomepageSidebar";

export default async function Home() {
  return (
    <div className="w-full flex flex-row px-8 py-8">
      <HomepageSidebar />
      <PostsSection />
    </div>
  );
}
