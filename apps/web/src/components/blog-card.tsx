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
      className={cn(className, 'brutalist-card text-start w-full gap-5 justify-evenly flex flex-col items-start p-6')}
    >
      <a className="flex gap-3 items-center cursor-pointer scroll-m-20 text-xl font-bold tracking-tight">
        <Box />
        {blog_title}
      </a>
      <div>
        <p className="text-base py-3 leading-relaxed">{gist}</p>
        <p className="text-sm text-muted-foreground font-mono">{create_at}</p>
      </div>
      <Badge variant={'outline'} className="border-2 border-dashed border-foreground font-bold">
        <a className="px-2 py-1" href={link} target="_blank" no-referrer>
          Read More
        </a>
      </Badge>
    </div>
  )
}
