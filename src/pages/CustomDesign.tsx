import { useCallback, useMemo, useRef, useState, type DragEvent } from "react";
import ReactFlow, {
  addEdge,
  getConnectedEdges,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  MarkerType,
  useReactFlow,
  ReactFlowProvider,
  type Connection,
  type Edge,
  type Node,
  type ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

import { CustomNode } from "@/components/CustomNode";
import { CustomSidebar } from "@/components/CustomSidebar";
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
  const { getNodes } = useReactFlow();

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodesDelete = useCallback(
    (deletedNodes: Node[]) => {
      const connectedEdges = getConnectedEdges(deletedNodes, getNodes());
      const edgeIdsToRemove = connectedEdges.map((edge) => edge.id);
      setEdges((prevEdges) =>
        prevEdges.filter((edge) => !edgeIdsToRemove.includes(edge.id)),
      );
    },
    [getNodes, setEdges],
  );

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
        onNodesDelete={onNodesDelete}
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
    <div className="flex h-screen w-full">
      <CustomSidebar />
      <ReactFlowProvider>
        <CustomCanvas />
        <PropertiesPanel />
      </ReactFlowProvider>
    </div>
  );
};
