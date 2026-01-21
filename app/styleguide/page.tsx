import { Palette, Circle, Type, CornerDownRight, Layers, Paintbrush, BookOpen, Focus } from "lucide-react"

// ============================================
// SHADCN BRIDGE TOKENS
// ============================================

const shadcnCoreTokens = [
  { name: "background", variable: "--background", description: "Fundo principal (bridged)" },
  { name: "foreground", variable: "--foreground", description: "Texto principal (bridged)" },
  { name: "primary", variable: "--primary", description: "Cor primária" },
  { name: "primary-foreground", variable: "--primary-foreground", description: "Texto sobre primário" },
  { name: "secondary", variable: "--secondary", description: "Cor secundária" },
  { name: "secondary-foreground", variable: "--secondary-foreground", description: "Texto sobre secundário" },
  { name: "muted", variable: "--muted", description: "Cor atenuada" },
  { name: "muted-foreground", variable: "--muted-foreground", description: "Texto atenuado" },
  { name: "accent", variable: "--accent", description: "Cor de destaque" },
  { name: "accent-foreground", variable: "--accent-foreground", description: "Texto sobre destaque" },
  { name: "destructive", variable: "--destructive", description: "Cor destrutiva" },
  { name: "destructive-foreground", variable: "--destructive-foreground", description: "Texto destrutivo" },
  { name: "border", variable: "--border", description: "Cor de bordas" },
  { name: "input", variable: "--input", description: "Cor de inputs" },
  { name: "ring", variable: "--ring", description: "Cor de foco" },
] as const

const surfaceTokens = [
  { name: "card", variable: "--card", description: "Fundo de cards" },
  { name: "card-foreground", variable: "--card-foreground", description: "Texto de cards" },
  { name: "popover", variable: "--popover", description: "Fundo de popovers" },
  { name: "popover-foreground", variable: "--popover-foreground", description: "Texto de popovers" },
] as const

// ============================================
// SEMANTIC TOKENS
// ============================================

const semanticBgTokens = [
  { name: "bg-canvas", variable: "--bg-canvas", description: "Fundo da página" },
  { name: "bg-background", variable: "--bg-background", description: "Fundo de conteúdo" },
  { name: "bg-muted", variable: "--bg-muted", description: "Fundo suave" },
  { name: "bg-accent", variable: "--bg-accent", description: "Fundo de destaque" },
  { name: "bg-elevated", variable: "--bg-elevated", description: "Fundo elevado" },
  { name: "bg-fill", variable: "--bg-fill", description: "Fundo preenchido" },
  { name: "bg-inverse", variable: "--bg-inverse", description: "Fundo invertido" },
  { name: "bg-primary", variable: "--bg-primary", description: "Fundo primário" },
  { name: "bg-primary-hover", variable: "--bg-primary-hover", description: "Hover primário" },
  { name: "bg-primary-subtle", variable: "--bg-primary-subtle", description: "Primário suave" },
  { name: "bg-secondary", variable: "--bg-secondary", description: "Fundo secundário" },
  { name: "bg-secondary-hover", variable: "--bg-secondary-hover", description: "Hover secundário" },
] as const

const semanticFeedbackBgTokens = [
  { name: "bg-success", variable: "--bg-success", description: "Fundo sucesso" },
  { name: "bg-success-subtle", variable: "--bg-success-subtle", description: "Sucesso suave" },
  { name: "bg-warning", variable: "--bg-warning", description: "Fundo aviso" },
  { name: "bg-warning-subtle", variable: "--bg-warning-subtle", description: "Aviso suave" },
  { name: "bg-critical", variable: "--bg-critical", description: "Fundo crítico" },
  { name: "bg-critical-subtle", variable: "--bg-critical-subtle", description: "Crítico suave" },
  { name: "bg-info", variable: "--bg-info", description: "Fundo info" },
  { name: "bg-info-subtle", variable: "--bg-info-subtle", description: "Info suave" },
] as const

const semanticFgTokens = [
  { name: "fg-main", variable: "--fg-main", description: "Texto principal" },
  { name: "fg-subtle", variable: "--fg-subtle", description: "Texto sutil" },
  { name: "fg-muted", variable: "--fg-muted", description: "Texto atenuado" },
  { name: "fg-moderate", variable: "--fg-moderate", description: "Texto moderado" },
  { name: "fg-strong", variable: "--fg-strong", description: "Texto forte" },
  { name: "fg-primary", variable: "--fg-primary", description: "Texto primário" },
  { name: "fg-on-primary", variable: "--fg-on-primary", description: "Sobre primário" },
  { name: "fg-interactive", variable: "--fg-interactive", description: "Texto interativo" },
  { name: "fg-on-inverted", variable: "--fg-on-inverted", description: "Sobre invertido" },
] as const

