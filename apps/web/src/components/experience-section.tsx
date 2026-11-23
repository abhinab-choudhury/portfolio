import {useQuery} from '@tanstack/react-query'
import {ArrowUpRight, BriefcaseBusiness} from 'lucide-react'
import {getExperience} from '@lib/queries'

const dateFormat = new Intl.DateTimeFormat('en', {month: 'short', year: 'numeric', timeZone: 'UTC'})

function formatDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : dateFormat.format(date)
}

export default function ExperienceSection() {
  const {data: experience = [], isPending, isError} = useQuery({
    queryKey: ['experience'],
    queryFn: getExperience,
  })

  if (!isPending && (isError || experience.length === 0)) return null

  return (
    <section aria-labelledby="experience-heading" className="w-full">
      <div className="border-y-2 border-dashed border-foreground pb-5 pt-10">
        <h2 id="experience-heading" className="mx-5 flex items-center gap-3 text-4xl font-extrabold tracking-tight">
          <BriefcaseBusiness className="size-8 shrink-0" aria-hidden="true" />
          Experience
        </h2>
      </div>
      {isPending ? (
        <div className="mx-4 my-8 space-y-4 md:mx-8" role="status">
          <span className="sr-only">Loading experience…</span>
          <div className="h-5 w-1/2 bg-muted motion-safe:animate-pulse" />
          <div className="h-4 w-1/3 bg-muted motion-safe:animate-pulse" />
        </div>
      ) : (
        <ol className="mx-4 my-8 border-l border-dashed border-foreground/30 md:mx-8">
          {experience.map(entry => (
            <li key={entry._id} className="relative pb-8 pl-6 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[4.5px] top-2 size-2 rounded-full bg-primary ring-4 ring-background" />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="min-w-0 break-words text-lg font-semibold tracking-tight">{entry.role}</h3>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  <time dateTime={entry.startDate}>{formatDate(entry.startDate)}</time>
                  {' — '}
                  {entry.endDate ? <time dateTime={entry.endDate}>{formatDate(entry.endDate)}</time> : 'Present'}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                {entry.companyUrl ? (
                  <a href={entry.companyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                    {entry.company}<ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
                  </a>
                ) : <span>{entry.company}</span>}
                {entry.location && <span className="text-xs text-muted-foreground">{entry.location}</span>}
              </div>
              {entry.description && <p className="mt-3 max-w-prose whitespace-pre-line break-words leading-relaxed text-muted-foreground">{entry.description}</p>}
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
