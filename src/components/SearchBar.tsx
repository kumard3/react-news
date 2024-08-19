import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex ">
      <Input
        type="text"
        placeholder="Search articles..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-r-0 outline-none rounded-r-none"
      />
      <Button onClick={() => void handleSearch()} className="rounded-l-none">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
