import React, { useState } from "react";
import { useArticles } from "@/hook/useArticles";
import SearchBar from "@/components/SearchBar";
import FilterOptions from "@/components/FilterOptions";
import Preferences from "@/components/Preferences";
import ArticleCard from "@/components/ArticleCard";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    date: "",
    category: "",
    source: "",
  });
  const { data: articles, isLoading, error } = useArticles(query, filters);
  console.log(filters);
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters({ ...filters, [filterType]: value });
  };
  const handleUpdatePreferences = (preferences: string) => {
    console.log(preferences, "preferences");
    // Re-fetch articles based on updated preferences
    setQuery(query);
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-4">News Aggregator</h1>
      <div className="flex flex-col gap-y-5">
        <SearchBar onSearch={handleSearch} />
        <FilterOptions onFilterChange={handleFilterChange} filters={filters} />
        <Preferences
          onUpdatePreferences={handleUpdatePreferences}
          setFilters={setFilters}
        />
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading articles</p>}
        {articles && (
          <div>
            {articles.map((article) => {
              if (article?.urlToImage) {
                return (
                  <ArticleCard
                    key={article?.title}
                    title={article?.title ?? ""}
                    description={article?.description}
                    url={article?.url ?? ""}
                    publishedAt={article?.publishedAt}
                    imageUrl={article?.urlToImage}
                    small={true}
                  />
                );
              } else {
                return (
                  <ArticleCard
                    key={article?.title}
                    title={article?.title ?? ""}
                    description={article?.description}
                    url={article?.url ?? ""}
                    publishedAt={article?.publishedAt}
                  />
                );
              }
            })}
          </div>
        )}

        {!isLoading && articles && articles.length === 0 && (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
