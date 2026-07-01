import { type LucideIcon } from "lucide-react";

interface DraggableNodeProps {
  nodeType: string;
  label: string;
  icon: LucideIcon;
  onDragStart?: () => void;
}

export const DraggableNode = ({
  nodeType,
  label,
  icon: Icon,
  onDragStart: onDragStartProp,
}: DraggableNodeProps) => {
  const onDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
    onDragStartProp?.();
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
