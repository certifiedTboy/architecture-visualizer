import React from "react";
import { Link, useLocation } from "wouter";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useArchitectures } from "@/hooks/use-architectures";

interface SidebarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (val: string | null) => void;
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  isMobile = false,
}) => {
  const [location] = useLocation();

  const { filteredArchitectures, categories } = useArchitectures(
    searchQuery,
    selectedCategory,
  );

  return (
    <aside
      className={`h-full flex-col flex shrink-0 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-sidebar ${
        isMobile ? "w-full" : "w-80 border-r bg-sidebar hidden md:flex"
      }`}
    >
      <div className="p-6 border-b flex-shrink-0 ">
        {isMobile && (
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
              AV
            </div>
            <span className="font-bold text-lg tracking-tight">
              Architecture Visualizer
            </span>
          </Link>
        )}

        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search architectures..."
            className="pl-9 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-sidebar"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
            data-testid="badge-category-all"
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(cat)}
              data-testid={`badge-category-${cat}`}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredArchitectures.map((arch) => {
          const isActive = location === `/architecture/${arch.id}`;
          return (
            <Link
              key={arch.id}
              href={`/architecture/${arch.id}`}
              className={`block p-3 rounded-md transition-colors ${
                isActive
                  ? "bg-primary/10 border-primary/20 border"
                  : "hover:bg-muted border border-transparent"
              }`}
              data-testid={`link-sidebar-${arch.id}`}
            >
              <div className="flex items-center justify-between mb-1">
                <h3
                  className={`text-sm font-medium ${isActive ? "text-primary" : "text-foreground"}`}
                >
                  {arch.title}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {arch.category}
              </p>
            </Link>
          );
        })}

        {filteredArchitectures.length === 0 && (
          <div className="text-center p-4 text-sm text-muted-foreground">
            No architectures found.
          </div>
        )}
      </div>
    </aside>
  );
};
