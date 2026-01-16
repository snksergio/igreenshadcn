import { 
  ExternalLink,
  Mail,
  Lock,
  Search,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Calendar,
  DollarSign
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
      <div className="flex flex-col gap-4 p-4">
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

export default function InputPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Input
          </h1>
          <span className="rounded-full bg-bg-primary-subtle px-2 py-0.5 text-xs font-medium text-fg-primary">
            Component
          </span>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          Exibe um campo de entrada de formulário ou um componente que parece um campo de entrada.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a 
            href="https://ui.shadcn.com/docs/components/input" 
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
          <h4 className="text-sm font-semibold text-foreground mb-3">Design Specs</h4>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
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
              <p className="text-muted-foreground mb-1">Estados:</p>
              <ul className="text-xs text-fg-muted space-y-1">
                <li>• Default, Focus, Disabled</li>
                <li>• Invalid (aria-invalid)</li>
                <li>• File input support</li>
              </ul>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Focus Ring:</p>
              <ul className="text-xs text-fg-muted space-y-1">
                <li>• Ring width: 3px</li>
                <li>• Ring color: ring/50</li>
                <li>• Border highlight: ring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sizes Showcase */}
      <Section 
        title="Tamanhos" 
        description="Todos os tamanhos disponíveis para o Input, usando tokens --h-formcontrol-*."
      >
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label>Small (32px)</Label>
                <Input size="sm" placeholder="size='sm'" />
              </div>
              <PropLabel>size=&quot;sm&quot;</PropLabel>
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label>Default (36px)</Label>
                <Input placeholder="size='default'" />
              </div>
              <PropLabel>size=&quot;default&quot;</PropLabel>
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label>Large (40px)</Label>
                <Input size="lg" placeholder="size='lg'" />
              </div>
              <PropLabel>size=&quot;lg&quot;</PropLabel>
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label>Extra Large (44px)</Label>
                <Input size="xl" placeholder="size='xl'" />
              </div>
              <PropLabel>size=&quot;xl&quot;</PropLabel>
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label>2X Large (48px)</Label>
                <Input size="2xl" placeholder="size='2xl'" />
              </div>
              <PropLabel>size=&quot;2xl&quot;</PropLabel>
            </div>
          </div>
        </div>

        {/* Input + Button Alignment */}
        <div className="rounded-lg border border-border bg-card p-6 mt-4">
          <h4 className="text-sm font-medium text-foreground mb-4">Input + Button Alignment</h4>
          <p className="text-xs text-muted-foreground mb-4">
            Inputs e Buttons usam os mesmos tokens de altura, garantindo alinhamento perfeito.
          </p>
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <Input size="sm" placeholder="Email" className="flex-1" />
              <Button size="sm">Subscribe</Button>
            </div>
            <div className="flex gap-2 items-center">
              <Input placeholder="Email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
            <div className="flex gap-2 items-center">
              <Input size="lg" placeholder="Email" className="flex-1" />
              <Button size="lg">Subscribe</Button>
            </div>
            <div className="flex gap-2 items-center">
              <Input size="xl" placeholder="Email" className="flex-1" />
              <Button size="xl">Subscribe</Button>
            </div>
            <div className="flex gap-2 items-center">
              <Input size="2xl" placeholder="Email" className="flex-1" />
              <Button size="2xl">Subscribe</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Default Examples */}
      <Section 
        title="Exemplos Básicos" 
        description="Variações básicas do componente Input."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ExampleCard title="Default" code='<Input type="email" placeholder="Email" />'>
            <Input type="email" placeholder="Email" />
          </ExampleCard>

          <ExampleCard title="Password" code='<Input type="password" placeholder="Password" />'>
            <Input type="password" placeholder="Password" />
          </ExampleCard>

          <ExampleCard title="Search" code='<Input type="search" placeholder="Search..." />'>
            <Input type="search" placeholder="Search..." />
          </ExampleCard>

          <ExampleCard title="Number" code='<Input type="number" placeholder="0" />'>
            <Input type="number" placeholder="0" />
          </ExampleCard>

          <ExampleCard title="Date" code='<Input type="date" />'>
            <Input type="date" />
          </ExampleCard>

          <ExampleCard title="Time" code='<Input type="time" />'>
            <Input type="time" />
          </ExampleCard>
        </div>
      </Section>

      {/* With Label */}
      <Section 
        title="Com Label" 
        description="Inputs com labels para melhor acessibilidade."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ExampleCard title="Email com Label" code='<Label htmlFor="email">Email</Label><Input id="email" ... />'>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email-example">Email</Label>
              <Input type="email" id="email-example" placeholder="seu@email.com" />
            </div>
          </ExampleCard>

          <ExampleCard title="Username com Label" code='<Label htmlFor="username">Username</Label>'>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="username-example">Username</Label>
              <Input id="username-example" placeholder="@username" />
            </div>
          </ExampleCard>

          <ExampleCard title="Password com Label" code='<Label htmlFor="password">Password</Label>'>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password-example">Password</Label>
              <Input type="password" id="password-example" placeholder="••••••••" />
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* States */}
      <Section 
        title="Estados" 
        description="Diferentes estados do componente Input."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ExampleCard title="Disabled" code="disabled">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="disabled-example">Disabled Input</Label>
              <Input disabled id="disabled-example" placeholder="Disabled..." />
            </div>
            <PropLabel>disabled</PropLabel>
          </ExampleCard>

          <ExampleCard title="Invalid" code='aria-invalid="true"'>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="invalid-example">Invalid Input</Label>
              <Input aria-invalid="true" id="invalid-example" placeholder="Invalid input" defaultValue="invalid@" />
            </div>
            <PropLabel>aria-invalid=&quot;true&quot;</PropLabel>
          </ExampleCard>

          <ExampleCard title="Read Only" code="readOnly">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="readonly-example">Read Only</Label>
              <Input readOnly id="readonly-example" defaultValue="Read only value" />
            </div>
            <PropLabel>readOnly</PropLabel>
          </ExampleCard>
        </div>
      </Section>

      {/* File Input */}
      <Section 
        title="File Input" 
        description="Input para upload de arquivos."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <ExampleCard title="File Upload" code='<Input type="file" />'>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="picture">Imagem de Perfil</Label>
              <Input id="picture" type="file" />
            </div>
          </ExampleCard>

          <ExampleCard title="Multiple Files" code='<Input type="file" multiple />'>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="documents">Documentos</Label>
              <Input id="documents" type="file" multiple accept=".pdf,.doc,.docx" />
            </div>
            <PropLabel>multiple accept=&quot;.pdf,.doc,.docx&quot;</PropLabel>
          </ExampleCard>
        </div>
      </Section>

      {/* With Button */}
      <Section 
        title="Com Button" 
        description="Combinações de Input com Button para ações."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <ExampleCard title="Subscribe Form" code='<Input /><Button>Subscribe</Button>'>
            <div className="flex w-full items-center gap-2">
              <Input type="email" placeholder="Email" />
              <Button variant="outline">Subscribe</Button>
            </div>
          </ExampleCard>

          <ExampleCard title="Search Form" code='<Input /><Button>Search</Button>'>
            <div className="flex w-full items-center gap-2">
              <Input type="search" placeholder="Search..." />
              <Button>
                <Search className="size-4" />
                Search
              </Button>
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* Input Patterns - Common Use Cases */}
      <Section 
        title="Padrões de Uso" 
        description="Exemplos práticos de uso do Input em contextos reais."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Login Form */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Login Form</h4>
            <div className="space-y-4">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="login-email">Email</Label>
                <Input type="email" id="login-email" placeholder="seu@email.com" />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="login-password">Senha</Label>
                <Input type="password" id="login-password" placeholder="••••••••" />
              </div>
              <Button className="w-full">Entrar</Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Contact Form</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="first-name">Nome</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="last-name">Sobrenome</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input type="email" id="contact-email" placeholder="john@example.com" />
              </div>
              <Button className="w-full">Enviar Mensagem</Button>
            </div>
          </div>

          {/* Search with Filters */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Search with Filters</h4>
            <div className="space-y-4">
              <div className="flex w-full items-center gap-2">
                <Input type="search" placeholder="Buscar produtos..." className="flex-1" />
                <Button variant="outline" size="icon">
                  <Search className="size-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="min-price">Preço Mínimo</Label>
                  <Input type="number" id="min-price" placeholder="R$ 0" />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="max-price">Preço Máximo</Label>
                  <Input type="number" id="max-price" placeholder="R$ 1000" />
                </div>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Date Range</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="start-date">Data Início</Label>
                  <Input type="date" id="start-date" />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="end-date">Data Fim</Label>
                  <Input type="date" id="end-date" />
                </div>
              </div>
              <Button variant="outline" className="w-full">Aplicar Filtro</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Input Types Matrix */}
      <Section 
        title="Tipos de Input" 
        description="Todos os tipos de input HTML suportados."
      >
        <div className="overflow-x-auto">
          <div className="rounded-lg border border-border bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Preview
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Uso
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">text</td>
                  <td className="px-4 py-4">
                    <Input type="text" placeholder="Texto..." className="max-w-xs" />
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Texto genérico
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">email</td>
                  <td className="px-4 py-4">
                    <Input type="email" placeholder="email@exemplo.com" className="max-w-xs" />
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Endereços de email
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">password</td>
                  <td className="px-4 py-4">
                    <Input type="password" placeholder="••••••" className="max-w-xs" />
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Senhas (oculto)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">number</td>
                  <td className="px-4 py-4">
                    <Input type="number" placeholder="0" className="max-w-xs" />
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Valores numéricos
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">tel</td>
                  <td className="px-4 py-4">
                    <Input type="tel" placeholder="(11) 99999-9999" className="max-w-xs" />
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Números de telefone
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">url</td>
                  <td className="px-4 py-4">
                    <Input type="url" placeholder="https://..." className="max-w-xs" />
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    URLs
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">search</td>
                  <td className="px-4 py-4">
                    <Input type="search" placeholder="Buscar..." className="max-w-xs" />
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Campo de busca
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">date</td>
                  <td className="px-4 py-4">
                    <Input type="date" className="max-w-xs" />
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Seletor de data
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">time</td>
                  <td className="px-4 py-4">
                    <Input type="time" className="max-w-xs" />
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Seletor de hora
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">datetime-local</td>
                  <td className="px-4 py-4">
                    <Input type="datetime-local" className="max-w-xs" />
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Data e hora local
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">file</td>
                  <td className="px-4 py-4">
                    <Input type="file" className="max-w-xs" />
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Upload de arquivos
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Accessibility */}
      <Section 
        title="Acessibilidade" 
        description="Boas práticas de acessibilidade para inputs."
      >
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">✓ Boas Práticas</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Sempre use <code className="text-xs bg-muted px-1 rounded">Label</code> com <code className="text-xs bg-muted px-1 rounded">htmlFor</code></li>
                <li>• Use <code className="text-xs bg-muted px-1 rounded">placeholder</code> apenas como hint, não como label</li>
                <li>• Utilize <code className="text-xs bg-muted px-1 rounded">aria-invalid</code> para estados de erro</li>
                <li>• Forneça <code className="text-xs bg-muted px-1 rounded">aria-describedby</code> para mensagens de erro</li>
                <li>• Use tipos de input semânticos (email, tel, url)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Exemplo Acessível</h4>
              <div className="space-y-4">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="accessible-email">Email</Label>
                  <Input 
                    type="email" 
                    id="accessible-email" 
                    placeholder="exemplo@email.com"
                    aria-describedby="email-hint"
                  />
                  <p id="email-hint" className="text-xs text-muted-foreground">
                    Nunca compartilharemos seu email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
