import React from "react";
import { Link } from "wouter";
import { PanelLeft } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

interface MainLayoutProps {
  children: React.ReactNode;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (val: string | null) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
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
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
