/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const getUserPreferences = () => {
  const preferences = localStorage.getItem("userPreferences");
  return preferences
    ? JSON.parse(preferences)
    : { sources: [], categories: [], authors: [] };
};

const setUserPreferences = (preferences: any) => {
  localStorage.setItem("userPreferences", JSON.stringify(preferences));
};

interface PreferencesProps {
  onUpdatePreferences: (preferences: any) => void;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      date: string;
      category: string;
      source: string;
    }>
  >;
}

const Preferences: React.FC<PreferencesProps> = ({
  onUpdatePreferences,
  setFilters,
}) => {
  const [sources, setSources] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);

  useEffect(() => {
    const preferences = getUserPreferences();
    setSources(preferences.sources);
    setCategories(preferences.categories);
    setAuthors(preferences.authors);
  }, [setFilters]);

  const handleSavePreferences = () => {
    const preferences = { sources, categories, authors };
    setUserPreferences(preferences);
    onUpdatePreferences(preferences);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h3>Customize Your News Feed</h3>
      <div>
        <Label>Sources:</Label>
        <Input
          type="text"
          value={sources.join(", ")}
          onChange={(e) =>
            setSources(e.target.value.split(",").map((s) => s.trim()))
          }
        />
      </div>
      <div>
        <Label>Categories:</Label>
        <Input
          type="text"
          value={categories.join(", ")}
          onChange={(e) =>
            setCategories(e.target.value.split(",").map((c) => c.trim()))
          }
        />
      </div>
      <div>
        <Label>Authors:</Label>
        <Input
          type="text"
          value={authors.join(", ")}
          onChange={(e) =>
            setAuthors(e.target.value.split(",").map((a) => a.trim()))
          }
        />
      </div>
      <Button onClick={handleSavePreferences}>Save Preferences</Button>
    </div>
  );
};

export default Preferences;
