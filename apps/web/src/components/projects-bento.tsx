import {Link} from 'react-router-dom'
import {projectPath} from '@lib/project-path'
import {motion, useReducedMotion} from 'framer-motion'
import {ArrowUpRight, ArrowRight, Code2} from 'lucide-react'
import {BentoGrid, BentoGridItem} from './ui/bento-grid'
import {Button} from './ui/button'
import type {IProject} from '@lib/queries'
import {cn} from '@lib/utils'

const INITIAL_COUNT = 4

export default function ProjectsBento({projects, isLoading, showAll = false}: {projects: IProject[]; isLoading: boolean; showAll?: boolean}) {
  const reduceMotion = useReducedMotion()
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT)

  return (
    <div className="my-4">
      <BentoGrid className="max-w-none md:auto-rows-auto">
        {isLoading ? Array.from({length: INITIAL_COUNT}, (_, index) => (
          <div
            key={index}
            className={cn('min-h-40 border border-dashed border-border bg-background p-4 motion-safe:animate-pulse', (index % 4 === 0 || index % 4 === 3) && 'md:col-span-2')}
            aria-hidden="true"
          >
            <div className="mb-4 h-6 w-6 bg-muted" />
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
              className="h-full"
              header={
                <div className="flex items-center justify-between text-muted-foreground" aria-hidden="true">
                  <Code2 className="size-5 text-foreground" />
                  <span className="font-mono text-xs tracking-widest">{String(index + 1).padStart(2, '0')}</span>
                </div>
              }
              title={<h3 className="break-words text-lg font-bold tracking-tight text-foreground"><Link className="hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring" to={projectPath(project)}>{project.project_title}</Link></h3>}
              description={<p className="line-clamp-3 break-words leading-relaxed text-foreground">{project.description}</p>}
              footer={
                <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-dashed border-border pt-3">
                  <Link className="text-link" to={projectPath(project)}>Details <ArrowRight size={14} aria-hidden="true" /></Link>
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
      {isLoading ? <p role="status" className="mt-3 text-xs">Loading projects…</p> : projects.length === 0 ? <p className="py-3">Projects coming soon.</p> : !showAll && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-mono text-xs text-muted-foreground">{visibleProjects.length} selected projects</span>
          <Button variant="outline" asChild className="rounded-none border border-dashed border-border text-xs font-bold">
            <Link to="/project">More projects <ArrowRight size={14} aria-hidden="true" /></Link>
          </Button>
        </div>
      )}
    </div>
  )
}
