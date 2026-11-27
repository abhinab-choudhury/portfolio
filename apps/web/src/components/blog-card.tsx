import {cn} from '@lib/utils'
import {Box} from 'lucide-react'
import {Badge} from './ui/badge'

interface IBlogCard {
  className?: string
  blog_title: string
  create_at: string
  link?: string
  gist?: string
}

export default function BlogCard({className, blog_title, create_at, link, gist}: IBlogCard) {
  return (
    <div
      className={cn(className, 'brutalist-card text-start w-full gap-2 justify-between flex flex-col items-start p-4')}
    >
      <a className="flex gap-3 items-center cursor-pointer scroll-m-20 text-lg font-bold tracking-tight">
        <Box />
        {blog_title}
      </a>
      <div>
        <p className="py-2 leading-relaxed line-clamp-3">{gist}</p>
        <p className="text-sm text-muted-foreground font-mono">{create_at}</p>
      </div>
      <Badge variant={'outline'} className="border border-dashed border-border font-bold">
        <a className="px-2 py-1" href={link} target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </Badge>
    </div>
  )
}
