import {type ReactNode} from 'react'
import {
  RefreshCcw,
  WheatIcon,
  BrainCircuit,
  QrCode,
  Gpu,
  Omega,
  ClapperboardIcon,
  ServerCog,
  Pickaxe,
  Variable,
  TerminalIcon,
  Headphones,
  ListTodoIcon,
  type LucideIcon,
} from 'lucide-react'
import {Github, Codolio, Hashnode, LinkedIn, X} from '@components/icons'

export type IconRegistry = Record<string, LucideIcon | ReactNode>

const lucideIcons: Record<string, LucideIcon> = {
  'refresh-ccw': RefreshCcw,
  'wheat': WheatIcon,
  'brain-circuit': BrainCircuit,
  'qr-code': QrCode,
  'gpu': Gpu,
  'omega': Omega,
  'clapperboard': ClapperboardIcon,
  'server-cog': ServerCog,
  'pickaxe': Pickaxe,
  'variable': Variable,
  'terminal': TerminalIcon,
  'headphones': Headphones,
  'list-todo': ListTodoIcon,
}

const customIcons: Record<string, ReactNode> = {
  'github': <Github className="w-9 h-9" />,
  'linkedin': <LinkedIn className="w-9 h-9" />,
  'x': <X className="w-9 h-9" />,
  'codolio': <Codolio className="w-9 h-9" />,
  'hashnode': <Hashnode className="w-9 h-9" />,
}

export function getIcon(identifier: string): ReactNode {
  const lucide = lucideIcons[identifier]
  if (lucide) {
    const Icon = lucide
    return <Icon className="w-8 h-8" />
  }
  const custom = customIcons[identifier]
  if (custom) return custom
  return <RefreshCcw className="w-8 h-8" />
}
