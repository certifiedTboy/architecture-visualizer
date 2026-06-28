export interface Architecture {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  keyComponents: string[];
  benefits: string[];
  useCases: string[];
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface ArchitectureNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    icon: string;
    nodeType: string;
    technologies?: { name: string; url: string }[];
  };
}

export interface ArchitectureEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  label?: string;
  type?: string;
}
