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

export const CustomSidebar = () => {
  return (
    <aside className="w-64 h-screen border-r bg-background flex flex-col pb-16">
      <h2 className="text-xl font-bold p-4 pb-0">Nodes</h2>
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background">
        <DraggableNode nodeType="server" label="Server" icon={Server} />
        <DraggableNode nodeType="database" label="Database" icon={Database} />
        <DraggableNode nodeType="client" label="Client" icon={Globe} />
        <DraggableNode nodeType="gateway" label="Gateway" icon={Shield} />
        <DraggableNode nodeType="cdn" label="CDN" icon={Cloud} />
        <DraggableNode nodeType="queue" label="Queue" icon={Layers} />
        <DraggableNode nodeType="cache" label="Cache" icon={DatabaseZap} />
        <DraggableNode
          nodeType="container"
          label="Container"
          icon={Container}
        />
        <DraggableNode nodeType="monitor" label="Monitor" icon={Monitor} />
        <DraggableNode nodeType="storage" label="Storage" icon={HardDrive} />
        <DraggableNode
          nodeType="function"
          label="Function"
          icon={FunctionSquare}
        />
        <DraggableNode
          nodeType="loadbalancer"
          label="Load Balancer"
          icon={GitFork}
        />
        <DraggableNode nodeType="custom-node" label="Custom" icon={PenSquare} />
      </div>
    </aside>
  );
};
