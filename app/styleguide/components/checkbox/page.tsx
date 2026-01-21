"use client"

import { ExternalLink } from "lucide-react"

import { Checkbox } from "@/devcomponents/shadcn/checkbox"
import { Label } from "@/devcomponents/shadcn/label"
import { Button } from "@/devcomponents/shadcn/button"

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

export default function CheckboxPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Checkbox
          </h1>
          <span className="rounded-full bg-bg-primary-subtle px-2 py-0.5 text-xs font-medium text-fg-primary">
            Component
          </span>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          Um controle que permite ao usuário alternar entre marcado e desmarcado.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href="https://ui.shadcn.com/docs/components/checkbox"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-fg-primary underline-offset-4 hover:underline"
          >
            Documentação Shadcn UI
            <ExternalLink className="size-3" />
          </a>
          <a
            href="https://www.radix-ui.com/primitives/docs/components/checkbox"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-fg-primary underline-offset-4 hover:underline"
          >
            Radix UI Checkbox
            <ExternalLink className="size-3" />
          </a>
        </div>

        {/* Design Specs */}
        <div className="mt-6 rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Design Specs</h4>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Tamanho:</p>
              <ul className="text-xs text-fg-muted space-y-1">
                <li>• Size: 16px (size-4)</li>
                <li>• Border radius: rounded-sm</li>
                <li>• Icon: 14px (size-3.5)</li>
              </ul>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Estados:</p>
              <ul className="text-xs text-fg-muted space-y-1">
                <li>• Unchecked (default)</li>
                <li>• Checked</li>
                <li>• Indeterminate</li>
                <li>• Disabled</li>
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

      {/* Basic Usage */}
      <Section
        title="Uso Básico"
        description="Exemplos básicos do componente Checkbox."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ExampleCard title="Default" code="<Checkbox />">
            <div className="flex items-center gap-2">
              <Checkbox id="basic" />
              <Label htmlFor="basic">Aceitar termos</Label>
            </div>
          </ExampleCard>

          <ExampleCard title="Checked" code="<Checkbox defaultChecked />">
            <div className="flex items-center gap-2">
              <Checkbox id="checked" defaultChecked />
              <Label htmlFor="checked">Opção selecionada</Label>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled" code="<Checkbox disabled />">
            <div className="flex items-center gap-2">
              <Checkbox id="disabled" disabled />
              <Label htmlFor="disabled" className="opacity-50">Desabilitado</Label>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Checked" code="<Checkbox disabled defaultChecked />">
            <div className="flex items-center gap-2">
              <Checkbox id="disabled-checked" disabled defaultChecked />
              <Label htmlFor="disabled-checked" className="opacity-50">Desabilitado marcado</Label>
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* With Label and Description */}
      <Section
        title="Com Label e Descrição"
        description="Checkboxes com labels e textos de descrição."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <ExampleCard title="Com Descrição" code='<Checkbox /><div className="grid gap-2">...</div>'>
            <div className="flex items-start gap-3">
              <Checkbox id="terms" defaultChecked />
              <div className="grid gap-2">
                <Label htmlFor="terms">Aceitar termos e condições</Label>
                <p className="text-muted-foreground text-sm">
                  Ao marcar esta opção, você concorda com os termos e condições.
                </p>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Notificações" code="<Checkbox disabled />">
            <div className="flex items-start gap-2">
              <Checkbox id="notifications" disabled />
              <div className="grid gap-2">
                <Label htmlFor="notifications">Ativar notificações</Label>
                <p className="text-muted-foreground text-sm">
                  Você pode ativar ou desativar notificações a qualquer momento.
                </p>
              </div>
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* Card Style Checkbox */}
      <Section
        title="Estilo Card"
        description="Checkboxes dentro de cards interativos."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <ExampleCard title="Card Selecionável (Brand)" code="<Label className='hover:bg-accent/50 ... has-[[aria-checked=true]]:border-primary'>">
            <Label
              className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-bg-primary-subtle"
            >
              <Checkbox
                id="card-brand"
                defaultChecked
                className="mt-0.5"
              />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  Plano Premium
                </p>
                <p className="text-muted-foreground text-sm">
                  Acesso a todos os recursos avançados.
                </p>
              </div>
            </Label>
          </ExampleCard>

          <ExampleCard title="Card Selecionável (Custom Blue)" code="data-[state=checked]:bg-blue-600">
            <Label
              className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
            >
              <Checkbox
                id="card-blue"
                defaultChecked
                className="mt-0.5 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  Receber notificações
                </p>
                <p className="text-muted-foreground text-sm">
                  Receba atualizações sobre novos recursos.
                </p>
              </div>
            </Label>
          </ExampleCard>

          <ExampleCard title="Card Desabilitado" code="<Checkbox disabled />">
            <Label
              className="flex items-start gap-3 rounded-lg border p-4 cursor-not-allowed opacity-60 bg-muted/30"
            >
              <Checkbox
                id="card-disabled"
                disabled
                className="mt-0.5"
              />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  Plano Enterprise
                </p>
                <p className="text-muted-foreground text-sm">
                  Disponível em breve.
                </p>
              </div>
            </Label>
          </ExampleCard>

          <ExampleCard title="Card Unchecked" code="hover:bg-accent/50">
            <Label
              className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-bg-primary-subtle"
            >
              <Checkbox
                id="card-unchecked"
                className="mt-0.5"
              />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  Newsletter
                </p>
                <p className="text-muted-foreground text-sm">
                  Receba nossa newsletter semanal.
                </p>
              </div>
            </Label>
          </ExampleCard>
        </div>
      </Section>

      {/* Checkbox Group */}
      <Section
        title="Grupo de Checkboxes"
        description="Múltiplos checkboxes agrupados."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Vertical Group */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Lista Vertical</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox id="option-1" defaultChecked />
                <Label htmlFor="option-1">Opção 1</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="option-2" />
                <Label htmlFor="option-2">Opção 2</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="option-3" />
                <Label htmlFor="option-3">Opção 3</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="option-4" disabled />
                <Label htmlFor="option-4" className="opacity-50">Opção 4 (desabilitada)</Label>
              </div>
            </div>
          </div>

          {/* Horizontal Group */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Lista Horizontal</h4>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <Checkbox id="h-option-1" defaultChecked />
                <Label htmlFor="h-option-1">Email</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="h-option-2" />
                <Label htmlFor="h-option-2">SMS</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="h-option-3" />
                <Label htmlFor="h-option-3">Push</Label>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Practical Patterns */}
      <Section
        title="Padrões de Uso"
        description="Exemplos práticos de uso do Checkbox em contextos reais."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Terms Form */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Registro com Termos</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-reg">Email</Label>
                <input
                  type="email"
                  id="email-reg"
                  placeholder="seu@email.com"
                  className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring"
                />
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="terms-reg" className="mt-0.5" />
                <Label htmlFor="terms-reg" className="font-normal text-sm">
                  Eu aceito os <a href="#" className="text-fg-primary underline-offset-4 hover:underline">termos de serviço</a> e a <a href="#" className="text-fg-primary underline-offset-4 hover:underline">política de privacidade</a>.
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="marketing" />
                <Label htmlFor="marketing" className="font-normal text-sm">
                  Receber emails sobre novidades e promoções
                </Label>
              </div>
              <Button className="w-full">Criar Conta</Button>
            </div>
          </div>

          {/* Filter Panel */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Filtros</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Status</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Checkbox id="status-active" defaultChecked />
                    <Label htmlFor="status-active">Ativo</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="status-pending" defaultChecked />
                    <Label htmlFor="status-pending">Pendente</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="status-completed" />
                    <Label htmlFor="status-completed">Concluído</Label>
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Prioridade</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Checkbox id="priority-high" />
                    <Label htmlFor="priority-high">Alta</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="priority-medium" defaultChecked />
                    <Label htmlFor="priority-medium">Média</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="priority-low" />
                    <Label htmlFor="priority-low">Baixa</Label>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">Aplicar Filtros</Button>
            </div>
          </div>

          {/* Settings */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Configurações de Notificação</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox id="notify-email" defaultChecked className="mt-0.5" />
                <div className="grid gap-1">
                  <Label htmlFor="notify-email">Notificações por Email</Label>
                  <p className="text-xs text-muted-foreground">
                    Receba um email quando houver atividade importante.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="notify-push" className="mt-0.5" />
                <div className="grid gap-1">
                  <Label htmlFor="notify-push">Notificações Push</Label>
                  <p className="text-xs text-muted-foreground">
                    Receba notificações push no seu dispositivo.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="notify-sms" disabled className="mt-0.5" />
                <div className="grid gap-1 opacity-50">
                  <Label htmlFor="notify-sms">Notificações SMS</Label>
                  <p className="text-xs text-muted-foreground">
                    Disponível apenas para planos Premium.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Todo List */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-sm font-medium text-foreground">Lista de Tarefas</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox id="task-1" defaultChecked />
                <Label htmlFor="task-1" className="line-through text-muted-foreground">
                  Revisar documentação
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="task-2" defaultChecked />
                <Label htmlFor="task-2" className="line-through text-muted-foreground">
                  Implementar componente
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="task-3" />
                <Label htmlFor="task-3">Escrever testes</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="task-4" />
                <Label htmlFor="task-4">Atualizar styleguide</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="task-5" />
                <Label htmlFor="task-5">Fazer deploy</Label>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* API Reference */}
      <Section
        title="Referência de API"
        description="Props disponíveis para o componente Checkbox."
      >
        <div className="overflow-x-auto">
          <div className="rounded-lg border border-border bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Prop
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Default
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Descrição
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">checked</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">boolean | &quot;indeterminate&quot;</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">—</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Estado controlado do checkbox
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">defaultChecked</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">boolean</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">false</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Estado inicial não controlado
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">onCheckedChange</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">{`(checked: boolean | "indeterminate") => void`}</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">—</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Callback quando estado muda
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">disabled</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">boolean</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">false</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Desabilita o checkbox
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">required</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">boolean</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">false</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Marca como obrigatório
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">name</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">string</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">—</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Nome do campo para forms
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">value</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">string</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">&quot;on&quot;</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    Valor enviado em forms
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
        description="Boas práticas de acessibilidade para checkboxes."
      >
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">✓ Boas Práticas</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Sempre use <PropLabel>Label</PropLabel> associado ao checkbox</li>
                <li>• Use <PropLabel>htmlFor</PropLabel> no Label apontando para o ID</li>
                <li>• O componente já implementa <PropLabel>role=&quot;checkbox&quot;</PropLabel></li>
                <li>• Estados gerenciados com <PropLabel>aria-checked</PropLabel></li>
                <li>• Suporte completo a navegação por teclado</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Navegação por Teclado</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <PropLabel>Space</PropLabel> - Alterna o estado</li>
                <li>• <PropLabel>Tab</PropLabel> - Move foco para próximo elemento</li>
                <li>• <PropLabel>Shift + Tab</PropLabel> - Move foco para elemento anterior</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
