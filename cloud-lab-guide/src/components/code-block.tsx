"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "bash", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative rounded-xl border border-border bg-zinc-950 dark:bg-zinc-900 overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 gap-1.5 text-zinc-400 hover:text-white hover:bg-white/10"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-400" />
              <span className="text-xs text-green-400">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="text-xs">Copiar</span>
            </>
          )}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-zinc-100 font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
