import React from "react";
import { Link } from "wouter";
import { type Architecture } from "../data/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArchitectureCardProps {
  architecture: Architecture;
}

export const ArchitectureCard: React.FC<ArchitectureCardProps> = ({
  architecture,
}) => {
  return (
    <Card className="h-full flex flex-col hover:border-primary/50 transition-colors duration-200">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="mb-2">
            {architecture.category}
          </Badge>
        </div>
        <CardTitle className="text-xl leading-tight">
          {architecture.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-2">
          {architecture.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {architecture.description}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/architecture/${architecture.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full group"
            data-testid={`button-view-${architecture.id}`}
          >
            View Diagram
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
