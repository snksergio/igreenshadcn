import { Palette, Square, TextCursorInput, CheckSquare } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface NavigationLink {
  title: string
  href: string
  icon?: LucideIcon
  description?: string
}

export interface NavigationSection {
  title: string
  links: NavigationLink[]
}

export const navigation: NavigationSection[] = [
  {
    title: "Foundation",
    links: [
      {
        title: "Tokens",
        href: "/styleguide",
        icon: Palette,
        description: "Design tokens e variáveis CSS",
      },
    ],
  },
  {
    title: "Components",
    links: [
      {
        title: "Button",
        href: "/styleguide/components/button",
        icon: Square,
        description: "Componente de botão interativo",
      },
      {
        title: "Checkbox",
        href: "/styleguide/components/checkbox",
        icon: CheckSquare,
        description: "Controle de seleção binário",
      },
      {
        title: "Input",
        href: "/styleguide/components/input",
        icon: TextCursorInput,
        description: "Campo de entrada de formulário",
      },
    ],
  },
]
