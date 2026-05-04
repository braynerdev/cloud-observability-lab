"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Terminal, FileCode2, Container, Activity, GitBranch } from "lucide-react";

const navItems = [
  { href: "/", label: "Terraform", icon: Terminal, step: "01" },
  { href: "/main-tf", label: "main.tf", icon: FileCode2, step: "02" },
  { href: "/portainer", label: "Portainer", icon: Container, step: "03" },
  { href: "/swarm-monitor", label: "Swarm", icon: Activity, step: "04" },
  { href: "/deploy-app", label: "Deploy", icon: GitBranch, step: "05" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 transition-all",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
