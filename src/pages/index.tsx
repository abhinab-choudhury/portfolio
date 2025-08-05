import BlogCard from "@/components/blog-card";
import Footer from "@/components/footer";
import { Github, Gitlab, Hashnode, LinkedIn, X } from "@/components/icons";
import Navbar from "@/components/navbar";
import ProjectCard from "@/components/project-card";
import { Button } from "@/components/ui/button";
import {
  AirVent,
  Blocks,
  BrainCircuit,
  ChevronDown,
  Gpu,
  Omega,
  Pickaxe,
  Projector,
  QrCode,
  ServerCog,
} from "lucide-react";

export default function IndexPage() {
  const projects: {
    project_title: string;
    description: string;
    header_icon: React.ReactNode;
    image_src?: string;
    github_url?: string;
    deployment_url?: string;
    blog_url?: string;
  }[] = [
    {
      project_title: "CodeXpert",
      description:
        "A privacy-focused AI assistant that helps solve coding problems locally using Ollama, fully offline and secure.",
      header_icon: <BrainCircuit className="w-8 h-8" />,
      github_url: "https://github.com/abhinab-choudhury/codexpert",
      deployment_url: "",
      blog_url: "",
    },
    {
      project_title: "ShortWave",
      description:
        "A modern URL shortener with a real-time dashboard, QR generation, and link analytics.",
      header_icon: <QrCode className="w-8 h-8" />,
      github_url: "https://github.com/abhinab-choudhury/shortwave",
      deployment_url: "",
      blog_url: "",
    },
    {
      project_title: "DeepFx Studio",
      description:
        "An AI-powered image editing suite offering enhancements, restorations, and creative transformations.",
      header_icon: <Gpu className="w-8 h-8" />,
      github_url: "http://github.com/xBastille/DeepFX-Studio",
      deployment_url: "",
      blog_url: "",
    },
    {
      project_title: "Manim Video Generation",
      description:
        "Automates high-quality math and concept videos using the Manim Python library.",
      header_icon: <Omega className="w-8 h-8" />,
      github_url: "https://github.com/abhinab-choudhury/manim-video-gen",
      deployment_url: "",
      blog_url: "",
    },
    {
      project_title: "Mermaid AI",
      description:
        "Generate flowcharts and diagrams with natural language prompts using Mermaid.js and AI.",
      header_icon: <AirVent className="w-8 h-8" />,
      github_url: "https://github.com/abhinab-choudhury/mermaid-ai",
      deployment_url: "",
      blog_url: "",
    },
    {
      project_title: "HTTP Server",
      description:
        "A bare-metal web server built in C, demonstrating core network protocol implementation.",
      header_icon: <ServerCog className="w-8 h-8" />,
      github_url: "https://github.com/abhinab-choudhury/Http-Server",
      deployment_url: "",
      blog_url: "",
    },
    {
      project_title: "StackOverflow Web-Crawler",
      description:
        "A Go-based crawler that indexes StackOverflow posts and stores metadata in MongoDB with full-text search, with AI Chat.",
      header_icon: <Pickaxe className="w-8 h-8" />,
      github_url: "https://github.com/abhinab-choudhury/stackoverflow-crawler",
      deployment_url: "",
      blog_url: "",
    },
  ];

  const socialLink: { name: string; url: string; logo: React.ReactNode }[] = [
    {
      name: "Github",
      url: "https://github.com/abhinab-choudhury",
      logo: <Github className="w-5 h-5" />,
    },
    {
      name: "Gitlab",
      url: "https://gitlab.com/abhinab-choudhury",
      logo: <Gitlab className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abhinab-choudhury/",
      logo: <LinkedIn className="w-5 h-5" />,
    },
    {
      name: "Twitter",
      url: "https://x.com/abhinabc_",
      logo: <X className="w-5 h-5 dark:bg-white dark:rounded-xl" />,
    },
    {
      name: "Hashnode",
      url: "https://abhinab-choudhury.hashnode.dev",
      logo: <Hashnode className="w-5 h-5" />,
    },
  ];

  return (
    <div className="max-w-4xl text-sm mx-auto flex min-h-svh flex-col items-center justify-center">
      <Navbar />

      <div className="flex flex-col md:flex-row border-1 w-full">
        <div className="flex flex-col justify-between p-8 rounded-sm text-sm border-r-1">
          <p>
            I'm a passionate developer driven by curiosity, creativity, and
            consistency. I specialize in Web2 technologies, and I'm always
            exploring ways to build smarter, faster, and more impactful digital
            products.
          </p>
          <p className="text-muted-foreground text-xs mt-5">
            -- Eat. Sleep. Code. Repeat. --
          </p>
        </div>
        <div className="hidden md:flex flex-col w-[100%] md:w-[40%] gap-3 p-5">
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
        <div className="text-left pt-10 pb-5 border-b-1 flex justify-between">
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
        <Button variant={"ghost"} className="w-fit mx-auto my-10">
          more
          <ChevronDown />
        </Button>
      </div>

      {/* Recent Blog Section */}
      <div className="flex flex-col w-[100%]">
        <div className="text-left pt-10 pb-5 border-y-1 flex justify-between">
          <h1 className="flex gap-3 items-center mt-auto mx-5 md:lg-0 scroll-m-20 text-4xl font-extrabold tracking-tight w-full">
            <Blocks className="w-8 h-8" />
            Recent Blog
          </h1>
        </div>
        <div className="flex flex-wrap mx-auto items-center justify-center align-middle w-full">
          <div className="flex flex-col gap-2 w-[50%]">
            <BlogCard
              blog_title="Blog - 1"
              gist="A Compressive Guide on Fine Tunning Mistral Model using Uslot"
              create_at="3rd July, 2024"
            />
            <BlogCard
              blog_title="Blog - 2"
              gist="A Compressive Guide on Fine Tunning Mistral Model using Uslot"
              create_at="3rd July, 2024"
            />
            <BlogCard
              blog_title="Blog - 3"
              gist="A Compressive Guide on Fine Tunning Mistral Model using Uslot"
              create_at="3rd July, 2024"
            />
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <BlogCard
              blog_title="Blog - 1"
              gist="A Compressive Guide on Fine Tunning Mistral Model using Uslot"
              create_at="3rd July, 2024"
            />
            <BlogCard
              blog_title="Blog - 2"
              gist="A Compressive Guide on Fine Tunning Mistral Model using Uslot"
              create_at="3rd July, 2024"
            />
            <BlogCard
              blog_title="Blog - 3"
              gist="A Compressive Guide on Fine Tunning Mistral Model using Uslot"
              create_at="3rd July, 2024"
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
