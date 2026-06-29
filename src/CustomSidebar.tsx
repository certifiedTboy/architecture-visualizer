import {
  Server,
  Database,
  Globe,
  Shield,
  Cloud,
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
    <aside className="w-64 h-screen border-r bg-background p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Nodes</h2>
      <div className="grid grid-cols-2 gap-4">
        <DraggableNode nodeType="server" label="Server" icon={Server} />
        <DraggableNode nodeType="database" label="Database" icon={Database} />
        <DraggableNode nodeType="client" label="Client" icon={Globe} />
        <DraggableNode nodeType="gateway" label="Gateway" icon={Shield} />
        <DraggableNode nodeType="cdn" label="CDN" icon={Cloud} />
      </div>
    </aside>
  );
};
