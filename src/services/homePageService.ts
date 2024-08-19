import axios from "axios";

const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY as string;
console.log(NYT_API_KEY);
export const fetchLatestNews = async (): Promise<Article[]> => {
  const response = await axios.get(
    `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json`,
    {
      params: {
        "api-key": NYT_API_KEY,
      },
    }
  );
  return response.data.results;
};

type MediaMetadata = {
  url: string;
  format: string;
  height: number;
  width: number;
};

type Media = {
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
  approved_for_syndication: number;
  "media-metadata": MediaMetadata[];
};

type Article = {
  uri: string;
  url: string;
  id: number;
  asset_id: number;
  source: string;
  published_date: string;
  updated: string;
  section: string;
  subsection: string;
  nytdsection: string;
  adx_keywords: string;
  column: string | null;
  byline: string;
  type: string;
  title: string;
  abstract: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  media: Media[];
  eta_id: number;
};
