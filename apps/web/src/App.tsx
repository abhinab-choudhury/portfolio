import {useQuery} from '@tanstack/react-query'
import {Button} from './components/ui/button'
import {Blocks, ChevronDown, Projector, GitMerge} from 'lucide-react'
import Navbar from '@components/navbar'
import ProjectCard from '@components/project-card'
import BlogCard from '@components/blog-card'
import Footer from '@components/footer'
import {getProjects, getSocialLinks, getRecentBlogs, getOpenSourceContributions, type IProject, type ISocialLink, type IRecentBlog, type IOpenSource} from '@lib/queries'
import {getIcon} from '@lib/icon-registry'
import {useEffect, useMemo, useState} from 'react'

function SkeletonCard({className}: {className?: string}) {
  return (
    <div className={`w-full h-full border-2 border-dashed border-foreground p-6 animate-pulse ${className ?? ''}`}>
      <div className="h-6 bg-muted rounded w-3/4 mb-4" />
      <div className="h-4 bg-muted rounded w-full mb-2" />
      <div className="h-4 bg-muted rounded w-5/6" />
    </div>
  )
}

function App() {
  const {data: projects = [], isLoading: projectsLoading} = useQuery<IProject[]>({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  const {data: socialLinks = [], isLoading: socialLoading} = useQuery<ISocialLink[]>({
    queryKey: ['socialLinks'],
    queryFn: getSocialLinks,
  })

  const {data: recentBlogs = [], isLoading: blogsLoading} = useQuery<IRecentBlog[]>({
    queryKey: ['recentBlogs'],
    queryFn: getRecentBlogs,
  })

  const {data: openSourceContributions = [], isLoading: openSourceLoading} = useQuery<IOpenSource[]>({
    queryKey: ['openSource'],
    queryFn: getOpenSourceContributions,
  })

  const groupedOpenSource = useMemo(
    () =>
      openSourceContributions.reduce((acc, contribution) => {
        if (!acc[contribution.project_name]) {
          acc[contribution.project_name] = []
        }
        acc[contribution.project_name].push(contribution)
        return acc
      }, {} as Record<string, typeof openSourceContributions>),
    [openSourceContributions],
  )

  const orgGroups = useMemo(() => {
    const groups: Record<string, Record<string, typeof openSourceContributions>> = {}
    for (const contribution of openSourceContributions) {
      const org = contribution.org_name || (contribution.project_name.includes('/') ? contribution.project_name.split('/')[0] : contribution.project_name)
      const projectKey = contribution.project_name
      if (!groups[org]) groups[org] = {}
      if (!groups[org][projectKey]) groups[org][projectKey] = []
      groups[org][projectKey].push(contribution)
    }
    return groups
  }, [openSourceContributions])

  const orgNames = useMemo(() => Object.keys(orgGroups), [orgGroups])
  const [selectedOrg, setSelectedOrg] = useState('')

  useEffect(() => {
    if (orgNames.length > 0 && !selectedOrg) {
      setSelectedOrg(orgNames[0])
    } else if (orgNames.length === 0) {
      setSelectedOrg('')
    } else if (selectedOrg && !orgNames.includes(selectedOrg)) {
      setSelectedOrg(orgNames[0])
    }
  }, [orgNames, selectedOrg])

  return (
    <div className="max-w-4xl mx-auto flex min-h-svh flex-col items-center justify-center p-4 md:p-8">
      <Navbar />

      <div className="brutalist-card flex flex-col md:flex-row w-full">
        <div className="flex flex-col justify-between p-4 md:border-r-2 md:border-dashed md:border-foreground">
          <p className="w-full">
            I'm a passionate developer driven by curiosity, creativity, and consistency. I
            specialize in Web2 technologies, and I'm always exploring ways to build smarter, faster,
            and more impactful digital products.
          </p>
          <p className="text-muted-foreground text-xs mt-3 font-mono">-- Eat. Sleep. Code. Repeat. --</p>
          <div className="flex flex-row pt-6 gap-3">
            {socialLoading
              ? Array.from({length: 5}).map((_, i) => (
                  <div key={i} className="w-8 h-8 border-2 border-dashed border-foreground animate-pulse" />
                ))
              : socialLinks.map((link) => (
                  <a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    className="flex items-center justify-center w-10 h-10 bg-white dark:bg-white rounded hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md transition-all"
                  >
                    {getIcon(link.logo)}
                  </a>
                ))}
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center p-4 border-t-2 border-dashed border-foreground md:border-t-0 md:border-l-0">
          <span
            className="text-2xl tracking-widest text-muted-foreground rotate-180"
            style={{writingMode: 'vertical-lr', fontFamily: "'Architects Daughter', cursive"}}
          >
            Abhinab
          </span>
        </div>
      </div>

      {/* Open Source Section */}
      {openSourceContributions.length > 0 && (
        <div className="flex flex-col w-full mt-10">
          <div className="text-left pt-10 pb-5 border-y-2 border-dashed border-foreground flex justify-between">
            <h1 className="flex gap-3 items-center mt-auto mx-5 scroll-m-20 text-4xl font-extrabold tracking-tight w-full">
              <GitMerge className="w-8 h-8" />
              Open Source
            </h1>
          </div>
          <div className="m-6 md:m-8">
            <div className="flex gap-2 overflow-x-auto pb-2 border-b-2 border-dashed border-foreground mb-4">
              {orgNames.map((orgName) => (
                <button
                  key={orgName}
                  onClick={() => setSelectedOrg(orgName)}
                  className={`px-3 py-1.5 text-xs font-mono font-semibold border-2 border-dashed whitespace-nowrap transition-all flex-shrink-0 ${
                    selectedOrg === orgName
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-foreground hover:bg-muted/50'
                  }`}
                >
                  {orgName}
                </button>
              ))}
            </div>
            {selectedOrg && orgGroups[selectedOrg] && (
              <div className="flex flex-col gap-3">
                {openSourceLoading ? (
                  <div className="px-3 py-2 text-xs text-muted-foreground border border-dashed border-foreground">Loading...</div>
                ) : (
                  Object.entries(orgGroups[selectedOrg]).map(([projectName, contributions]) => (
                    <div key={projectName} className="border border-dashed border-foreground">
                      <div className="border-b border-dashed border-foreground px-3 py-1.5 bg-foreground/5 flex items-center justify-between">
                        <a
                          href={contributions[0]?.repo_url || (contributions[0]?.project_name.includes('/') ? `https://github.com/${contributions[0]?.project_name}` : `https://github.com/${selectedOrg}/${contributions[0]?.project_name}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-xs font-mono hover:underline"
                        >
                          {contributions[0]?.project_name || projectName}
                        </a>
                        <span className="text-[10px] text-muted-foreground font-mono">{contributions.length} {contributions.length === 1 ? 'PR' : 'PRs'}</span>
                      </div>
                      <div className="divide-y divide-dashed divide-foreground/60">
                        {contributions.map((contribution) => (
                          <div key={contribution._id} className="flex items-center justify-between gap-2 px-3 py-1.5 hover:bg-muted/10 transition-colors">
                            <a
                              href={contribution.pr_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs hover:underline underline-offset-2 truncate flex-1 min-w-0"
                            >
                              {contribution.pr_title}
                            </a>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 border font-mono flex-shrink-0 ${
                                contribution.status === 'merged'
                                  ? 'border-purple-400 text-purple-700 dark:text-purple-400'
                                  : contribution.status === 'open'
                                    ? 'border-green-400 text-green-700 dark:text-green-400'
                                    : contribution.status === 'in_progress'
                                      ? 'border-yellow-400 text-yellow-700 dark:text-yellow-400'
                                      : 'border-red-400 text-red-700 dark:text-red-400'
                              }`}
                            >
                              {contribution.status === 'in_progress' ? 'WIP' : contribution.status.toUpperCase()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Project Section */}
      <div className="flex flex-col w-full">
        <div className="text-left pt-10 pb-5 border-y-2 border-dashed border-foreground flex justify-between">
          <h1 className="flex gap-3 items-center mt-auto mx-5 scroll-m-20 text-4xl font-extrabold tracking-tight w-full">
            <Projector className="w-8 h-8" />
            Projects
          </h1>
        </div>
        <div className="grid md:grid-cols-2 gap-5 m-8 items-stretch">
          {projectsLoading
            ? Array.from({length: 6}).map((_, i) => <SkeletonCard key={i} />)
            : projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  description={project.description}
                  header_icon={getIcon(project.header_icon)}
                  project_title={project.project_title}
                  github_url={project.github_url}
                  deployment_url={project.deployment_url}
                  blog_url={project.blog_url}
                />
              ))}
        </div>
        <Button
          variant={'outline'}
          className="w-fit mx-auto my-10 border-2 border-dashed border-foreground font-bold uppercase tracking-wider hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        >
          more
          <ChevronDown />
        </Button>
      </div>

      {/* Open Source moved to tabs */}

      {/* Recent Blog Section */}
      <div className="flex flex-col w-full">
        <div className="text-left pt-10 pb-5 border-y-2 border-dashed border-foreground flex justify-between">
          <h1 className="flex gap-3 items-center mt-auto mx-5 scroll-m-20 text-4xl font-extrabold tracking-tight w-full">
            <Blocks className="w-8 h-8" />
            Recent Blog
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 m-8">
          {blogsLoading
            ? Array.from({length: 4}).map((_, i) => <SkeletonCard key={i} />)
            : recentBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog_title={blog.title}
                  gist={blog.gist}
                  link={blog.link}
                  create_at={blog.create_at}
                />
              ))}
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default App
