"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@igreen/utils";
const Checkbox = React.forwardRef(({ className, ...props }, ref) => (_jsx(CheckboxPrimitive.Root, { ref: ref, className: cn("peer size-4 shrink-0 rounded-xs bg-background", "shadow-[0_0_0_1.5px_var(--border-strong)]", "focus-visible:outline-none focus-visible:ring-[length:var(--ring-focus-width-lg)]  focus-visible:ring-ring/50", "disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_0_0_1.5px_var(--primary)] data-[state=checked]:text-primary-foreground", "transition-[color,box-shadow,background-color]", className), ...props, children: _jsx(CheckboxPrimitive.Indicator, { className: cn("flex items-center justify-center text-current"), children: _jsx(Check, { className: "size-3.5" }) }) })));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
export { Checkbox };
//# sourceMappingURL=checkbox.js.map