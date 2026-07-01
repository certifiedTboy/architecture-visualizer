import {
  Server,
  Database,
  Globe,
  Shield,
  Cloud,
  Layers,
  DatabaseZap,
  Container,
  Monitor,
  HardDrive,
  FunctionSquare,
  GitFork,
  PenSquare,
} from "lucide-react";
import { DraggableNode } from "./DraggableNode";

interface CustomSidebarProps {
  onNodeDrag?: () => void;
}

export const CustomSidebar = ({ onNodeDrag }: CustomSidebarProps) => {
  return (
    <aside className="w-full md:w-64 h-full md:h-screen md:border-r bg-background flex flex-col md:pb-16">
      <h2 className="text-xl font-bold p-4 pb-0 hidden md:block">Nodes</h2>
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background">
        <DraggableNode
          onDragStart={onNodeDrag}
          nodeType="server"
          label="Server"
          icon={Server}
        />
        <DraggableNode
          onDragStart={onNodeDrag}
          nodeType="database"
          label="Database"
          icon={Database}
        />
        <DraggableNode
          onDragStart={onNodeDrag}
          nodeType="client"
          label="Client"
          icon={Globe}
        />
        <DraggableNode
          onDragStart={onNodeDrag}
          nodeType="gateway"
          label="Gateway"
          icon={Shield}
        />
        <DraggableNode
          onDragStart={onNodeDrag}
          nodeType="cdn"
          label="CDN"
          icon={Cloud}
        />
        <DraggableNode
          onDragStart={onNodeDrag}
          nodeType="queue"
          label="Queue"
          icon={Layers}
        />
        <DraggableNode
          onDragStart={onNodeDrag}
          nodeType="cache"
          label="Cache"
          icon={DatabaseZap}
        />
        <DraggableNode
          onDragStart={onNodeDrag}
          nodeType="container"
          label="Container"
          icon={Container}
        />
        <DraggableNode
          onDragStart={onNodeDrag}
          nodeType="monitor"
          label="Monitor"
          icon={Monitor}
        />
        <DraggableNode
          onDragStart={onNodeDrag}
          nodeType="storage"
          label="Storage"
          icon={HardDrive}
        />
        <DraggableNode
          onDragStart={onNodeDrag}
          nodeType="function"
          label="Function"
          icon={FunctionSquare}
        />
        <DraggableNode
          onDragStart={onNodeDrag}
          nodeType="loadbalancer"
          label="Load Balancer"
          icon={GitFork}
        />
        <DraggableNode
          onDragStart={onNodeDrag}
          nodeType="custom-node"
          label="Custom"
          icon={PenSquare}
        />
      </div>
    </aside>
  );
};
