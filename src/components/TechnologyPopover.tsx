import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Cpu } from "lucide-react";

interface TechnologyPopoverProps {
  technologies: string[];
  children: React.ReactNode;
}

export const TechnologyPopover: React.FC<TechnologyPopoverProps> = ({
  technologies,
  children,
}) => {
  if (!technologies || technologies.length === 0) {
    return <>{children}</>;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandGroup heading="Example Technologies">
              {technologies.map((tech) => (
                <CommandItem key={tech} className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <span>{tech}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
