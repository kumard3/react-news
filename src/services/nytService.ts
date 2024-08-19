/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const NYT_API_KEY = import.meta.env.NYT_API_KEY as string;

export const fetchNYTArticles = async (
  query: string,
  filters: {
    date: string;
    category: string;
    source: string;
  }
): Promise<Data> => {
  try {
    const response = await axios.get(
      "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      {
        params: {
          q: query,
          fq: `news_desk:("${filters.category}")`,
          "api-key": NYT_API_KEY,
          sort: filters.date,
        },
      }
    );

    return response.data.response;
  } catch (error) {
    console.error("Error fetching NYT articles:", error);
    return {
      docs: [],
      meta: {
        hits: 0,
        offset: 0,
        time: 0,
      },
      error: "Error fetching NYT articles",
    };
  }
};

interface Multimedia {
  rank: number;
  subtype: string;
  caption: string | null;
  credit: string | null;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: Record<string, unknown>;
  subType: string;
  crop_name: string;
}

interface Headline {
  main: string;
  kicker: string | null;
  content_kicker: string | null;
  print_headline: string | null;
  name: string | null;
  seo: string | null;
  sub: string | null;
}

interface Byline {
  original: string | null;
  person: Array<any>;
  organization: string | null;
}

interface Article {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: Multimedia[];
  headline: Headline;
  keywords: Array<any>;
  pub_date: string;
  document_type: string;
  news_desk: string;
  byline: Byline;
  _id: string;
  word_count: number;
  uri: string;
}

interface Meta {
  hits: number;
  offset: number;
  time: number;
}

interface Data {
  docs: Article[];
  meta: Meta;
  error?: string;
}
