import { useCallback, useRef, useState, type DragEvent } from "react";
import { Link } from "wouter";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  MarkerType,
  ReactFlowProvider,
  type Connection,
  type Edge,
  type Node,
  type ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

import { CustomNode } from "@/components/CustomNode";
import { CustomSidebar } from "@/components/CustomSidebar";
import { Button } from "@/components/ui/button";
import { FileDown, Trash2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { PropertiesPanel } from "@/components/PropertiesPanel";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    data: { label: "Client", nodeType: "client", icon: "globe" },
    position: { x: 250, y: 5 },
  },
];

let id = 2;
const getId = () => `dndnode_${id++}`;

const nodeTypes = { custom: CustomNode };

const CustomCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: getId(),
        type: "custom",
        position,
        data: {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
          nodeType: type,
          icon: type,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  return (
    <div className="flex-1 h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        deleteKeyCode={["Backspace", "Delete"]}
        nodeTypes={nodeTypes}
        fitView
        defaultEdgeOptions={{
          markerEnd: { type: MarkerType.ArrowClosed },
        }}
      >
        <Controls />
        <MiniMap />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
};

export const CustomDesign = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <header className="flex items-center gap-4 p-4 border-b shrink-0 print:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
            AV
          </div>
          <span className="font-bold text-lg tracking-tight">
            Architecture Visualizer
          </span>
        </Link>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-sm text-muted-foreground flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md">
            <Trash2 className="h-4 w-4" />
            <span>Select a node and press Delete or Backspace to delete</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <FileDown className="h-4 w-4 mr-2" />
            Export as PDF
          </Button>
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="print:hidden">
          <CustomSidebar />
        </div>

        <ReactFlowProvider>
          <CustomCanvas />
          <div className="print:hidden">
            <PropertiesPanel />
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};
