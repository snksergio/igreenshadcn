"use client";

import { Button } from "@/components/ui/button";
import { ExampleCard } from "@/components/system/example-card";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <h1 className="text-xl font-bold text-fg-main">
            🌱 iGreen Design System
          </h1>
          <ModeToggle />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-16">
        {/* Button Variants Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-fg-main mb-2">
              Button Component
            </h2>
            <p className="text-fg-secondary">
              Todas as variantes do botão iGreen com efeitos de gradiente e sombra.
            </p>
          </div>

          {/* Primary Variants */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-fg-main">Variantes Principais</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="success">Success</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-fg-main">Tamanhos</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
              <Button size="2xl">2X Large</Button>
            </div>
          </div>

          {/* States */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-fg-main">Estados</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </div>

          {/* Icon Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-fg-main">Botões com Ícone</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="icon-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </Button>
              <Button size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </Button>
              <Button size="icon-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </Button>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Com Ícone
              </Button>
            </div>
          </div>
        </section>

        {/* ExampleCard Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-fg-main mb-2">
              ExampleCard Component
            </h2>
            <p className="text-fg-secondary">
              Componente customizado do sistema com múltiplas variantes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ExampleCard
              title="Card Default"
              description="Este é um card com a variante padrão, utilizando background sólido e sombra sutil."
              variant="default"
            />
            <ExampleCard
              title="Card Outlined"
              description="Este é um card com a variante outlined, utilizando apenas borda sem background preenchido."
              variant="outlined"
            />
          </div>
        </section>

        {/* Color Palette Preview */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-fg-main mb-2">
              Paleta de Cores
            </h2>
            <p className="text-fg-secondary">
              Tokens semânticos do Design System.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg p-4 bg-bg-primary text-fg-on-primary">
              bg-primary
            </div>
            <div className="rounded-lg p-4 bg-bg-success text-fg-on-success">
              bg-success
            </div>
            <div className="rounded-lg p-4 bg-bg-critical text-fg-on-critical">
              bg-critical
            </div>
            <div className="rounded-lg p-4 bg-bg-warning text-fg-on-warning">
              bg-warning
            </div>
            <div className="rounded-lg p-4 bg-bg-info text-fg-on-info">
              bg-info
            </div>
            <div className="rounded-lg p-4 bg-bg-secondary text-fg-secondary border border-border">
              bg-secondary
            </div>
            <div className="rounded-lg p-4 bg-bg-muted text-fg-muted border border-border">
              bg-muted
            </div>
            <div className="rounded-lg p-4 bg-bg-accent text-fg-main border border-border">
              bg-accent
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-fg-secondary">
          <p>iGreen Design System • Instalado via CLI v0.0.13</p>
        </div>
      </footer>
    </div>
  );
}
