"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Button
      variant="secondary"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      suppressHydrationWarning
    >
      {mounted ? (
        theme === "dark" ? <Sun size={17} /> : <Moon size={17} />
      ) : (
        <span className="h-[17px] w-[17px]" />
      )}
    </Button>
  );
}
