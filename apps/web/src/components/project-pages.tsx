import {useEffect, useRef} from 'react'
import {Link, useLocation, useParams} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {ArrowLeft, ArrowUpRight} from 'lucide-react'
import {getProject, getProjects} from '@lib/queries'
import Navbar from './navbar'
import Footer from './footer'
import ProjectsBento from './projects-bento'

export function RouteFocus() {
  const {pathname} = useLocation()
  const previous = useRef(pathname)
  useEffect(() => {
    if (previous.current === pathname) return
    previous.current = pathname
    window.scrollTo({top: 0, behavior: 'instant'})
    document.querySelector<HTMLElement>('main')?.focus()
  }, [pathname])
  return null
}

function Page({children}: {children: React.ReactNode}) {
  return <div className="page-shell"><Navbar /><main tabIndex={-1} className="w-full flex-1 outline-none py-4">{children}</main><Footer /></div>
}

export function ProjectsPage() {
  const {data = [], isPending, isError, refetch} = useQuery({queryKey: ['projects'], queryFn: getProjects})
  useEffect(() => {document.title = 'Projects · Abhinab Choudhury'}, [])
  return <Page>
    <Link className="text-link" to="/"><ArrowLeft size={14} aria-hidden="true" /> Home</Link>
    <div className="section-heading mt-4"><h1>All projects</h1><span className="font-mono text-xs">{data.length} projects</span></div>
    {isError ? <p role="alert" className="py-6">Couldn’t load projects. <button className="underline" onClick={() => refetch()}>Try again</button></p> : <ProjectsBento projects={data} isLoading={isPending} showAll />}
  </Page>
}

export function ProjectPage() {
  const {projectName = ''} = useParams()
  const {data: project, isPending, isError, refetch} = useQuery({queryKey: ['project', projectName], queryFn: () => getProject(projectName)})
  useEffect(() => {document.title = `${project?.project_title || 'Project'} · Abhinab Choudhury`}, [project?.project_title])
  return <Page>
    <Link className="text-link" to="/project"><ArrowLeft size={14} aria-hidden="true" /> All projects</Link>
    {isPending ? <p role="status" className="py-6">Loading project…</p> : isError ? <p role="alert" className="py-6">Couldn’t load this project. <button className="underline" onClick={() => refetch()}>Try again</button></p> : !project ? <div className="py-6"><h1 className="text-2xl font-bold">Project not found</h1><p className="mt-2">This project may no longer be available.</p></div> : <article className="mt-4">
      <header className="border-b border-dashed border-border pb-4">
        <h1 className="break-words text-3xl font-extrabold tracking-tight">{project.project_title}</h1>
        <p className="mt-3 max-w-prose leading-relaxed">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-4">
          {[{label: 'GitHub', url: project.github_url}, {label: 'Live project', url: project.deployment_url}, {label: 'Blog', url: project.blog_url}].filter(link => link.url).map(link => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="text-link">{link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}
        </div>
      </header>
      <div className="project-markdown py-5">
        {project.details?.trim() ? <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={{
          a: ({children, href}) => <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{children}</a>,
          table: ({children}) => <div className="overflow-x-auto"><table>{children}</table></div>,
          img: ({src, alt}) => <img src={src} alt={alt || ''} loading="lazy" />,
        }}>{project.details}</ReactMarkdown> : <p className="text-muted-foreground">More details coming soon. Explore the project using the links above.</p>}
      </div>
    </article>}
  </Page>
}

export function NotFoundPage() {
  return <Page><h1 className="text-2xl font-bold">Page not found</h1><Link className="text-link mt-4" to="/">Return home</Link></Page>
}
