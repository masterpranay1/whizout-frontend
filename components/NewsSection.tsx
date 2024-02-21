import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

async function fetchNews() {
  "use server";
  const res = await fetch(
    "https://newsdata.io/api/1/news?apikey=pub_387289d88fd6d7c09175fc056572e85bda2d9&q=technology",
    {
      next: {
        tags: ["news"],
      },
    }
  ).then((res) => res.json());

  const news = res.results.map((news: any) => {
    return {
      title: news.title,
      description: news.description,
      link: news.link,
    };
  });

  return news;
}

const NewsCard = ({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) => {
  return (
    <div className="mb-4">
      <div className="font-bold">{title}</div>
      <div className="text-sm mt-4">{description}</div>
    </div>
  );
};

export default async function NewsSection() {
  const news = await fetchNews();

  return (
    <div className="w-1/4">
      <ScrollArea className="h-screen">
        {news.map((news: any) => (
          <NewsCard key={news.title} {...news} />
        ))}
      </ScrollArea>
    </div>
  );
}
