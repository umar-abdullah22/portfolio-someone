"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";

const navItems = [
  { href: "#about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "#work", label: "Work" },
  { href: "#proof", label: "Proof" },
  { href: "#contact", label: "Contact" }
];

export function SiteHeader({ brandName = "Momna Zaheer" }: { brandName?: string }) {
  const pathname = usePathname();

  const buildHref = (href: string) => {
    if (href.startsWith("/")) return href;
    return pathname === "/" ? href : `/${href}`;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container py-5">
        <div className="glass-panel flex items-center justify-between rounded-full px-4 py-2">
          <Link
            href="/"
            className="font-display text-sm uppercase tracking-[0.2em] md:text-base"
          >
            {brandName}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={buildHref(item.href)}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Magnetic>
              <Button asChild size="default">
                <Link href={buildHref("#contact")}>Hire Me</Link>
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
