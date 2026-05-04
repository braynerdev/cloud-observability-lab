import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "./code-block";
import { cn } from "@/lib/utils";
import React from "react";

interface StepCardProps {
  step: number;
  title: string;
  description: React.ReactNode;
  code?: string;
  language?: string;
  badge?: string;
  className?: string;
  children?: React.ReactNode;
}

export function StepCard({
  step,
  title,
  description,
  code,
  language,
  badge,
  className,
  children,
}: StepCardProps) {
  return (
    <div className={cn("flex gap-4 md:gap-6", className)}>
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-md">
          {step}
        </div>
        <div className="mt-2 flex-1 w-px bg-border" />
      </div>

      <Card className="mb-6 flex-1 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-2">
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
            <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground leading-relaxed">{description}</div>
          {code && <CodeBlock code={code} language={language} />}
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
