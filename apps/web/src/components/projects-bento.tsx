import {useState} from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {ArrowUpRight, ChevronDown, Code2} from 'lucide-react'
import {BentoGrid, BentoGridItem} from './ui/bento-grid'
import {Button} from './ui/button'
import type {IProject} from '@lib/queries'
import {cn} from '@lib/utils'

const INITIAL_COUNT = 4

export default function ProjectsBento({projects, isLoading}: {projects: IProject[]; isLoading: boolean}) {
  const [expanded, setExpanded] = useState(false)
  const reduceMotion = useReducedMotion()
  const visibleProjects = expanded ? projects : projects.slice(0, INITIAL_COUNT)
  const hasMore = projects.length > INITIAL_COUNT

  return (
    <div className="mx-4 my-8 md:mx-8">
      <BentoGrid className="max-w-none md:auto-rows-auto">
        {isLoading ? Array.from({length: INITIAL_COUNT}, (_, index) => (
          <div
            key={index}
            className={cn('min-h-60 border-2 border-dashed border-foreground bg-background p-6 motion-safe:animate-pulse', (index % 4 === 0 || index % 4 === 3) && 'md:col-span-2')}
            aria-hidden="true"
          >
            <div className="mb-8 h-8 w-8 bg-muted" />
            <div className="mb-4 h-6 w-2/3 bg-muted" />
            <div className="h-4 w-full bg-muted" />
          </div>
        )) : visibleProjects.map((project, index) => (
          <motion.article
            key={project._id}
            initial={reduceMotion ? false : {opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : Math.min(index < INITIAL_COUNT ? index : index - INITIAL_COUNT, 5) * 0.045, ease: 'easeOut'}}
            className={cn('min-w-0', (index % 4 === 0 || index % 4 === 3) && 'md:col-span-2')}
          >
            <BentoGridItem
              className="h-full min-h-64"
              header={
                <div className="flex items-center justify-between text-muted-foreground" aria-hidden="true">
                  <Code2 className="size-5 text-foreground" />
                  <span className="font-mono text-xs tracking-widest">{String(index + 1).padStart(2, '0')}</span>
                </div>
              }
              title={<h3 className="break-words text-xl font-bold tracking-tight text-foreground">{project.project_title}</h3>}
              description={<p className="break-words leading-relaxed text-foreground">{project.description}</p>}
              footer={
                <div className="flex flex-wrap gap-x-4 gap-y-3 border-t border-dashed border-foreground/40 pt-4">
                  {[
                    {label: 'GitHub', url: project.github_url},
                    {label: 'Live project', url: project.deployment_url},
                    {label: 'Blog', url: project.blog_url},
                  ].filter(link => link.url).map(link => (
                    <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.label}: ${project.project_title}`} className="inline-flex items-center gap-1 font-mono text-xs font-semibold underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                      {link.label}<ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              }
            />
          </motion.article>
        ))}
      </BentoGrid>
      <p className="mt-5 text-center text-xs text-muted-foreground" role="status">
        {isLoading ? 'Loading projects…' : projects.length === 0 ? 'Projects coming soon.' : `Showing ${visibleProjects.length} of ${projects.length} projects`}
      </p>
      {!isLoading && hasMore && (
        <div className="mt-5 flex justify-center">
          <Button variant="outline" onClick={() => setExpanded(true)} disabled={expanded} aria-expanded={expanded} className="border-2 border-dashed border-foreground font-bold uppercase tracking-wider">
            {expanded ? 'All projects shown' : `More projects (${projects.length - INITIAL_COUNT})`}
            {!expanded && <ChevronDown aria-hidden="true" />}
          </Button>
        </div>
      )}
    </div>
  )
}
