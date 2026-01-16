import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@igreen/utils"

/**
 * Input Component
 * 
 * Styled based on iGreen Design System.
 * Uses --h-formcontrol-* tokens for consistent sizing with Button.
 * 
 * Sizes:
 * - sm: 32px (--h-formcontrol-sm)
 * - default: 36px (--h-formcontrol-md)
 * - lg: 40px (--h-formcontrol-lg)
 * - xl: 44px (--h-formcontrol-xl)
 * - 2xl: 48px (--h-formcontrol-2xl)
 */

const inputVariants = cva(
  // Base styles
  [
    // Colors & selection
    "file:text-foreground placeholder:text-muted-foreground",
    "selection:bg-primary selection:text-primary-foreground",
    "border-input bg-background text-foreground",
    // Focus
    "focus-visible:border-ring focus-visible:ring-ring/50",
    "focus-visible:ring-[length:var(--ring-focus-width)] focus-visible:outline-none",
    // Layout
    "w-full min-w-0 rounded-lg border shadow-xs",
    "transition-[color,box-shadow]",
    // File input
    "file:inline-flex file:border-0 file:bg-transparent file:font-medium",
    // Disabled
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    // Invalid
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    // Dark mode
    "dark:bg-input/30",
  ],
  {
    variants: {
      size: {
        // Small: 32px height
        sm: [
          "h-formcontrol-sm px-2.5 py-1",
          "text-sm", // Always 14px
          "file:h-6 file:text-sm",
        ],

        // Default: 36px height
        default: [
          "h-formcontrol-md px-3 py-1",
          "text-sm", // Always 14px
          "file:h-7 file:text-sm",
        ],

        // Large: 40px height
        lg: [
          "h-formcontrol-lg px-4 py-2",
          "text-sm", // Always 14px
          "file:h-8 file:text-sm",
        ],

        // Extra Large: 44px height
        xl: [
          "h-formcontrol-xl px-4 py-2.5",
          "text-sm", // Always 14px
          "file:h-8 file:text-sm",
        ],

        // 2X Large: 48px height
        "2xl": [
          "h-formcontrol-2xl px-5 py-3",
          "text-sm", // Always 14px
          "file:h-9 file:text-sm",
        ],
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

function Input({ className, type, size, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={size}
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
