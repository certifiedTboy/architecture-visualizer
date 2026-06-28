import React, { useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { CustomNode } from "@/components/CustomNode";
import { type Architecture } from "@/data/types";
import { useTheme } from "next-themes";

interface DiagramCanvasProps {
  architecture: Architecture;
}

export const DiagramCanvas: React.FC<DiagramCanvasProps> = ({
  architecture,
}) => {
  const { theme } = useTheme();

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const edges = useMemo(() => {
    return architecture.edges.map((edge) => ({
      ...edge,
      style: {
        stroke: theme === "dark" ? "#4b5563" : "#9ca3af",
        strokeWidth: 2,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: theme === "dark" ? "#4b5563" : "#9ca3af",
      },
    }));
  }, [architecture.edges, theme]);

  return (
    <div
      className="w-full h-full min-h-[500px] border rounded-xl overflow-hidden bg-background relative"
      data-testid="diagram-canvas"
    >
      <ReactFlow
        nodes={architecture.nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
      >
        <Background color={theme === "dark" ? "#374151" : "#d1d5db"} gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(__: any) => {
            return theme === "dark" ? "#4b5563" : "#d1d5db";
          }}
          maskColor={
            theme === "dark" ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.4)"
          }
        />
      </ReactFlow>
    </div>
  );
};
