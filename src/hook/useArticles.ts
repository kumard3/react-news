/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { fetchNewsAPIArticles } from "../services/newsApiService";
import { fetchNYTArticles } from "../services/nytService";

export const useArticles = (
  query: string,
  filters: {
    date: string;
    category: string;
    source: string;
  }
) => {
  return useQuery({
    queryKey: ["articles", query, filters],
    queryFn: async () => {
      const newsAPIArticles = await fetchNewsAPIArticles(query, filters);
      const nytArticles = await fetchNYTArticles(query, filters);
      const clearNewsapiData = newsAPIArticles?.map((article) => {
        if (!article?.url.includes("removed.com")) {
          return { ...article };
        }
      });
      if (!nytArticles.error) {
        const clearData = nytArticles?.docs?.map((article) => {
          return {
            title: article.snippet,
            description: article.abstract,
            url: article.uri,
            publishedAt: article.pub_date,
            urlToImage: "",
          };
        });
        return [...clearNewsapiData, ...clearData];
      } else {
        return clearNewsapiData;
      }
    },
    enabled: !!query,
  });
};
