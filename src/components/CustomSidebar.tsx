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
  type LucideIcon,
} from "lucide-react";

interface DraggableNodeProps {
  nodeType: string;
  label: string;
  icon: LucideIcon;
}

const DraggableNode = ({ nodeType, label, icon: Icon }: DraggableNodeProps) => {
  const onDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="border p-4 rounded-md flex flex-col items-center gap-2 cursor-grab bg-card hover:bg-muted transition-colors"
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
    >
      <Icon className="h-8 w-8 text-primary" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

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
