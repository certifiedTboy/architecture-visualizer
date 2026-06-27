import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";
import { Home } from "./pages/Home";
import { ArchitectureDetail } from "./pages/ArchitectureDetail";
import { Sidebar } from "./components/Sidebar";

const queryClient = new QueryClient();

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="flex h-screen bg-background text-foreground overflow-hidden">
            <Sidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <main className="flex-1 h-screen overflow-y-auto relative">
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
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
