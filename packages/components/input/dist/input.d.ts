import * as React from "react";
import { type VariantProps } from "class-variance-authority";
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
declare const inputVariants: (props?: ({
    size?: "sm" | "default" | "lg" | "xl" | "2xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface InputProps extends Omit<React.ComponentProps<"input">, "size">, VariantProps<typeof inputVariants> {
}
declare function Input({ className, type, size, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
export { Input, inputVariants };
//# sourceMappingURL=input.d.ts.map