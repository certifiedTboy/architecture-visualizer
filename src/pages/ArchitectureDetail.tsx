import React from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft, CheckCircle2, List, Target } from 'lucide-react';
import { architectures } from '../data/architectures';
import { DiagramCanvas } from '../components/DiagramCanvas';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export const ArchitectureDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const architecture = architectures.find(a => a.id === params.id);

  if (!architecture) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Architecture Not Found</h2>
        <Link href="/">
          <Button>Return to Browse</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center gap-4 p-4 border-b shrink-0 bg-background/95 backdrop-blur z-10 sticky top-0">
        <Link href="/">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{architecture.title}</h1>
            <Badge>{architecture.category}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{architecture.shortDescription}</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col">
        {/* Diagram Area - Takes up roughly 60% of viewport height via flex-1, but let's give it a min-h */}
        <div className="w-full h-[60vh] min-h-[500px] border-b bg-muted/10 relative">
          <DiagramCanvas architecture={architecture} />
        </div>

        {/* Details Area */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          <p className="text-lg text-foreground mb-12 max-w-4xl leading-relaxed">
            {architecture.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Key Components */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-primary">
                <List className="h-5 w-5" />
                <h3 className="font-semibold text-lg">Key Components</h3>
              </div>
              <ul className="space-y-3">
                {architecture.keyComponents.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
                <h3 className="font-semibold text-lg">Benefits</h3>
              </div>
              <ul className="space-y-3">
                {architecture.benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/50 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-500">
                <Target className="h-5 w-5" />
                <h3 className="font-semibold text-lg">Use Cases</h3>
              </div>
              <ul className="space-y-3">
                {architecture.useCases.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500/50 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
