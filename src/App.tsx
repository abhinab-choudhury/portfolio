import "./App.css";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import ProjectCard from "./components/project-card";
import {
  Blocks,
  BrainCircuit,
  Octagon,
  Omega,
  Projector,
  QrCode,
  Rss,
  ServerCog,
} from "lucide-react";
import { Gitlab, Github, X, LinkedIn, Hashnode } from "./components/icons";
import BlogCard from "./components/blog-card";

function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto flex min-h-svh flex-col items-center justify-center">
        <div className="flex justify-between align-bottom p-10 w-full">
          <div className="flex flex-col items-start md:flex-row gap-2">
            <h1 className="font-semibold tracking-tight text-3xl w-[90%] flex gap-3 items-center">
              <Octagon className="fill-accent" />
              Abhinab Choudhury
            </h1>
            <Button variant={"link"} className="mt-2 p-0">
              @llpabhinabc_
            </Button>
            <div className="flex md:hidden gap-3">
              <Github className="w-5 h-5" />
              <Gitlab className="w-5 h-5" />
              <LinkedIn className="w-5 h-5" />
              <X className="w-5 h-5" />
              <Hashnode className="w-5 h-5" />
            </div>
          </div>
          <Switch id="dark_mode_btn" />
        </div>

        <div className="flex flex-col md:flex-row border-1 w-full">
          <div className="flex flex-col justify-between p-8 rounded-sm text-sm border-r-1">
            <p>
              If I had to describe myself in three words, they would be Curious,
              over-anxious, and hardworking. Though it might sound a bit weird
              to read, it is what it is. I am currently working on developing my
              skills, which are primarily focused on web2, Generative AI, and
              DevOps.
            </p>
            <p className="text-muted-foreground text-xs">
              -- Eat, Sleep Code Repeat --
            </p>
          </div>
          <div className="hidden md:flex flex-col w-[100%] md:w-[40%] gap-3 p-5">
            <a className="flex gap-2">
              <Github className="w-6 h-6" />
              Github
            </a>
            <a className="flex gap-2">
              <Gitlab className="w-6 h-6" />
              Gitlab
            </a>
            <a className="flex gap-2">
              <LinkedIn className="w-5 h-5" />
              LinkedIn
            </a>
            <a className="flex gap-2">
              <X className="w-6 h-6" />X (Twitter)
            </a>
            <a className="flex gap-2">
              <Hashnode className="w-6 h-6" />
              Hashnode
            </a>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="text-left pt-10 pb-5 border-b-1 flex justify-between">
            <h1 className="flex gap-3 items-center mt-auto mx-5 md:lg-0 scroll-m-20 text-4xl font-extrabold tracking-tight w-full">
              <Projector className="w-8 h-8" />
              Projects
            </h1>
          </div>
          <div className="flex flex-wrap justify-center align-middle w-full">
            <div>
              <ProjectCard
                description="ShortWave is a sleek and efficient URL shortener that features a fully interactive dashboard and built-in QR code generation. Designed for simplicity and usability, it allows users to manage, track, and share short links effortlessly while also supporting instant QR export for print and digital use."
                header_icon={<QrCode className="w-8 h-8" />}
                project_title="ShortWave"
                github_url="https://github.com/abhinab-choudhury/shortwave"
              />
              <ProjectCard
                description="HTTP Server in C demonstrates low-level networking skills through a web server built entirely from scratch"
                header_icon={<ServerCog className="w-8 h-8" />}
                project_title="HTTP Server"
                github_url="https://github.com/abhinab-choudhury/htt"
              />
            </div>
            <div>
              <ProjectCard
                description="CodeXpert is a locally hosted AI tool that assists with solving coding problems on platforms like LeetCode, leveraging the Ollama runtime for full privacy and offline support"
                header_icon={<BrainCircuit className="w-8 h-8" />}
                project_title="CodeXpert"
              />
              <ProjectCard
                description="Mathstral, an AI-powered math assistant that uses the open-source Mistral model to break down and explain complex math problems with clarity and precision—perfect for students and self-learners tackling challenging concepts."
                header_icon={<Omega className="w-8 h-8" />}
                project_title="Mathstral"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="text-left pt-10 pb-5 border-y-1 flex justify-between">
            <h1 className="flex gap-3 items-center mt-auto mx-5 md:lg-0 scroll-m-20 text-4xl font-extrabold tracking-tight w-full">
              <Blocks className="w-8 h-8" />
              Recent Blog
            </h1>
          </div>
          <div className="flex mx-auto flex-wrap items-center justify-center align-middle w-full">
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
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
        <div className="w-full px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 dark:border-gray-700 text-sm text-muted-foreground">
          <div className="mb-2 sm:mb-0">
            Portfolio{" "}
            <a href="#" className="underline underline-offset-2">
              @llpabhinabc_
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-1 hover:text-primary transition"
            >
              <Rss className="w-4 h-4" />
              RSS
            </a>
            <span>© 2025</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
