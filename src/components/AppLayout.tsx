import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
  children: React.ReactNode;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (val: string | null) => void;
}

export function AppLayout({
  defaultLayout = [20, 80],
  defaultCollapsed = false,
  navCollapsedSize,
  children,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: AppLayoutProps) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full max-h-screen items-stretch"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )}`;
      }}
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={15}
        maxSize={25}
        className={`min-w-[50px] transition-all duration-300 ease-in-out ${
          defaultCollapsed ? "min-w-[50px]" : ""
        }`}
      >
        <div className="flex h-full items-center justify-center p-6">
          <Sidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]}>
        <div className="h-full p-6">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
