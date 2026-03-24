import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-foreground",
        muted: "bg-muted text-muted-foreground border-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
