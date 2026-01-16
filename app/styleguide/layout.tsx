"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen } from "lucide-react"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { navigation } from "./navigation"

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r border-border-muted bg-bg-canvas">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-border-muted px-4">
          <Link 
            href="/styleguide" 
            className="flex items-center gap-2 font-semibold text-fg-main"
          >
            <BookOpen className="size-5 text-fg-primary" />
            <span>Styleguide</span>
          </Link>
          <ModeToggle />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navigation.map((section) => (
            <div key={section.title} className="mb-6">
              <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-fg-muted">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.links.map((link) => {
                  const isActive = pathname === link.href
                  const Icon = link.icon
                  
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-bg-accent text-fg-main"
                            : "text-fg-moderate hover:bg-bg-accent/50 hover:text-fg-main"
                        )}
                      >
                        {Icon && <Icon className="size-4" />}
                        {link.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border-muted p-4">
          <p className="text-xs text-fg-muted">
            iGreen Theme · Shadcn v4
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 overflow-y-auto bg-bg-background">
        <div className="container max-w-6xl px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
