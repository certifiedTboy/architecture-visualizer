import { Handle, Position } from "reactflow";
import * as LucideIcons from "lucide-react";
import { type ArchitectureNode } from "../data/architectures";

const nodeColors: Record<
  string,
  { bg: string; border: string; text: string; icon: string }
> = {
  client: {
    bg: "bg-blue-100 dark:bg-blue-900/40",
    border: "border-blue-300 dark:border-blue-700",
    text: "text-blue-900 dark:text-blue-100",
    icon: "text-blue-600 dark:text-blue-400",
  },
  server: {
    bg: "bg-indigo-100 dark:bg-indigo-900/40",
    border: "border-indigo-300 dark:border-indigo-700",
    text: "text-indigo-900 dark:text-indigo-100",
    icon: "text-indigo-600 dark:text-indigo-400",
  },
  database: {
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    border: "border-emerald-300 dark:border-emerald-700",
    text: "text-emerald-900 dark:text-emerald-100",
    icon: "text-emerald-600 dark:text-emerald-400",
  },
  gateway: {
    bg: "bg-orange-100 dark:bg-orange-900/40",
    border: "border-orange-300 dark:border-orange-700",
    text: "text-orange-900 dark:text-orange-100",
    icon: "text-orange-600 dark:text-orange-400",
  },
  queue: {
    bg: "bg-purple-100 dark:bg-purple-900/40",
    border: "border-purple-300 dark:border-purple-700",
    text: "text-purple-900 dark:text-purple-100",
    icon: "text-purple-600 dark:text-purple-400",
  },
  cache: {
    bg: "bg-red-100 dark:bg-red-900/40",
    border: "border-red-300 dark:border-red-700",
    text: "text-red-900 dark:text-red-100",
    icon: "text-red-600 dark:text-red-400",
  },
  cdn: {
    bg: "bg-cyan-100 dark:bg-cyan-900/40",
    border: "border-cyan-300 dark:border-cyan-700",
    text: "text-cyan-900 dark:text-cyan-100",
    icon: "text-cyan-600 dark:text-cyan-400",
  },
  container: {
    bg: "bg-teal-100 dark:bg-teal-900/40",
    border: "border-teal-300 dark:border-teal-700",
    text: "text-teal-900 dark:text-teal-100",
    icon: "text-teal-600 dark:text-teal-400",
  },
  monitor: {
    bg: "bg-yellow-100 dark:bg-yellow-900/40",
    border: "border-yellow-300 dark:border-yellow-700",
    text: "text-yellow-900 dark:text-yellow-100",
    icon: "text-yellow-600 dark:text-yellow-400",
  },
  storage: {
    bg: "bg-slate-100 dark:bg-slate-800/60",
    border: "border-slate-300 dark:border-slate-600",
    text: "text-slate-900 dark:text-slate-100",
    icon: "text-slate-600 dark:text-slate-400",
  },
  function: {
    bg: "bg-violet-100 dark:bg-violet-900/40",
    border: "border-violet-300 dark:border-violet-700",
    text: "text-violet-900 dark:text-violet-100",
    icon: "text-violet-600 dark:text-violet-400",
  },
  loadbalancer: {
    bg: "bg-amber-100 dark:bg-amber-900/40",
    border: "border-amber-300 dark:border-amber-700",
    text: "text-amber-900 dark:text-amber-100",
    icon: "text-amber-600 dark:text-amber-400",
  },
  default: {
    bg: "bg-gray-100 dark:bg-gray-800",
    border: "border-gray-300 dark:border-gray-600",
    text: "text-gray-900 dark:text-gray-100",
    icon: "text-gray-500 dark:text-gray-400",
  },
};

export const CustomNode = ({ data }: { data: ArchitectureNode["data"] }) => {
  const IconComponent =
    data.icon && (LucideIcons as any)[data.icon]
      ? (LucideIcons as any)[data.icon]
      : LucideIcons.Box;

  const type = data.nodeType || "default";
  const colors = nodeColors[type] || nodeColors.default;

  return (
    <div
      className={`px-4 py-3 shadow-md rounded-lg border-2 ${colors.bg} ${colors.border} flex flex-col items-center justify-center min-w-[140px]`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 !bg-gray-400 border-none"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-gray-400 border-none"
        id="top"
      />

      <div className={`mb-2 ${colors.icon}`}>
        <IconComponent size={24} strokeWidth={1.5} />
      </div>

      <div className={`font-semibold text-sm text-center ${colors.text}`}>
        {data.label}
      </div>

      {data.nodeType && (
        <div
          className={`mt-1 text-[10px] uppercase tracking-wider opacity-70 font-mono ${colors.text}`}
        >
          {data.nodeType}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-gray-400 border-none"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-gray-400 border-none"
        id="bottom"
      />
    </div>
  );
};
