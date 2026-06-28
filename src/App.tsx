import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "./pages/not-found";
import { ThemeToggle } from "@/components/theme-toggle";
import { Home } from "./pages/Home";
import { ArchitectureDetail } from "./pages/ArchitectureDetail";
import { AppLayout } from "@/components/AppLayout";

const queryClient = new QueryClient();

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppLayout
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            >
              <div className="flex h-screen bg-background text-foreground overflow-hidden">
                <main className="flex-1 h-screen overflow-y-auto relative scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background">
                  <div className="fixed right-0 mr-12.5 mt-12.5">
                    <ThemeToggle />
                  </div>
                  <Switch>
                    <Route path="/">
                      <Home
                        searchQuery={searchQuery}
                        selectedCategory={selectedCategory}
                      />
                    </Route>
                    <Route
                      path="/architecture/:id"
                      component={ArchitectureDetail}
                    />
                    <Route component={NotFound} />
                  </Switch>
                </main>
              </div>
            </AppLayout>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
