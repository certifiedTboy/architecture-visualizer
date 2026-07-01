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
import { Layout } from "./components/Layout";
import { useArchitectures } from "./hooks/use-architectures";

const queryClient = new QueryClient();

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [location] = useLocation();
  const isCustomDesignPage = location === "/custom-design";

  const { filteredArchitectures } = useArchitectures(
    searchQuery,
    selectedCategory,
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          {isCustomDesignPage ? (
            <Route path="/custom-design" component={CustomDesign} />
          ) : (
            <Layout
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            >
              <Switch>
                <Route path="/">
                  <Home
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    filteredArchitectures={filteredArchitectures}
                  />
                </Route>
                <Route path="/architecture/:id">
                  {(params) => <ArchitectureDetail id={params.id} />}
                </Route>
                <Route component={NotFound} />
              </Switch>
            </Layout>
          )}
          {!isCustomDesignPage && (
            <div className="fixed bottom-8 right-8 z-10">
              <Link
                to="/custom-design"
                className="cursor-pointer rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-semibold p-4 shadow-lg hover:bg-primary/90"
              >
                Create Custom Design
              </Link>
            </div>
          )}
        </WouterRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
