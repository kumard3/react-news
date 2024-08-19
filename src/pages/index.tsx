import { useQuery } from "@tanstack/react-query";
import ArticleCard from "@/components/ArticleCard";
import { sliceArray } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { HomePageInitialData } from "@/data/home-page-inital-data";
import { fetchLatestNews } from "@/services/homePageService";
import { useMediaQuery } from "@/hook/use-media-query";
export default function Home() {
  const {
    data: fetchLatest,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topHeadlines"],
    queryFn: fetchLatestNews,
    initialData: HomePageInitialData,
  });
  const matches = useMediaQuery("(min-width: 768px)");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="container mx-auto font-bbc ">
      <h1>Top Headlines</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[3fr,1fr] gap-8">
        <div className="flex flex-col-reverse  md:grid  md:grid-cols-[1fr,2fr] gap-8">
          <div className="flex flex-col gap-5">
            {fetchLatest &&
              sliceArray<(typeof fetchLatest)[0]>(fetchLatest, 0, 2)?.map(
                (article) => {
                  if (article?.media) {
                    return (
                      <ArticleCard
                        key={article.id}
                        url={article.url}
                        title={article?.title}
                        description={article.abstract}
                        publishedDate={article.published_date}
                        imageUrl={
                          article?.media[0] &&
                          article?.media[0]["media-metadata"][2]?.url
                        }
                        source={article.source}
                        separator={false}
                        small={!matches}
                      />
                    );
                  }
                }
              )}
          </div>
          <div className="w-full">
            {fetchLatest &&
              sliceArray<(typeof fetchLatest)[0]>(fetchLatest, 3, 4).map(
                (article) => {
                  return (
                    <ArticleCard
                      key={article.id}
                      url={article.url}
                      title={article?.title}
                      description={article.abstract}
                      publishedDate={article.published_date}
                      imageUrl={article.media[0]["media-metadata"][2].url}
                      classNameHeader="text-3xl"
                      source={article.source}
                      separator={false}
                    />
                  );
                }
              )}
          </div>
        </div>
        <div>
          <div className="grid  md:grid-cols-2  justify-start lg:grid-cols-1 gap-5">
            {fetchLatest &&
              sliceArray<(typeof fetchLatest)[0]>(fetchLatest, 5, 9)?.map(
                (article) => {
                  return (
                    <ArticleCard
                      key={article.id}
                      url={article.url}
                      title={article?.title}
                      description={article.abstract}
                      publishedDate={article.published_date}
                      separator={false}
                      source={article.source}
                    />
                  );
                }
              )}
          </div>
        </div>
      </div>
      <div className="py-20">
        <Separator className=" mb-10 font-bold  bg-black" />
        <h1 className="text-xl font-semibold">More news</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {fetchLatest &&
            sliceArray<(typeof fetchLatest)[0]>(fetchLatest, 10, 19)?.map(
              (article) => {
                if (article?.media) {
                  return (
                    <ArticleCard
                      key={article.id}
                      url={article.url}
                      title={article?.title}
                      description={article.abstract}
                      publishedDate={article.published_date}
                      imageUrl={
                        article?.media[0] &&
                        article?.media[0]["media-metadata"][2]?.url
                      }
                      source={article.source}
                      separator={false}
                    />
                  );
                }
              }
            )}
        </div>
      </div>
    </div>
  );
}
