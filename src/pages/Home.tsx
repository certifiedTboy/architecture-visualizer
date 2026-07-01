import { Link } from "wouter";
import { PanelLeft } from "lucide-react";
import { ArchitectureCard } from "../components/ArchitectureCard";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { useArchitectures } from "@/hooks/use-architectures";

interface HomeProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (val: string | null) => void;
}

export const Home = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: HomeProps) => {
  const { filteredArchitectures } = useArchitectures(
    searchQuery,
    selectedCategory,
  );
  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <header className="flex items-center justify-between gap-2 md:gap-4 p-2 md:p-4 border-b shrink-0 print:hidden">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[300px]">
              <Sidebar
                isMobile
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
              AV
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:inline">
              Architecture Visualizer
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-foreground">
                System Architecture Visualizer
              </h1>
              <p className="text-md md:text-lg text-muted-foreground max-w-3xl">
                Explore interactive, highly detailed system design patterns.
                Perfect for studying, interview prep, or finding reference
                architectures for your next project.
              </p>
            </div>

            {filteredArchitectures.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArchitectures.map((arch) => (
                  <ArchitectureCard key={arch.id} architecture={arch} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border rounded-lg border-dashed bg-muted/20">
                <p className="text-muted-foreground">
                  No architectures found matching your filters.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
