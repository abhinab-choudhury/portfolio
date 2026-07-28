import {useQuery} from '@tanstack/react-query'
import {Button} from './components/ui/button'
import {Blocks, ChevronDown, Projector} from 'lucide-react'
import Navbar from '@components/navbar'
import ProjectCard from '@components/project-card'
import BlogCard from '@components/blog-card'
import Footer from '@components/footer'
import {getProjects, getSocialLinks, getRecentBlogs, type IProject, type ISocialLink, type IRecentBlog} from '@lib/queries'
import {getIcon} from '@lib/icon-registry'

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
