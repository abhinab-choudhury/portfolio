import { Button } from "./components/ui/button";

function App() {
  const projects: IProject[] = [
    {
      project_title: 'WorkerQueue',
      description:
        'Queue-based task processing system built with Java, enabling efficient background job handling and asynchronous workflows.',
      header_icon: <RefreshCcw className="w-8 h-8" />,
      github_url: 'https://github.com/abhinab-choudhury/WorkerQueue',
      deployment_url: '',
      blog_url: 'https://deepwiki.com/abhinab-choudhury/WorkerQueue',
    },
    {
      project_title: 'Crop AI',
      description:
        'An AI-powered crop disease detection and recommendation system that helps farmers identify and manage crop diseases effectively.',
      header_icon: <WheatIcon className="w-8 h-8" />,
      github_url: 'https://github.com/abhinab-choudhury/crop-ai',
      deployment_url: 'https://crop-ai-one.vercel.app/',
      blog_url: 'https://deepwiki.com/abhinab-choudhury/Crop-AI',
    },
    {
      project_title: 'CodeXpert',
      description:
        'A privacy-focused AI assistant that helps solve coding problems locally using Ollama, fully offline and secure.',
      header_icon: <BrainCircuit className="w-8 h-8" />,
      github_url: 'https://github.com/abhinab-choudhury/codexpert',
      deployment_url: '',
      blog_url: '',
    },
    {
      project_title: 'ShortWave',
      description:
        'A modern URL shortener with a real-time dashboard, QR generation, and link analytics.',
      header_icon: <QrCode className="w-8 h-8" />,
      github_url: 'https://github.com/abhinab-choudhury/shortwave',
      deployment_url: 'https://short-wave.vercel.app/',
      blog_url: '',
    },
    {
      project_title: 'DeepFx Studio',
      description:
        'An AI-powered image editing suite offering enhancements, restorations, and creative transformations.',
      header_icon: <Gpu className="w-8 h-8" />,
      github_url: 'http://github.com/xBastille/DeepFX-Studio',
      deployment_url: '',
      blog_url: '',
    },
    {
      project_title: 'Manim Video Generation',
      description: 'Automates high-quality math and concept videos using the Manim Python library.',
      header_icon: <Omega className="w-8 h-8" />,
      github_url: 'https://github.com/abhinab-choudhury/manim-video-gen',
      deployment_url: '',
      blog_url: '',
    },
    {
      project_title: 'Movie-sovi',
      description:
        'Movie-sovi is an AI-powered movie recommendation system that provides personalized film suggestions based on user preferences and viewing history.',
      header_icon: <ClapperboardIcon className="w-8 h-8" />,
      github_url: 'https://github.com/abhinab-choudhury/movie-sovi',
      deployment_url: 'https://movie-sovi.vercel.app/',
      blog_url: '',
    },
    {
      project_title: 'HTTP Server',
      description:
        'A bare-metal web server built in C, demonstrating core network protocol implementation.',
      header_icon: <ServerCog className="w-8 h-8" />,
      github_url: 'https://github.com/abhinab-choudhury/Http-Server',
      deployment_url: '',
      blog_url: '',
    },
    {
      project_title: 'StackOverflow Web-Crawler',
      description:
        'A Go-based crawler that indexes StackOverflow posts and stores metadata in MongoDB with full-text search, with AI Chat.',
      header_icon: <Pickaxe className="w-8 h-8" />,
      github_url: 'https://github.com/abhinab-choudhury/stackoverflow-crawler',
      deployment_url: '',
      blog_url: '',
    },
    {
      project_title: 'Algorithm-Visualizer',
      description:
        'A web-based tool that visually demonstrates the execution of various algorithms, aiding in understanding and learning.',
      header_icon: <Variable className="w-8 h-8" />,
      github_url: 'https://github.com/abhinab-choudhury/Algorithm-Visualizer',
      deployment_url: 'https://algorithm-visualizer-beta.netlify.app/',
      blog_url: 'https://deepwiki.com/abhinab-choudhury/Algorithm-Visualizer',
    },
    {
      project_title: 'Torrent CLI',
      description:
        'Torrent CLI is a command-line tool built in Go for downloading and managing torrent files.',
      header_icon: <TerminalIcon className="w-8 h-8" />,
      github_url: 'https://github.com/abhinab-choudhury/torrent-cli',
      deployment_url: '',
      blog_url: '',
    },
    {
      project_title: 'Headliner',
      description:
        'A News Client with a AI Power News Summarization Chrome Extension, CLI interface and Website also supports Hacker News',
      header_icon: <Headphones className="w-8 h-8" />,
      github_url: 'https://github.com/abhinab-choudhury/headliner',
      deployment_url: 'https://headliner-news-app.vercel.app/',
      blog_url: '',
    },
    {
      project_title: 'Task Management System',
      description:
        'A full-stack task management application with user authentication, real-time updates, and a responsive design, with HTML, CSS and Javascript.',
      header_icon: <ListTodoIcon className="w-8 h-8" />,
      github_url: 'https://github.com/abhinab-choudhury/Task-Management-System',
      deployment_url: 'https://tms-blond.vercel.app/',
      blog_url: '',
    },
  ]

  const socialLink: ISocialLink[] = [
    {
      name: 'Github',
      url: 'https://github.com/abhinab-choudhury',
      logo: <Github className="w-5 h-5" />,
    },
    {
      name: 'Codolio',
      url: 'https://codolio.com/profile/abhinab-choudhury',
      logo: <Codolio className="w-5 h-5" />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/abhinab-choudhury/',
      logo: <LinkedIn className="w-5 h-5" />,
    },
    {
      name: 'Twitter',
      url: 'https://x.com/abhinabc_',
      logo: <X className="w-5 h-5 dark:bg-white dark:rounded-xl" />,
    },
    {
      name: 'Hashnode',
      url: 'https://abhinab-choudhury.hashnode.dev',
      logo: <Hashnode className="w-5 h-5" />,
    },
  ]

  const recentBlogs: IRecentBlog[] = [
    {
      title: 'Building an HTTP Server in C (Linux)',
      gist: 'A comprehensive guide to building a basic HTTP server in C on Linux, covering socket programming, request handling, and response generation.',
      link: 'https://abhinab-choudhury.hashnode.dev/building-an-http-server-in-c-linux',
      create_at: '22nd July, 2025',
    },
    {
      title: 'Session Based Authentication',
      gist: 'Implementing a Session-Based Authentication using Node and Express.js',
      link: 'https://abhinab-choudhury.hashnode.dev/implementing-a-session-based-authentication-using-node-and-expressjs',
      create_at: '1st July, 2025',
    },
    {
      title: 'Authentication',
      gist: 'How Authentication works? A deep dive into the world of authentication, exploring various methods, protocols, and best practices to secure user identities and data.',
      link: 'https://abhinab-choudhury.hashnode.dev/how-auth-works',
      create_at: '3rd July, 2025',
    },
    {
      title: 'Rate Limiting',
      gist: 'Why Rate Limiting is Crucial in Backend Systems, exploring its importance in preventing abuse, ensuring fair resource usage, and maintaining system stability under high traffic conditions.',
      link: 'https://abhinab-choudhury.hashnode.dev/why-rate-limiting-is-crucial-in-backend-systems',
      create_at: '18th June, 2025',
    },
    {
      title: 'Generation APK File for React Native Project',
      gist: 'A step-by-step guide on how to generate an APK file from a React Native project, covering the necessary configurations and commands.',
      link: 'https://abhinab-choudhury.hashnode.dev/generate-apk-file-from-react-native-expo-app',
      create_at: '17th Feb, 2025',
    },
    {
      title: 'Importance of OG Image',
      gist: 'The Importance of OG (Open Graph) Images in Web Development and Social Media Sharing',
      link: 'https://abhinab-choudhury.hashnode.dev/open-graph-images',
      create_at: '31st July, 2025',
    },
  ]

  return (
    <div className="max-w-4xl text-sm mx-auto flex min-h-svh flex-col items-center justify-center">
      <Navbar socialLink={socialLink} />

      <div className="flex flex-col md:flex-row border w-full">
        <div className="flex flex-col justify-between p-8 rounded-sm text-sm border-r">
          <p>
            I'm a passionate developer driven by curiosity, creativity, and consistency. I
            specialize in Web2 technologies, and I'm always exploring ways to build smarter, faster,
            and more impactful digital products.
          </p>
          <p className="text-muted-foreground text-xs mt-5">-- Eat. Sleep. Code. Repeat. --</p>
        </div>
        <div className="hidden md:flex flex-col w-full md:w-[40%] gap-3 p-5">
          {socialLink.map((link, idx) => (
            <a key={idx} href={link.url} target="_blank" className="flex gap-2">
              {link.logo}
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Project Section */}
      <div className="flex flex-col w-full">
        <div className="text-left pt-10 pb-5 border-b flex justify-between">
          <h1 className="flex gap-3 items-center mt-auto mx-5 md:lg-0 scroll-m-20 text-4xl font-extrabold tracking-tight w-full">
            <Projector className="w-8 h-8" />
            Projects
          </h1>
        </div>
        <div className="grid md:grid-cols-2 justify-center align-middle">
          {projects.map((project, idx) => (
            <ProjectCard
              key={idx}
              image_src={project.image_src}
              description={project.description}
              header_icon={project.header_icon}
              project_title={project.project_title}
              github_url={project.github_url}
              deployment_url={project.deployment_url}
              blog_url={project.blog_url}
            />
          ))}
        </div>
        <Button variant={'ghost'} className="w-fit mx-auto my-10">
          more
          <ChevronDown />
        </Button>
      </div>

      {/* Recent Blog Section */}
      <div className="flex flex-col w-full">
        <div className="text-left pt-10 pb-5 border-y flex justify-between">
          <h1 className="flex gap-3 items-center mt-auto mx-5 md:lg-0 scroll-m-20 text-4xl font-extrabold tracking-tight w-full">
            <Blocks className="w-8 h-8" />
            Recent Blog
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 m-8">
          {recentBlogs.map((blog) => (
            <BlogCard
              key={blog.title}
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

export default App;
