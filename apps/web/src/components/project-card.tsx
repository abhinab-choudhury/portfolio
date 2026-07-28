import {cn} from '@lib/utils'
import {Badge} from './ui/badge'

export default function ProjectCard({
  className,
  header_icon,
  description,
  project_title,
  github_url,
  deployment_url,
  blog_url,
}: {
  className?: string
  header_icon: React.ReactNode
  description: string
  image_src?: string
  project_title: string
  github_url?: string
  deployment_url?: string
  blog_url?: string
}) {
  return (
    <div className={cn(className, 'w-full h-full')}>
      <div className="brutalist-card w-full h-full flex flex-col p-6 justify-between gap-5">
        <div className="flex flex-col gap-5">
          <h3 className="cursor-pointer text-balance flex gap-3 items-center scroll-m-20 text-xl font-bold tracking-tight">
            {header_icon}
            {project_title}
          </h3>
          <p className="text-base leading-relaxed line-clamp-3">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {github_url && (
            <Badge variant={'default'} asChild>
              <a className="px-3 py-1.5 font-bold" href={github_url} target="_blank">
                Github
              </a>
            </Badge>
          )}
          {deployment_url && (
            <Badge variant={'secondary'} asChild>
              <a className="px-3 py-1.5 font-bold" href={deployment_url} target="_blank">
                Deployment
              </a>
            </Badge>
          )}
          {blog_url && (
            <Badge variant={'outline'} asChild>
              <a className="px-3 py-1.5 font-bold" href={blog_url} target="_blank">
                Blog
              </a>
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}

export function ProjectCardSkeleton({className}: {className: string}) {
  return <div className={cn(className, 'w-full h-[200px] pb-5')}></div>
}
