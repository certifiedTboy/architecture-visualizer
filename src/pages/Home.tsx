import { architectures } from "../data/architectures";
import { ArchitectureCard } from "../components/ArchitectureCard";

interface HomeProps {
  searchQuery: string;
  selectedCategory: string | null;
}

export const Home = ({ searchQuery, selectedCategory }: HomeProps) => {
  const filteredArchitectures = architectures.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? a.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen bg-background">
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
  );
};
