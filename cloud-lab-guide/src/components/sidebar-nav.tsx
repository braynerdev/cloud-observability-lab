"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Terminal,
  FileCode2,
  Container,
  Activity,
  GitBranch,
  Cloud,
} from "lucide-react";

const navItems = [
  {
    href: "/",
    label: "Terraform & AWS CLI",
    icon: Terminal,
    step: "01",
  },
  {
    href: "/main-tf",
    label: "Explicando o main.tf",
    icon: FileCode2,
    step: "02",
  },
  {
    href: "/portainer",
    label: "Subindo o Portainer",
    icon: Container,
    step: "03",
  },
  {
    href: "/swarm-monitor",
    label: "Swarm Monitor",
    icon: Activity,
    step: "04",
  },
  {
    href: "/deploy-app",
    label: "Deploy do GitHub",
    icon: GitBranch,
    step: "05",
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-border bg-sidebar min-h-screen sticky top-0">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Cloud className="h-4 w-4" />
        </div>
        <div>
          <p className="font-bold text-sm leading-tight">Cloud Observability</p>
          <p className="text-xs text-muted-foreground">Lab Guide</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150",
                isActive
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <span
                className={cn(
                  "text-xs font-mono font-bold w-6 shrink-0",
                  isActive ? "text-primary-foreground/70" : "text-muted-foreground/60"
                )}
              >
                {item.step}
              </span>
              <Icon className="h-4 w-4 shrink-0" />
              <span className="leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-border">
        <p className="text-xs text-muted-foreground">Cloud Observability Lab</p>
      </div>
    </aside>
  );
}
