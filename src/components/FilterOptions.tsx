import React from "react";
import { ComboBoxResponsive } from "./ui/search-select";
import { CategorySelectData, SourcesSelectData } from "@/data/news-api";

interface FilterOptionsProps {
  onFilterChange: (filterType: string, value: string) => void;
  filters: {
    date: string;
    category: string;
    source: string;
  };
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  onFilterChange,
  filters,
}) => {
  return (
    <div className="flex space-x-4">
      <ComboBoxResponsive
        data={[
          { value: "newest", label: "Newest" },
          { value: "oldest", label: "Oldest" },
        ]}
        label="Sort by Date"
        onSelect={(value) => onFilterChange("date", value)}
        value={filters?.date}
      />{" "}
      <ComboBoxResponsive
        data={CategorySelectData}
        label="Select category"
        onSelect={(value) => onFilterChange("category", value)}
        value={filters?.category}
      />
      <ComboBoxResponsive
        data={SourcesSelectData}
        label="Select Source"
        onSelect={(value) => onFilterChange("source", value)}
        value={filters?.source}
      />
    </div>
  );
};

export default FilterOptions;
