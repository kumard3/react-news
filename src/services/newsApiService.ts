/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY as string;
export const fetchNewsAPIArticles = async (
  query: string,
  filters: any
): Promise<NewsDataArticle[]> => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        from: filters.date ?? "",
        sources: filters.source ?? "bbc-news",
        apiKey: NEWS_API_KEY,
        pageSize: 10,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching NewsAPI articles:", error);
    return [];
  }
};

interface NewsDataArticle {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
