import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@nxss/ui";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:opacity-80",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-input/25 shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs [&_svg]:size-4",
        md: "h-9 px-4 py-2 [&_svg]:size-4",
        lg: "h-10 rounded-md px-8 [&_svg]:size-5",
        xl: "text-md h-11 rounded-md px-10 [&_svg]:size-5",
        icon: "size-8 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled = loading,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled}
      children={
        loading ? (
          <React.Fragment>
            {children}
            <IconLoader2 className="animate-spin" />
          </React.Fragment>
        ) : (
          children
        )
      }
      {...props}
    />
  );
}
