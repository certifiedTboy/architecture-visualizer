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
import { ThemeToggle } from "@/components/theme-toggle";
import { Home } from "./pages/Home";
import { CustomDesign } from "./pages/CustomDesign";
import { ArchitectureDetail } from "./pages/ArchitectureDetail";
import { AppLayout } from "@/components/AppLayout";

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
            <CustomDesign />
          ) : (
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

                    <Route path="/custom-design" component={CustomDesign} />
                    <Route component={NotFound} />
                  </Switch>
                </main>
                <div className="fixed bottom-8 right-8">
                  <Link
                    to="/custom-design"
                    className="cursor-pointer rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-semibold p-4"
                  >
                    Create Custom Design
                  </Link>
                </div>
              </div>
            </AppLayout>
          )}
        </WouterRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
