import {type ReactNode} from 'react'
import {RefreshCcw} from 'lucide-react'
import {DynamicIcon, iconNames, type IconName} from 'lucide-react/dynamic'
import {Github, Codolio, Hashnode, LinkedIn, X} from '@components/icons'

const customIcons: Record<string, ReactNode> = {
  'github': <Github className="w-6 h-6" />,
  'linkedin': <LinkedIn className="w-7 h-7" />,
  'x': <X className="w-6 h-6 dark:text-black" />,
  'codolio': <Codolio className="w-7 h-7" />,
  'hashnode': <Hashnode className="w-6 h-6 dark:text-black" />,
}

const lucideIconNames: ReadonlySet<string> = new Set(iconNames)

function isLucideIconName(identifier: string): identifier is IconName {
  return lucideIconNames.has(identifier)
}

export function getIcon(identifier: string): ReactNode {
  const name = identifier.trim()
  const custom = customIcons[name]
  if (custom) return custom
  if (isLucideIconName(name)) {
    return (
      <DynamicIcon
        name={name}
        className="w-8 h-8"
        fallback={() => <RefreshCcw className="w-8 h-8" />}
      />
    )
  }
  return <RefreshCcw className="w-8 h-8" />
}