const semanticFgFeedbackTokens = [
  { name: "fg-success", variable: "--fg-success", description: "Texto sucesso" },
  { name: "fg-warning", variable: "--fg-warning", description: "Texto aviso" },
  { name: "fg-critical", variable: "--fg-critical", description: "Texto crítico" },
  { name: "fg-info", variable: "--fg-info", description: "Texto info" },
] as const

const semanticBorderTokens = [
  { name: "border-default", variable: "--border-default", description: "Borda padrão" },
  { name: "border-muted", variable: "--border-muted", description: "Borda suave" },
  { name: "border-strong", variable: "--border-strong", description: "Borda forte" },
  { name: "border-primary", variable: "--border-primary", description: "Borda primária" },
  { name: "border-success", variable: "--border-success", description: "Borda sucesso" },
  { name: "border-warning", variable: "--border-warning", description: "Borda aviso" },
  { name: "border-critical", variable: "--border-critical", description: "Borda crítico" },
  { name: "border-info", variable: "--border-info", description: "Borda info" },
] as const

// ============================================
// PRIMITIVE TOKENS
// ============================================

const baseColors = [
  { name: "base-static-black", variable: "--base-static-black", description: "Preto absoluto" },
  { name: "base-static-white", variable: "--base-static-white", description: "Branco absoluto" },
  { name: "base-transparent", variable: "--base-transparent", description: "Transparente" },
] as const

const brandScale = [
  { name: "brand-50", variable: "--brand-50" },
  { name: "brand-100", variable: "--brand-100" },
  { name: "brand-200", variable: "--brand-200" },
  { name: "brand-300", variable: "--brand-300" },
  { name: "brand-400", variable: "--brand-400" },
  { name: "brand-500", variable: "--brand-500" },
  { name: "brand-600", variable: "--brand-600" },
  { name: "brand-700", variable: "--brand-700" },
  { name: "brand-800", variable: "--brand-800" },
  { name: "brand-900", variable: "--brand-900" },
  { name: "brand-950", variable: "--brand-950" },
] as const

const brandAlphaScale = [
  { name: "brand-alpha-5", variable: "--brand-alpha-5", opacity: "5%" },
  { name: "brand-alpha-10", variable: "--brand-alpha-10", opacity: "10%" },
  { name: "brand-alpha-15", variable: "--brand-alpha-15", opacity: "15%" },
  { name: "brand-alpha-20", variable: "--brand-alpha-20", opacity: "20%" },
  { name: "brand-alpha-25", variable: "--brand-alpha-25", opacity: "25%" },
  { name: "brand-alpha-30", variable: "--brand-alpha-30", opacity: "30%" },
  { name: "brand-alpha-50", variable: "--brand-alpha-50", opacity: "50%" },
] as const

const neutralScale = [
  { name: "neutral-0", variable: "--neutral-0" },
  { name: "neutral-50", variable: "--neutral-50" },
  { name: "neutral-100", variable: "--neutral-100" },
  { name: "neutral-200", variable: "--neutral-200" },
  { name: "neutral-300", variable: "--neutral-300" },
  { name: "neutral-400", variable: "--neutral-400" },
  { name: "neutral-500", variable: "--neutral-500" },
  { name: "neutral-600", variable: "--neutral-600" },
  { name: "neutral-700", variable: "--neutral-700" },
  { name: "neutral-800", variable: "--neutral-800" },
  { name: "neutral-900", variable: "--neutral-900" },
  { name: "neutral-950", variable: "--neutral-950" },
] as const

const neutralAlphaScale = [
  { name: "neutral-alpha-5", variable: "--neutral-alpha-5", opacity: "5%" },
  { name: "neutral-alpha-10", variable: "--neutral-alpha-10", opacity: "10%" },
  { name: "neutral-alpha-15", variable: "--neutral-alpha-15", opacity: "15%" },
  { name: "neutral-alpha-20", variable: "--neutral-alpha-20", opacity: "20%" },
  { name: "neutral-alpha-25", variable: "--neutral-alpha-25", opacity: "25%" },
  { name: "neutral-alpha-30", variable: "--neutral-alpha-30", opacity: "30%" },
  { name: "neutral-alpha-50", variable: "--neutral-alpha-50", opacity: "50%" },
] as const

