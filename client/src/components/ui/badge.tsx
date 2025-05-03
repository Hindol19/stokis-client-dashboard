import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary ring-primary/20",
        secondary: "bg-secondary/10 text-secondary-foreground ring-secondary/20",
        destructive: "bg-destructive/10 text-destructive ring-destructive/20",
        outline: "text-foreground ring-border",
        success: "bg-success/20 text-success ring-success/30",
        warning: "bg-warning/20 text-warning ring-warning/30",
        error: "bg-error/20 text-error ring-error/30",
        neutral: "bg-muted text-muted-foreground ring-muted/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
