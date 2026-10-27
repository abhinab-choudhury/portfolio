import {cn} from '@lib/utils'
import {Badge} from './ui/badge'
import {GitPullRequest, GitMerge, CircleDot, XCircle} from 'lucide-react'

export default function OpenSourceCard({
  className,
  project_name,
  pr_title,
  description,
  pr_url,
  repo_url,
  status,
}: {
  className?: string
  project_name: string
  pr_title: string
  description?: string
  pr_url: string
  repo_url?: string
  status: 'merged' | 'open' | 'in_progress' | 'closed'
}) {
  const getStatusConfig = () => {
    switch (status) {
      case 'merged':
        return {
          icon: <GitMerge className="w-4 h-4" />,
          label: 'Merged',
          className: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
        }
      case 'open':
        return {
          icon: <GitPullRequest className="w-4 h-4" />,
          label: 'Open',
          className: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
        }
      case 'in_progress':
        return {
          icon: <CircleDot className="w-4 h-4" />,
          label: 'In Progress',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700',
        }
      case 'closed':
        return {
          icon: <XCircle className="w-4 h-4" />,
          label: 'Closed',
          className: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
        }
      default:
        return {
          icon: <GitPullRequest className="w-4 h-4" />,
          label: status,
          className: 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700',
        }
    }
  }

  const statusConfig = getStatusConfig()

  return (
    <div className={cn(className, 'w-full h-full')}>
      <div className="brutalist-card w-full h-full flex flex-col p-6 justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="cursor-pointer text-balance flex gap-2 items-center scroll-m-20 text-lg font-bold tracking-tight">
              {project_name}
            </h3>
            <Badge
              variant={'outline'}
              className={cn('flex items-center gap-1.5 px-2 py-1 font-bold text-xs', statusConfig.className)}
            >
              {statusConfig.icon}
              {statusConfig.label}
            </Badge>
          </div>
          <a
            href={pr_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-base hover:underline underline-offset-2 leading-snug"
          >
            {pr_title}
          </a>
          {description && <p className="leading-relaxed text-sm text-muted-foreground line-clamp-2">{description}</p>}
        </div>
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          <Badge variant={'default'} asChild>
            <a className="px-3 py-1.5 font-bold" href={pr_url} target="_blank" rel="noopener noreferrer">
              View PR
            </a>
          </Badge>
          {repo_url && (
            <Badge variant={'secondary'} asChild>
              <a className="px-3 py-1.5 font-bold" href={repo_url} target="_blank" rel="noopener noreferrer">
                Repository
              </a>
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
