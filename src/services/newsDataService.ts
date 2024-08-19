/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ArticleTypes } from "../type";

const NEWS_DATA_API_KEY = import.meta.env.VITE_NEWS_DATA_API_KEY as string;
export const fetchNewsDataArticles = async (
  query: string,
  filters: any
): Promise<ArticleTypes[]> => {
  try {
    const response = await axios.get("https://newsdata.io/api/1/latest", {
      params: {
        apikey: NEWS_DATA_API_KEY,
        q: query,
        category: filters.category,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching NewsData articles:", error);
    return [];
  }
};
