"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@igreen/button";
export function ModeToggle() {
    const [theme, setTheme] = React.useState("light");
    React.useEffect(() => {
        const root = window.document.documentElement;
        const isDark = root.classList.contains("dark");
        setTheme(isDark ? "dark" : "light");
    }, []);
    const toggleTheme = () => {
        const root = window.document.documentElement;
        const newTheme = theme === "light" ? "dark" : "light";
        if (newTheme === "dark") {
            root.classList.add("dark");
        }
        else {
            root.classList.remove("dark");
        }
        setTheme(newTheme);
    };
    return (_jsxs(Button, { variant: "ghost", size: "icon", onClick: toggleTheme, className: "relative", children: [_jsx(Sun, { className: "size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }), _jsx(Moon, { className: "absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }), _jsx("span", { className: "sr-only", children: "Alternar tema" })] }));
}
//# sourceMappingURL=mode-toggle.js.map