const feedbackScales = {
  success: [
    { name: "success-50", variable: "--success-50" },
    { name: "success-500", variable: "--success-500" },
    { name: "success-600", variable: "--success-600" },
    { name: "success-800", variable: "--success-800" },
  ],
  warning: [
    { name: "warning-50", variable: "--warning-50" },
    { name: "warning-500", variable: "--warning-500" },
    { name: "warning-600", variable: "--warning-600" },
    { name: "warning-800", variable: "--warning-800" },
  ],
  critical: [
    { name: "critical-50", variable: "--critical-50" },
    { name: "critical-500", variable: "--critical-500" },
    { name: "critical-600", variable: "--critical-600" },
    { name: "critical-800", variable: "--critical-800" },
  ],
  info: [
    { name: "info-50", variable: "--info-50" },
    { name: "info-500", variable: "--info-500" },
    { name: "info-600", variable: "--info-600" },
    { name: "info-800", variable: "--info-800" },
  ],
} as const

const feedbackAlphaTokens = [
  { name: "success-alpha-20", variable: "--success-alpha-20", color: "Success" },
  { name: "warning-alpha-20", variable: "--warning-alpha-20", color: "Warning" },
  { name: "critical-alpha-20", variable: "--critical-alpha-20", color: "Critical" },
  { name: "info-alpha-20", variable: "--info-alpha-20", color: "Info" },
] as const

const ringTokens = [
  { name: "ring-primary", variable: "--ring-primary", description: "Focus primário" },
  { name: "ring-secondary", variable: "--ring-secondary", description: "Focus secundário" },
  { name: "ring-success", variable: "--ring-success", description: "Focus sucesso" },
  { name: "ring-warning", variable: "--ring-warning", description: "Focus aviso" },
  { name: "ring-critical", variable: "--ring-critical", description: "Focus crítico" },
  { name: "ring-info", variable: "--ring-info", description: "Focus info" },
] as const

// Tokens de radius
const radiusTokens = [
  { name: "radius-sm", variable: "--radius-sm" },
  { name: "radius-md", variable: "--radius-md" },
  { name: "radius", variable: "--radius" },
  { name: "radius-lg", variable: "--radius-lg" },
  { name: "radius-xl", variable: "--radius-xl" },
  { name: "radius-2xl", variable: "--radius-2xl" },
] as const

// Tokens de focus ring
const focusRingTokens = [
  { name: "ring-focus-width-sm", variable: "--ring-focus-width-sm", value: "2px", description: "Ring compacto" },
  { name: "ring-focus-width", variable: "--ring-focus-width", value: "3px", description: "Padrão do sistema" },
  { name: "ring-focus-width-lg", variable: "--ring-focus-width-lg", value: "4px", description: "Ring maior" },
  { name: "ring-focus-offset", variable: "--ring-focus-offset", value: "2px", description: "Espaçamento" },
] as const

// ============================================
// COMPONENTS
// ============================================

function ColorSwatch({
  name,
  variable,
  description
}: {
  name: string
  variable: string
  description?: string
}) {
  return (
    <div className="group flex items-center gap-4 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/30">
      <div
        className="size-12 shrink-0 rounded-md border border-border shadow-sm"
        style={{ backgroundColor: `var(${variable})` }}
      />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-sm font-medium text-foreground">{name}</p>
        <p className="font-mono text-xs text-muted-foreground">{variable}</p>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground/70">{description}</p>
        )}
      </div>
    </div>
  )
}

