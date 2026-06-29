import { useEffect, useState } from "react";
import { type Node, useReactFlow, useOnSelectionChange } from "reactflow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PropertiesPanel = () => {
  const { setNodes } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNode(nodes.length === 1 ? nodes[0] : null);
    },
  });

  useEffect(() => {
    if (selectedNode) {
      // This effect can be used to sync panel state with node data if needed
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return null;
  }

  const onLabelChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = evt.target.value;
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node,
      ),
    );
    setSelectedNode((node) =>
      node ? { ...node, data: { ...node.data, label: newLabel } } : null,
    );
  };

  return (
    <aside className="w-80 h-screen border-l bg-background p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Properties</h2>
      <div>
        <Label htmlFor="label-input">Label</Label>
        <Input
          id="label-input"
          value={selectedNode.data.label}
          onChange={onLabelChange}
        />
      </div>
    </aside>
  );
};
