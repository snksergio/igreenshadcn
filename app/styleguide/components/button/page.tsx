import { 
  Mail, 
  ChevronRight, 
  Download, 
  Plus,
  Trash2,
  ExternalLink,
  Settings,
  ArrowRight,
  Check,
  X
} from "lucide-react"

import { Button } from "@/components/ui/button"

// Componente para exibir código da prop
function PropLabel({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
      {children}
    </code>
  )
}

// Componente wrapper para cada exemplo
function ExampleCard({ 
  title, 
  children,
  code
}: { 
  title: string
  children: React.ReactNode
  code?: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
      </div>
      <div className="flex flex-wrap items-center gap-4 p-4">
        {children}
      </div>
      {code && (
        <div className="border-t border-border bg-muted/30 px-4 py-2">
          <code className="font-mono text-xs text-muted-foreground">{code}</code>
        </div>
      )}
    </div>
  )
}

// Seção wrapper
function Section({ 
  title, 
  description, 
  children 
}: { 
  title: string
  description: string
  children: React.ReactNode 
}) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}

export default function ButtonPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Button
          </h1>
          <span className="rounded-full bg-bg-primary-subtle px-2 py-0.5 text-xs font-medium text-fg-primary">
            Component
          </span>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          Exibe um botão ou um componente que parece um botão.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a 
            href="https://ui.shadcn.com/docs/components/button" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-fg-primary underline-offset-4 hover:underline"
          >
            Documentação Shadcn UI
            <ExternalLink className="size-3" />
          </a>
        </div>

        {/* Design Specs */}
        <div className="mt-6 rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Design Specs (Figma)</h4>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Primary & Destructive:</p>
              <ul className="text-xs text-fg-muted space-y-1">
                <li>• Gradient overlay (12% → 0%)</li>
                <li>• Inset shadow 1px (25% white)</li>
              </ul>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Tamanhos (--h-formcontrol-*):</p>
              <ul className="text-xs text-fg-muted space-y-1">
                <li>• sm: 32px (--h-formcontrol-sm)</li>
                <li>• default: 36px (--h-formcontrol-md)</li>
                <li>• lg: 40px (--h-formcontrol-lg)</li>
                <li>• xl: 44px (--h-formcontrol-xl)</li>
                <li>• 2xl: 48px (--h-formcontrol-2xl)</li>
              </ul>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Border Radius:</p>
              <ul className="text-xs text-fg-muted space-y-1">
                <li>• rounded-lg (--radius)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Variants Showcase */}
      <Section 
        title="Variants" 
        description="Todas as variantes de estilo disponíveis para o Button."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ExampleCard title="Default (Primary)" code='variant="default"'>
            <Button variant="default">Primary Button</Button>
            <PropLabel>variant=&quot;default&quot;</PropLabel>
          </ExampleCard>

          <ExampleCard title="Secondary" code='variant="secondary"'>
            <Button variant="secondary">Secondary</Button>
            <PropLabel>variant=&quot;secondary&quot;</PropLabel>
          </ExampleCard>

          <ExampleCard title="Destructive" code='variant="destructive"'>
            <Button variant="destructive">Destructive</Button>
            <PropLabel>variant=&quot;destructive&quot;</PropLabel>
          </ExampleCard>

          <ExampleCard title="Outline" code='variant="outline"'>
            <Button variant="outline">Outline</Button>
            <PropLabel>variant=&quot;outline&quot;</PropLabel>
          </ExampleCard>

          <ExampleCard title="Ghost" code='variant="ghost"'>
            <Button variant="ghost">Ghost</Button>
            <PropLabel>variant=&quot;ghost&quot;</PropLabel>
          </ExampleCard>

          <ExampleCard title="Link" code='variant="link"'>
            <Button variant="link">Link</Button>
            <PropLabel>variant=&quot;link&quot;</PropLabel>
          </ExampleCard>

          <ExampleCard title="Success" code='variant="success"'>
            <Button variant="success">Success</Button>
            <PropLabel>variant=&quot;success&quot;</PropLabel>
          </ExampleCard>
        </div>
      </Section>

      {/* Sizes Showcase */}
      <Section 
        title="Sizes" 
        description="Todos os tamanhos disponíveis para o Button, usando tokens --h-formcontrol-*."
      >
        {/* Text Buttons */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h4 className="text-sm font-medium text-foreground mb-4">Text Buttons</h4>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col items-center gap-2">
              <Button size="sm">Small</Button>
              <PropLabel>size=&quot;sm&quot;</PropLabel>
              <span className="text-xs text-muted-foreground">32px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="default">Default</Button>
              <PropLabel>size=&quot;default&quot;</PropLabel>
              <span className="text-xs text-muted-foreground">36px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="lg">Large</Button>
              <PropLabel>size=&quot;lg&quot;</PropLabel>
              <span className="text-xs text-muted-foreground">40px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="xl">Extra Large</Button>
              <PropLabel>size=&quot;xl&quot;</PropLabel>
              <span className="text-xs text-muted-foreground">44px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="2xl">2X Large</Button>
              <PropLabel>size=&quot;2xl&quot;</PropLabel>
              <span className="text-xs text-muted-foreground">48px</span>
            </div>
          </div>
        </div>

        {/* Icon Buttons */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h4 className="text-sm font-medium text-foreground mb-4">Icon Buttons</h4>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col items-center gap-2">
              <Button size="icon-sm" variant="outline">
                <Plus className="size-4" />
              </Button>
              <PropLabel>icon-sm</PropLabel>
              <span className="text-xs text-muted-foreground">32px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon" variant="outline">
                <Plus className="size-4" />
              </Button>
              <PropLabel>icon</PropLabel>
              <span className="text-xs text-muted-foreground">36px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon-lg" variant="outline">
                <Plus className="size-4" />
              </Button>
              <PropLabel>icon-lg</PropLabel>
              <span className="text-xs text-muted-foreground">40px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon-xl" variant="outline">
                <Plus className="size-4" />
              </Button>
              <PropLabel>icon-xl</PropLabel>
              <span className="text-xs text-muted-foreground">44px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon-2xl" variant="outline">
                <Plus className="size-5" />
              </Button>
              <PropLabel>icon-2xl</PropLabel>
              <span className="text-xs text-muted-foreground">48px</span>
            </div>
          </div>
        </div>
      </Section>

      {/* With Icons */}
      <Section 
        title="With Icons" 
        description="Botões com ícones para melhorar a comunicação visual."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ExampleCard title="Icon Left" code="<Mail /> Login with Email">
            <Button>
              <Mail />
              Login with Email
            </Button>
          </ExampleCard>

          <ExampleCard title="Icon Right" code="Next <ChevronRight />">
            <Button>
              Next
              <ChevronRight />
            </Button>
          </ExampleCard>

          <ExampleCard title="Download" code="<Download /> Download">
            <Button variant="secondary">
              <Download />
              Download
            </Button>
          </ExampleCard>

          <ExampleCard title="Destructive with Icon" code="<Trash2 /> Delete">
            <Button variant="destructive">
              <Trash2 />
              Delete
            </Button>
          </ExampleCard>

          <ExampleCard title="Success with Icon" code="<Check /> Confirm">
            <Button variant="success">
              <Check />
              Confirm
            </Button>
          </ExampleCard>

          <ExampleCard title="Ghost with Icon" code="<Settings /> Settings">
            <Button variant="ghost">
              <Settings />
              Settings
            </Button>
          </ExampleCard>
        </div>
      </Section>

      {/* States */}
      <Section 
        title="States" 
        description="Estados interativos e variações do Button."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ExampleCard title="Loading (prop)" code="loading={true}">
            <Button loading>
              Processing
            </Button>
            <PropLabel>loading</PropLabel>
          </ExampleCard>

          <ExampleCard title="Disabled" code="disabled">
            <Button disabled>Disabled</Button>
            <PropLabel>disabled</PropLabel>
          </ExampleCard>

          <ExampleCard title="Loading Variants">
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" loading>
                Loading
              </Button>
              <Button variant="destructive" loading>
                Deleting
              </Button>
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* Visual Comparison - Gradient & Shadow */}
      <Section 
        title="Efeitos Visuais" 
        description="Comparação dos efeitos de gradient e shadow nos botões Primary, Destructive e Success."
      >
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Primary</h4>
              <div className="space-y-2">
                <Button size="lg" className="w-full">
                  <Check />
                  Confirm Action
                </Button>
                <p className="text-xs text-muted-foreground">
                  Gradient: white 12% → 0%<br />
                  Shadow: inset 1px white 25%
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Destructive</h4>
              <div className="space-y-2">
                <Button variant="destructive" size="lg" className="w-full">
                  <Trash2 />
                  Delete Item
                </Button>
                <p className="text-xs text-muted-foreground">
                  Gradient: white 12% → 0%<br />
                  Shadow: inset 1px white 25%
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Success</h4>
              <div className="space-y-2">
                <Button variant="success" size="lg" className="w-full">
                  <Check />
                  Save Changes
                </Button>
                <p className="text-xs text-muted-foreground">
                  Gradient: white 12% → 0%<br />
                  Shadow: inset 1px white 25%
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* All Variants × All Sizes Matrix */}
      <Section 
        title="Variants × Sizes Matrix" 
        description="Matriz completa combinando todas as variantes com todos os tamanhos."
      >
        <div className="overflow-x-auto">
          <div className="rounded-lg border border-border bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Variant / Size
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    sm
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    default
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    lg
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    xl
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    icon
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">default</td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="default" size="sm">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="default" size="default">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="default" size="lg">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="default" size="xl">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="default" size="icon"><Plus className="size-4" /></Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">destructive</td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="destructive" size="sm">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="destructive" size="default">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="destructive" size="lg">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="destructive" size="xl">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="destructive" size="icon"><Trash2 className="size-4" /></Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">success</td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="success" size="sm">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="success" size="default">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="success" size="lg">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="success" size="xl">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="success" size="icon"><Check className="size-4" /></Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">secondary</td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="secondary" size="sm">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="secondary" size="default">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="secondary" size="lg">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="secondary" size="xl">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="secondary" size="icon"><Plus className="size-4" /></Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">outline</td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="outline" size="sm">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="outline" size="default">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="outline" size="lg">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="outline" size="xl">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="outline" size="icon"><Plus className="size-4" /></Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">ghost</td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="ghost" size="sm">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="ghost" size="default">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="ghost" size="lg">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="ghost" size="xl">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="ghost" size="icon"><Settings className="size-4" /></Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">link</td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="link" size="sm">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="link" size="default">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="link" size="lg">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="link" size="xl">Button</Button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="link" size="icon"><ExternalLink className="size-4" /></Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Usage Examples */}
      <Section 
        title="Usage Examples" 
        description="Exemplos práticos de uso do Button em contextos reais."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form Actions */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Form Actions</h4>
            <div className="flex gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>

          {/* Destructive Confirmation */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Destructive Confirmation</h4>
            <div className="flex gap-3">
              <Button variant="ghost">
                <X />
                Cancel
              </Button>
              <Button variant="destructive">
                <Trash2 />
                Delete Account
              </Button>
            </div>
          </div>

          {/* CTA Group */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Call to Action</h4>
            <div className="flex flex-wrap gap-3">
              <Button size="lg">
                Get Started
                <ArrowRight />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Icon Toolbar */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Icon Toolbar</h4>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon-sm">
                <Plus className="size-4" />
              </Button>
              <Button variant="ghost" size="icon-sm">
                <Download className="size-4" />
              </Button>
              <Button variant="ghost" size="icon-sm">
                <Settings className="size-4" />
              </Button>
              <Button variant="ghost" size="icon-sm">
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>

          {/* Loading States */}
          <div className="rounded-lg border border-border bg-card p-6 lg:col-span-2">
            <h4 className="mb-4 text-sm font-medium text-foreground">Loading States</h4>
            <div className="flex flex-wrap gap-3">
              <Button loading>Saving...</Button>
              <Button variant="secondary" loading>Processing...</Button>
              <Button variant="destructive" loading>Deleting...</Button>
              <Button variant="success" loading>Confirming...</Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
