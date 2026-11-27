import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {ArrowUpRight, BriefcaseBusiness} from 'lucide-react'
import {getExperience} from '@lib/queries'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const dateFormat = new Intl.DateTimeFormat('en', {month: 'short', year: 'numeric', timeZone: 'UTC'})

function formatDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : dateFormat.format(date)
}

function CompanyLogo({url, company}: {url?: string; company: string}) {
  const [failed, setFailed] = useState(false)
  return <span className="absolute left-0 top-0 flex size-9 items-center justify-center border border-dashed border-border bg-card font-mono text-xs font-bold" aria-hidden="true">
    {url && !failed ? <img src={url} alt="" className="size-7 object-contain" loading="lazy" onError={() => setFailed(true)} /> : company.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase()}
  </span>
}

export default function ExperienceSection() {
  const {data: experience = [], isPending, isError} = useQuery({
    queryKey: ['experience'],
    queryFn: getExperience,
  })

  if (!isPending && (isError || experience.length === 0)) return null

  return (
    <section aria-labelledby="experience-heading" className="w-full">
      <div className="section-heading">
        <h2 id="experience-heading" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <BriefcaseBusiness className="size-5 shrink-0" aria-hidden="true" />
          Experience
        </h2>
      </div>
      {isPending ? (
        <div className="my-4 space-y-3" role="status">
          <span className="sr-only">Loading experience…</span>
          <div className="h-5 w-1/2 bg-muted motion-safe:animate-pulse" />
          <div className="h-4 w-1/3 bg-muted motion-safe:animate-pulse" />
        </div>
      ) : (
        <ol className="my-4 space-y-4">
          {experience.map(entry => (
            <li key={entry._id} className="relative pl-12">
              <CompanyLogo key={entry.companyLogoUrl} url={entry.companyLogoUrl} company={entry.company} />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="min-w-0 break-words text-base font-semibold tracking-tight">{entry.role}</h3>
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
              {entry.description && <div className="project-markdown experience-markdown mt-2 min-w-0 text-muted-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={{
                  a: ({children, href}) => <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{children}</a>,
                  table: ({children}) => <div className="overflow-x-auto"><table>{children}</table></div>,
                  h1: ({children}) => <h4>{children}</h4>,
                  h2: ({children}) => <h4>{children}</h4>,
                  h3: ({children}) => <h4>{children}</h4>,
                  img: ({src, alt}) => <img src={src} alt={alt || ''} loading="lazy" />,
                }}>{entry.description}</ReactMarkdown>
              </div>}
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
