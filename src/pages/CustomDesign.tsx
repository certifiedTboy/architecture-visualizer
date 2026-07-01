import { useCallback, useState } from "react";
import { Link } from "wouter";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { CustomSidebar } from "@/components/CustomSidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileDown, FileImage, FileText, PanelLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { CustomCanvas } from "@/components/CustomCanva";

export const CustomDesign = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const onExportImage = useCallback(() => {
    const wrapper = document.getElementById("reactflow-wrapper");
    if (!wrapper) return;

    toPng(wrapper, {
      backgroundColor: "transparent",
      style: { background: "transparent" },
    })
      .then((dataUrl) => {
        const extName = dataUrl.split(":")[1]?.split(";")[0]?.split("/")[1];

        saveAs(dataUrl, `architecture.${extName || "png"}`);
      })
      .catch(() => {
        // ignore errors
      });
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <header className="flex items-center justify-between gap-2 md:gap-4 p-2 md:p-4 border-b shrink-0 print:hidden">
        <div className="flex items-center gap-2">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Nodes Panel</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[300px]">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Nodes</SheetTitle>
              </SheetHeader>
              <CustomSidebar onNodeDrag={() => setIsSheetOpen(false)} />
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FileDown className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => window.print()}>
                <FileText className="h-4 w-4 mr-2" /> Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onExportImage}>
                <FileImage className="h-4 w-4 mr-2" /> Export as Image
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="print:hidden hidden md:block">
          <CustomSidebar />
        </div>

        <ReactFlowProvider>
          <CustomCanvas />
          <PropertiesPanel />
        </ReactFlowProvider>
      </div>
    </div>
  );
};
