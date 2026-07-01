import { useMemo } from "react";
import { architectures } from "@/data/architectures";

export const useArchitectures = (
  searchQuery: string,
  selectedCategory: string | null,
) => {
  const categories = useMemo(
    () => Array.from(new Set(architectures.map((a) => a.category))),
    [],
  );

  const filteredArchitectures = useMemo(() => {
    return architectures.filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory
        ? a.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return { filteredArchitectures, categories };
};
