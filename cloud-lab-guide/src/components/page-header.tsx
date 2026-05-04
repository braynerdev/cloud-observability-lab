import { Badge } from "@/components/ui/badge";
import React from "react";

interface PageHeaderProps {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function PageHeader({ step, title, description, icon }: PageHeaderProps) {
  return (
    <div className="mb-10 space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          {icon}
        </div>
        <Badge variant="outline" className="text-sm font-semibold px-3 py-1">
          {step}
        </Badge>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
      <div className="h-1 w-16 rounded-full bg-primary" />
    </div>
  );
}
