import {cn} from '@/lib/utils'
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
      className={cn(className, 'text-start w-full gap-5 justify-evenly flex flex-col items-start')}
    >
      <a className="flex gap-3 items-center cursor-pointer scroll-m-20 text-xl font-semibold tracking-tight">
        <Box />
        {blog_title}
      </a>
      <div>
        <p className="text-sm py-3">{gist}</p>
        <p className="text-xs text-muted-foreground hover:underline cursor-pointer">{create_at}</p>
      </div>
      <Badge variant={'outline'} className="">
        <a className="px-2 py-1" href={link} target="_blank" no-referrer>
          Read More
        </a>
      </Badge>
    </div>
  )
}
