import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl">Project not found</h1>
        <p className="mt-4 text-muted-foreground">
          The case study you requested does not exist or was removed.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back to portfolio</Link>
        </Button>
      </div>
    </main>
  );
}
