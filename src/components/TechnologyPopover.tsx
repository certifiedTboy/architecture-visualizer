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

interface Technology {
  name: string;
  url: string;
}

interface TechnologyPopoverProps {
  technologies: Technology[];
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
              {technologies.map((tech: Technology, index: number) => (
                <a
                  key={index}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-popover-foreground no-underline"
                >
                  <CommandItem className="flex cursor-pointer items-center gap-2">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <span>{tech?.name}</span>
                  </CommandItem>
                </a>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
