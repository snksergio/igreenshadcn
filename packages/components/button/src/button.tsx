import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@igreen/utils"

/**
 * Button Component
 * 
 * Styled based on iGreen Design System (Figma)
 * 
 * Features:
 * - Primary, Destructive & Success: gradient overlay + inset shadow for lighting effect
 * - Consistent spacing and sizing across all variants
 * - Full dark mode support
 * 
 * Visual Effects (from theme tokens):
 * - --gradient-shine: top highlight gradient
 * - --shadow-inset-shine: inner glow effect
 * - shadow-xs/sm/md/lg: remapped to use neutral-700
 */

// === STYLE COMPOSITION HELPERS ===

// Shadow: inset shine + drop shadow (shadow-xs uses neutral-700 from theme)
const SHADOW_ELEVATED = "shadow-xs [box-shadow:var(--shadow-inset-shine),var(--tw-shadow)]"
const SHADOW_PRESSED = "shadow-xs [box-shadow:var(--shadow-inset-shine-pressed),var(--tw-shadow)]"

// Gradient overlay (applied on top of background-color)
const GRADIENT_SHINE = "[background-image:var(--gradient-shine)]"

const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-lg text-sm font-medium",
    "transition-[color,background-color,border-color,box-shadow,outline] duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
    "shrink-0 [&_svg]:shrink-0",
    // ring-ring-primarysfocus-visible:ring-offset-2 focus-visible:ring-offset-backgrounda com box-shadow customizado)
    "focus-visible:ring-[length:var(--ring-focus-width)] focus-visible:ring-ring/50  focus-visible:outline-none",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        // Primary: border + inset shadow (lighting) + gradient overlay
        default: [
          "text-fg-on-primary",
          "border border-border-primary",
          SHADOW_ELEVATED,
          "bg-bg-primary",
          GRADIENT_SHINE,
          "hover:bg-bg-primary-hover",
          `active:${SHADOW_PRESSED}`,
        ],

        // Destructive: border + inset shadow (lighting) + gradient overlay
        destructive: [
          "text-fg-on-critical",
          "border border-destructive",
          SHADOW_ELEVATED,
          "bg-bg-critical",
          GRADIENT_SHINE,
          "hover:bg-bg-critical-hover",
          `active:${SHADOW_PRESSED}`,
          "focus-visible:ring-ring-critical",
        ],

        // Ou: bordered style with subtle shadowcerto
        outline: [
          "border border-border-default bg-background",
          "text-fg-main",
          SHADOW_ELEVATED,
          "hover:bg-bg-accent hover:border-border-strong",
          "active:bg-bg-muted",
        ],

        // Secondary: subtle background with shadow
        secondary: [
          "bg-bg-secondary text-fg-secondary",
          "border border-border-default",
          SHADOW_ELEVATED,
          "hover:bg-bg-secondary-hover hover:border-border-strong",
          "active:bg-bg-muted",
        ],

        // Ghost: no background until hover (no shadow)
        ghost: [
          "text-fg-main",
          "hover:bg-bg-accent hover:text-fg-main",
          "active:bg-bg-muted",
        ],

        // Link: text only with underline on hover (no shadow)
        link: [
          "text-fg-primary",
          "underline-offset-4 hover:underline",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
        ],

        // Success: border + inset shadow (lighting) + gradient overlay
        success: [
          "text-fg-on-success",
          "border border-success-600",
          SHADOW_ELEVATED,
          "bg-bg-success",
          GRADIENT_SHINE,
          "hover:bg-bg-success-hover",
          `active:${SHADOW_PRESSED}`,
          "focus-visible:ring-ring-success",
        ],
      },

      size: {
        // Small: 32px height (--h-formcontrol-sm)
        sm: "h-formcontrol-sm px-3 py-1.5 text-sm gap-1.5", // 14px

        // Default: 36px height (--h-formcontrol-md)
        default: "h-formcontrol-md px-4 py-2 text-sm", // 14px

        // Large: 40px height (--h-formcontrol-lg)
        lg: "h-formcontrol-lg px-5 py-2 text-sm", // 14px

        // Extra Large: 44px height (--h-formcontrol-xl)
        xl: "h-formcontrol-xl px-6 py-2.5 text-sm", // 14px

        // 2X Large: 48px height (--h-formcontrol-2xl)
        "2xl": "h-formcontrol-2xl px-8 py-3 text-sm", // 14px

        // Icon only buttons (using same tokens)
        icon: "size-[var(--h-formcontrol-md)] p-0",
        "icon-sm": "size-[var(--h-formcontrol-sm)] p-0",
        "icon-lg": "size-[var(--h-formcontrol-lg)] p-0",
        "icon-xl": "size-[var(--h-formcontrol-xl)] p-0",
        "icon-2xl": "size-[var(--h-formcontrol-2xl)] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        data-loading={loading}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="size-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
