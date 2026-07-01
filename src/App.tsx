import { useState } from "react";
import {
  Switch,
  Route,
  Router as WouterRouter,
  Link,
  useLocation,
} from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "./pages/not-found";
import { Home } from "./pages/Home";
import { CustomDesign } from "./pages/CustomDesign";
import { ArchitectureDetail } from "./pages/ArchitectureDetail";

const queryClient = new QueryClient();

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [location] = useLocation();
  const isCustomDesignPage = location === "/custom-design";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          {isCustomDesignPage ? (
            <Route path="/custom-design" component={CustomDesign} />
          ) : (
            <div className="flex h-screen bg-background text-foreground overflow-hidden">
              <main className="flex-1 h-screen overflow-y-auto relative scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background">
                <Switch>
                  <Route path="/">
                    <Home
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />
                  </Route>
                  <Route path="/architecture/:id">
                    <ArchitectureDetail
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />
                  </Route>

                  <Route component={NotFound} />
                </Switch>
              </main>
              <div className="fixed bottom-8 right-8 z-10">
                <Link
                  to="/custom-design"
                  className="cursor-pointer rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-semibold p-4 shadow-lg hover:bg-primary/90"
                >
                  Create Custom Design
                </Link>
              </div>
            </div>
          )}
        </WouterRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
