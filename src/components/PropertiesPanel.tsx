import { useRef, useState } from "react";
import { type Node, useReactFlow, useOnSelectionChange } from "reactflow";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PropertiesPanel = () => {
  const dragConstraintsRef = useRef<HTMLDivElement>(null);
  const { setNodes } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNode(nodes.length === 1 ? nodes[0] : null);
    },
  });

  if (!selectedNode) {
    return null;
  }

  const onDataChange = (field: string, value: string) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, [field]: value } }
          : node,
      ),
    );
    setSelectedNode((node) =>
      node ? { ...node, data: { ...node.data, [field]: value } } : null,
    );
  };

  return (
    <motion.aside
      ref={dragConstraintsRef}
      drag
      dragMomentum={false}
      dragConstraints={dragConstraintsRef}
      className="absolute top-4 right-4 z-10 w-80 bg-background p-4 rounded-lg border shadow-lg flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold cursor-grab active:cursor-grabbing">
        Properties
      </h2>
      <div className="space-y-4">
        <Label htmlFor="label-input">Label</Label>
        <Input
          id="label-input"
          value={selectedNode.data.label}
          onChange={(e) => onDataChange("label", e.target.value)}
        />
      </div>
      <div className="space-y-4">
        <Label htmlFor="component-name-input">Component Name</Label>
        <Input
          id="component-name-input"
          value={selectedNode.data.nodeType}
          onChange={(e) => {
            const newType = e.target.value.toLowerCase();
            const newIcon = newType;
            setNodes((nodes) =>
              nodes.map((node) =>
                node.id === selectedNode.id
                  ? {
                      ...node,
                      data: { ...node.data, nodeType: newType, icon: newIcon },
                    }
                  : node,
              ),
            );
            setSelectedNode((node) =>
              node
                ? {
                    ...node,
                    data: { ...node.data, nodeType: newType, icon: newIcon },
                  }
                : null,
            );
          }}
        />
      </div>

      <div className="flex text-[10px] items-center gap-2 text-muted-foreground">
        <Trash2 className="h-4 w-4" />
        <span className="text-[12px]">Press Delete or Backspace to delete</span>
      </div>
    </motion.aside>
  );
};