function ColorScale({
  tokens,
  label
}: {
  tokens: readonly { name: string; variable: string }[]
  label?: string
}) {
  return (
    <div>
      {label && (
        <p className="mb-2 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
      )}
      <div className="flex overflow-hidden rounded-lg border border-border">
        {tokens.map((token) => (
          <div
            key={token.name}
            className="group relative flex-1 h-16 first:rounded-l-lg last:rounded-r-lg"
            style={{ backgroundColor: `var(${token.variable})` }}
            title={token.name}
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white text-xs font-mono">
              {token.name.split("-").pop()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RadiusSwatch({ name, variable }: { name: string; variable: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-4">
      <div
        className="size-16 border-2 border-primary bg-primary/10"
        style={{ borderRadius: `var(${variable})` }}
      />
      <div className="text-center">
        <p className="font-mono text-sm font-medium text-foreground">{name}</p>
        <p className="font-mono text-xs text-muted-foreground">{variable}</p>
      </div>
    </div>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  description
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <Icon className="size-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function SubsectionHeader({ title }: { title: string }) {
  return (
    <h3 className="text-sm font-semibold text-foreground mb-4 pb-2 border-b border-border">
      {title}
    </h3>
  )
}

// ============================================
// PAGE
// ============================================

export default function TokensPage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Design Tokens
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Sistema de tokens em OKLCH com variáveis CSS semânticas e primitivas.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-bg-primary-subtle px-3 py-1 text-xs font-medium text-fg-primary">
            iGreen Theme
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            OKLCH Colors
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Tailwind v4
          </span>
        </div>
      </div>

      {/* ============================================
          PRIMITIVES SECTION
          ============================================ */}
      <section>
        <SectionHeader
          icon={Paintbrush}
          title="Primitive Scales"
          description="Escalas de cores brutas que formam a base do design system."
        />

        <div className="space-y-8">
          {/* Base Colors */}
          <div>
            <SubsectionHeader title="Base Colors" />
            <div className="grid gap-3 sm:grid-cols-3">
              {baseColors.map((token) => (
                <ColorSwatch
                  key={token.name}
                  name={token.name}
                  variable={token.variable}
                  description={token.description}
                />
              ))}
            </div>
          </div>

          {/* Brand Scale */}
          <div>
            <SubsectionHeader title="Brand Scale (Green)" />
            <ColorScale tokens={brandScale} label="Solid" />
            <div className="mt-4">
              <p className="mb-2 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Alpha (Transparência)
              </p>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {brandAlphaScale.map((token) => (
                  <div
                    key={token.name}
                    className="relative rounded-lg border border-border overflow-hidden"
                  >
                    <div
                      className="h-12"
                      style={{
                        backgroundColor: `var(${token.variable})`,
                        backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                        backgroundSize: '8px 8px',
                        backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                      }}
                    >
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: `var(${token.variable})` }}
                      />
                    </div>
                    <div className="p-2 bg-card">
                      <p className="font-mono text-xs font-medium text-foreground">{token.opacity}</p>
                      <p className="font-mono text-[10px] text-muted-foreground truncate">{token.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Neutral Scale */}
          <div>
            <SubsectionHeader title="Neutral Scale (Grey)" />
            <ColorScale tokens={neutralScale} label="Solid" />
            <div className="mt-4">
              <p className="mb-2 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Alpha (Transparência)
              </p>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {neutralAlphaScale.map((token) => (
                  <div
                    key={token.name}
                    className="relative rounded-lg border border-border overflow-hidden"
                  >
                    <div
                      className="h-12"
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                        backgroundSize: '8px 8px',
                        backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                      }}
                    >
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: `var(${token.variable})` }}
                      />
                    </div>
                    <div className="p-2 bg-card">
                      <p className="font-mono text-xs font-medium text-foreground">{token.opacity}</p>
                      <p className="font-mono text-[10px] text-muted-foreground truncate">{token.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback Scales */}
          <div>
            <SubsectionHeader title="Feedback Scales" />
            <div className="grid gap-6 sm:grid-cols-2">
              <ColorScale tokens={feedbackScales.success} label="Success" />
              <ColorScale tokens={feedbackScales.warning} label="Warning" />
              <ColorScale tokens={feedbackScales.critical} label="Critical" />
              <ColorScale tokens={feedbackScales.info} label="Info" />
            </div>
            <div className="mt-4">
              <p className="mb-2 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Feedback Alpha (20%)
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {feedbackAlphaTokens.map((token) => (
                  <div
                    key={token.name}
                    className="relative rounded-lg border border-border overflow-hidden"
                  >
                    <div
                      className="h-12"
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                        backgroundSize: '8px 8px',
                        backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                      }}
                    >
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: `var(${token.variable})` }}
                      />
                    </div>
                    <div className="p-2 bg-card">
                      <p className="font-mono text-xs font-medium text-foreground">{token.color}</p>
                      <p className="font-mono text-[10px] text-muted-foreground truncate">{token.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SEMANTIC RINGS
          ============================================ */}
      <section>
        <SectionHeader
          icon={Circle}
          title="Semantic Rings"
          description="Tokens para focus rings e estados de foco (--ring-*)."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ringTokens.map((token) => (
            <div
              key={token.name}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-3"
            >
              <div
                className="size-12 rounded-md border-2 border-border ring-4"
                style={{
                  boxShadow: `0 0 0 4px var(${token.variable})`
                }}
              />
              <div>
                <p className="font-mono text-sm font-medium text-foreground">{token.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{token.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          SEMANTIC BACKGROUNDS
          ============================================ */}
      <section>
        <SectionHeader
          icon={Layers}
          title="Semantic Backgrounds"
          description="Tokens contextuais para fundos e superfícies (--bg-*)."
        />

        <div className="space-y-8">
          <div>
            <SubsectionHeader title="Base Backgrounds" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {semanticBgTokens.map((token) => (
                <ColorSwatch
                  key={token.name}
                  name={token.name}
                  variable={token.variable}
                  description={token.description}
                />
              ))}
            </div>
          </div>

          <div>
            <SubsectionHeader title="Feedback Backgrounds" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {semanticFeedbackBgTokens.map((token) => (
                <ColorSwatch
                  key={token.name}
                  name={token.name}
                  variable={token.variable}
                  description={token.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SEMANTIC FOREGROUNDS
          ============================================ */}
      <section>
        <SectionHeader
          icon={Type}
          title="Semantic Foregrounds"
          description="Tokens contextuais para texto e ícones (--fg-*)."
        />

        <div className="space-y-8">
          <div>
            <SubsectionHeader title="Text Colors" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {semanticFgTokens.map((token) => (
                <div
                  key={token.name}
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex size-12 items-center justify-center rounded-md border border-border bg-background">
                    <span
                      className="text-lg font-bold"
                      style={{ color: `var(${token.variable})` }}
                    >
                      Aa
                    </span>
                  </div>
                  <div>
                    <p className="font-mono text-sm font-medium text-foreground">{token.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">{token.variable}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubsectionHeader title="Feedback Text Colors" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {semanticFgFeedbackTokens.map((token) => (
                <div
                  key={token.name}
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex size-12 items-center justify-center rounded-md border border-border bg-background">
                    <span
                      className="text-lg font-bold"
                      style={{ color: `var(${token.variable})` }}
                    >
                      Aa
                    </span>
                  </div>
                  <div>
                    <p className="font-mono text-sm font-medium text-foreground">{token.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">{token.variable}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SEMANTIC BORDERS
          ============================================ */}
      <section>
        <SectionHeader
          icon={Circle}
          title="Semantic Borders"
          description="Tokens contextuais para bordas (--border-*)."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {semanticBorderTokens.map((token) => (
            <div
              key={token.name}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-3"
            >
              <div
                className="size-12 rounded-md border-2"
                style={{ borderColor: `var(${token.variable})` }}
              />
              <div>
                <p className="font-mono text-sm font-medium text-foreground">{token.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{token.variable}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          SHADCN BRIDGE
          ============================================ */}
      <section>
        <SectionHeader
          icon={Palette}
          title="Shadcn Bridge"
          description="Variáveis padrão do Shadcn mapeadas para tokens semânticos."
        />

        <div className="space-y-8">
          <div>
            <SubsectionHeader title="Core Colors" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {shadcnCoreTokens.map((token) => (
                <ColorSwatch
                  key={token.name}
                  name={token.name}
                  variable={token.variable}
                  description={token.description}
                />
              ))}
            </div>
          </div>

          <div>
            <SubsectionHeader title="Surface Colors" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {surfaceTokens.map((token) => (
                <ColorSwatch
                  key={token.name}
                  name={token.name}
                  variable={token.variable}
                  description={token.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          RADIUS
          ============================================ */}
      <section>
        <SectionHeader
          icon={CornerDownRight}
          title="Border Radius"
          description="Variações de arredondamento de bordas."
        />
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {radiusTokens.map((token) => (
            <RadiusSwatch
              key={token.name}
              name={token.name}
              variable={token.variable}
            />
          ))}
        </div>
      </section>

      {/* ============================================
          FOCUS RING
          ============================================ */}
      <section>
        <SectionHeader
          icon={Focus}
          title="Focus Ring"
          description="Tokens padronizados para indicação de foco em componentes interativos. Usar com outline ou ring."
        />

        {/* Focus Ring Table */}
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-fg-moderate">Token</th>
                <th className="text-left py-3 px-4 font-medium text-fg-moderate">Variável</th>
                <th className="text-left py-3 px-4 font-medium text-fg-moderate">Valor</th>
                <th className="text-left py-3 px-4 font-medium text-fg-moderate">Descrição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {focusRingTokens.map((token) => (
                <tr key={token.name} className="hover:bg-muted/30">
                  <td className="py-3 px-4 font-mono text-xs">{token.name}</td>
                  <td className="py-3 px-4 font-mono text-xs text-fg-muted">{token.variable}</td>
                  <td className="py-3 px-4 font-mono text-xs">{token.value}</td>
                  <td className="py-3 px-4 text-muted-foreground">{token.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Usage Example */}
        <div className="rounded-lg border border-border bg-background p-6">
          <h4 className="text-label mb-4">Como usar</h4>
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3 rounded bg-muted/50">
              <span className="text-fg-muted">// Com outline (botões)</span><br />
              <code>outline-focus outline-transparent</code><br />
              <code>focus-visible:outline-focus focus-visible:outline-ring/50</code>
            </div>
            <div className="p-3 rounded bg-muted/50">
              <span className="text-fg-muted">// Com ring (inputs, checkboxes)</span><br />
              <code>focus-visible:ring-focus focus-visible:ring-ring/50</code>
            </div>
          </div>

          {/* Visual Demo */}
          <h4 className="text-label mt-6 mb-4">Demonstração</h4>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg outline-focus-sm outline-transparent focus:outline-focus-sm focus:outline-ring/50">
              Ring SM (2px)
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg outline-focus outline-transparent focus:outline-focus focus:outline-ring/50">
              Ring Default (3px)
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg outline-focus-lg outline-transparent focus:outline-focus-lg focus:outline-ring/50">
              Ring LG (4px)
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          TYPOGRAPHY
          ============================================ */}
      <section>
        <SectionHeader
          icon={Type}
          title="Typography"
          description="Sistema tipográfico otimizado para dashboards. Classes utilitárias com tamanho, peso e cor incluídos."
        />

        {/* Typography Scale Table */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-fg-moderate">Classe</th>
                <th className="text-left py-3 px-4 font-medium text-fg-moderate">Tamanho</th>
                <th className="text-left py-3 px-4 font-medium text-fg-moderate">Peso</th>
                <th className="text-left py-3 px-4 font-medium text-fg-moderate">Cor</th>
                <th className="text-left py-3 px-4 font-medium text-fg-moderate">Uso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/30">
                <td className="py-3 px-4 font-mono text-xs">text-page-title</td>
                <td className="py-3 px-4">24px</td>
                <td className="py-3 px-4">bold</td>
                <td className="py-3 px-4">fg-strong</td>
                <td className="py-3 px-4 text-muted-foreground">Títulos de página</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="py-3 px-4 font-mono text-xs">text-section-title</td>
                <td className="py-3 px-4">16px</td>
                <td className="py-3 px-4">semibold</td>
                <td className="py-3 px-4">fg-strong</td>
                <td className="py-3 px-4 text-muted-foreground">Títulos de seção/card</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="py-3 px-4 font-mono text-xs">text-body-lg</td>
                <td className="py-3 px-4">16px</td>
                <td className="py-3 px-4">regular</td>
                <td className="py-3 px-4">fg-main</td>
                <td className="py-3 px-4 text-muted-foreground">Texto destacado</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="py-3 px-4 font-mono text-xs">text-body</td>
                <td className="py-3 px-4">14px</td>
                <td className="py-3 px-4">regular</td>
                <td className="py-3 px-4">fg-main</td>
                <td className="py-3 px-4 text-muted-foreground">Texto padrão</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="py-3 px-4 font-mono text-xs">text-label</td>
                <td className="py-3 px-4">14px</td>
                <td className="py-3 px-4">medium</td>
                <td className="py-3 px-4">fg-strong</td>
                <td className="py-3 px-4 text-muted-foreground">Labels de formulário</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="py-3 px-4 font-mono text-xs">text-label-sm</td>
                <td className="py-3 px-4">12px</td>
                <td className="py-3 px-4">medium</td>
                <td className="py-3 px-4">fg-strong</td>
                <td className="py-3 px-4 text-muted-foreground">Labels compactos</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="py-3 px-4 font-mono text-xs">text-table-header</td>
                <td className="py-3 px-4">14px</td>
                <td className="py-3 px-4">medium</td>
                <td className="py-3 px-4">fg-moderate</td>
                <td className="py-3 px-4 text-muted-foreground">Cabeçalho de tabela</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="py-3 px-4 font-mono text-xs">text-table-cell</td>
                <td className="py-3 px-4">14px</td>
                <td className="py-3 px-4">regular</td>
                <td className="py-3 px-4">fg-main</td>
                <td className="py-3 px-4 text-muted-foreground">Células de tabela</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="py-3 px-4 font-mono text-xs">text-caption</td>
                <td className="py-3 px-4">12px</td>
                <td className="py-3 px-4">regular</td>
                <td className="py-3 px-4">fg-muted</td>
                <td className="py-3 px-4 text-muted-foreground">Legendas, timestamps</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="py-3 px-4 font-mono text-xs">text-micro</td>
                <td className="py-3 px-4">11px</td>
                <td className="py-3 px-4">regular</td>
                <td className="py-3 px-4">fg-muted</td>
                <td className="py-3 px-4 text-muted-foreground">Descrições, badges</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Live Examples */}
        <div className="space-y-6 rounded-lg border border-border bg-card p-6">
          <SubsectionHeader title="Exemplos Visuais" />

          <div className="space-y-6">
            {/* Page Title */}
            <div className="border-b border-border pb-4">
              <span className="mb-2 inline-block font-mono text-xs text-muted-foreground">
                text-page-title · 24px / bold / fg-strong
              </span>
              <h1 className="text-page-title">
                Título Principal da Página
              </h1>
            </div>

            {/* Section Title */}
            <div className="border-b border-border pb-4">
              <span className="mb-2 inline-block font-mono text-xs text-muted-foreground">
                text-section-title · 16px / semibold / fg-strong
              </span>
              <h2 className="text-section-title">
                Título de Seção ou Card
              </h2>
            </div>

            {/* Body Large */}
            <div className="border-b border-border pb-4">
              <span className="mb-2 inline-block font-mono text-xs text-muted-foreground">
                text-body-lg · 16px / regular / fg-main
              </span>
              <p className="text-body-lg">
                Texto com maior destaque, usado para introduções ou parágrafos importantes.
              </p>
            </div>

            {/* Body */}
            <div className="border-b border-border pb-4">
              <span className="mb-2 inline-block font-mono text-xs text-muted-foreground">
                text-body · 14px / regular / fg-main
              </span>
              <p className="text-body">
                Texto padrão para parágrafos e conteúdo geral do dashboard. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* Label */}
            <div className="border-b border-border pb-4">
              <span className="mb-2 inline-block font-mono text-xs text-muted-foreground">
                text-label · 14px / medium / fg-strong
              </span>
              <p className="text-label">
                Label de Formulário
              </p>
            </div>

            {/* Label Small */}
            <div className="border-b border-border pb-4">
              <span className="mb-2 inline-block font-mono text-xs text-muted-foreground">
                text-label-sm · 12px / medium / fg-strong
              </span>
              <p className="text-label-sm">
                Label Compacto
              </p>
            </div>

            {/* Table Header */}
            <div className="border-b border-border pb-4">
              <span className="mb-2 inline-block font-mono text-xs text-muted-foreground">
                text-table-header · 14px / medium / fg-moderate
              </span>
              <p className="text-table-header">
                Cabeçalho de Tabela
              </p>
            </div>

            {/* Table Cell */}
            <div className="border-b border-border pb-4">
              <span className="mb-2 inline-block font-mono text-xs text-muted-foreground">
                text-table-cell · 14px / regular / fg-main
              </span>
              <p className="text-table-cell">
                Conteúdo de célula de tabela
              </p>
            </div>

            {/* Caption */}
            <div className="border-b border-border pb-4">
              <span className="mb-2 inline-block font-mono text-xs text-muted-foreground">
                text-caption · 12px / regular / fg-muted
              </span>
              <p className="text-caption">
                Legenda ou timestamp · Atualizado há 5 minutos
              </p>
            </div>

            {/* Micro */}
            <div>
              <span className="mb-2 inline-block font-mono text-xs text-muted-foreground">
                text-micro · 11px / regular / fg-muted
              </span>
              <p className="text-micro">
                Descrição pequena para cards de seleção ou badges informativos
              </p>
            </div>
          </div>
        </div>

        {/* Raw Scale */}
        <div className="mt-8">
          <SubsectionHeader title="Escala Primitiva (Tailwind)" />
          <div className="space-y-3 rounded-lg border border-border bg-card p-6">
            <div className="flex items-baseline gap-4">
              <span className="w-20 font-mono text-xs text-muted-foreground">text-2xs</span>
              <span className="text-2xs text-fg-main">11px · The quick brown fox</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-20 font-mono text-xs text-muted-foreground">text-xs</span>
              <span className="text-xs text-fg-main">12px · The quick brown fox</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-20 font-mono text-xs text-muted-foreground">text-sm</span>
              <span className="text-sm text-fg-main">14px · The quick brown fox</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-20 font-mono text-xs text-muted-foreground">text-base</span>
              <span className="text-base text-fg-main">16px · The quick brown fox</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-20 font-mono text-xs text-muted-foreground">text-lg</span>
              <span className="text-lg text-fg-main">18px · The quick brown fox</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-20 font-mono text-xs text-muted-foreground">text-xl</span>
              <span className="text-xl text-fg-main">20px · The quick brown fox</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-20 font-mono text-xs text-muted-foreground">text-2xl</span>
              <span className="text-2xl text-fg-main">24px · The quick brown fox</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          HOW TO ADD NEW TOKENS
          ============================================ */}
      <section>
        <SectionHeader
          icon={BookOpen}
          title="Como Adicionar Novos Tokens"
          description="Guia passo a passo para expandir o design system."
        />

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                1
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                Adicione no arquivo CSS apropriado
              </h3>
            </div>
            <div className="space-y-4 pl-11">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Primitives</span>
                <span>→</span>
                <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs">theme/primitives.css</code>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Semantic</span>
                <span>→</span>
                <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs">theme/semantic.css</code>
              </div>
              <div className="rounded-md bg-neutral-950 p-4 text-sm">
                <pre className="text-neutral-300">
                  <code>{`:root {
  --novo-token: oklch(0.60 0.18 155);
}

.dark {
  --novo-token: oklch(0.75 0.16 155);
}`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                2
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                Mapeie no globals.css
              </h3>
            </div>
            <div className="space-y-4 pl-11">
              <p className="text-sm text-muted-foreground">
                Adicione a variável na seção correspondente do bloco <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">@theme</code>:
              </p>
              <div className="rounded-md bg-neutral-950 p-4 text-sm">
                <pre className="text-neutral-300">
                  <code>{`@theme {
  /* Na seção apropriada */
  --color-novo-token: var(--novo-token);
}`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                3
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                Use a nova classe
              </h3>
            </div>
            <div className="space-y-4 pl-11">
              <p className="text-sm text-muted-foreground">
                A classe Tailwind estará disponível automaticamente:
              </p>
              <div className="rounded-md bg-neutral-950 p-4 text-sm">
                <pre className="text-neutral-300">
                  <code>{`<div className="bg-novo-token">
  Conteúdo com a nova cor
</div>

<p className="text-novo-token">
  Texto com a nova cor
</p>

<div className="border border-novo-token">
  Borda com a nova cor
</div>`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Referência Rápida de Arquivos
            </h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-md bg-card border border-border p-3">
                <p className="font-mono text-xs text-muted-foreground mb-1">Cores brutas</p>
                <p className="font-mono text-sm font-medium text-foreground">primitives.css</p>
              </div>
              <div className="rounded-md bg-card border border-border p-3">
                <p className="font-mono text-xs text-muted-foreground mb-1">Cores contextuais</p>
                <p className="font-mono text-sm font-medium text-foreground">semantic.css</p>
              </div>
              <div className="rounded-md bg-card border border-border p-3">
                <p className="font-mono text-xs text-muted-foreground mb-1">Bridge Shadcn</p>
                <p className="font-mono text-sm font-medium text-foreground">index.css</p>
              </div>
              <div className="rounded-md bg-card border border-border p-3">
                <p className="font-mono text-xs text-muted-foreground mb-1">Mapeamento Tailwind</p>
                <p className="font-mono text-sm font-medium text-foreground">globals.css</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
