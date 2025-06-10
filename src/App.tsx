import "./App.css";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import ProjectCard from "./components/project-card";
import { Rss } from "lucide-react";

function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto flex min-h-svh flex-col items-center justify-center">
        <div className="flex justify-between align-bottom border-y-1 p-10 w-full">
          <div className="flex flex-col items-start md:flex-row gap-2">
            <h1 className="font-semibold tracking-tight text-3xl w-[90%]">
              Abhinab Choudhury
            </h1>
            <Button variant={"link"} className="mt-2 p-0">
              @llpabhinabc_
            </Button>
          </div>
          <Switch id="dark_mode_btn" />
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <div className="p-8 border-x-1 rounded-sm text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </div>
          <div className="flex flex-col w-[100%] md:w-[40%] gap-0">
            <Button variant="default">Github</Button>
            <Button variant="secondary">Gitlab</Button>
            <Button variant="secondary">LinkedIn</Button>
            <Button variant="secondary">X (Twitter)</Button>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="text-left pt-10 pb-5 border-y-1 flex justify-between">
            <h1 className="mt-auto mx-5 md:lg-0 scroll-m-20 text-4xl font-extrabold tracking-tight w-full">
              Projects
            </h1>
          </div>
          <div className="flex flex-wrap justify-center align-middle w-full">
            <div>
              <ProjectCard
                description="ShortWave is a sleek and efficient URL shortener that features a fully interactive dashboard and built-in QR code generation. Designed for simplicity and usability, it allows users to manage, track, and share short links effortlessly while also supporting instant QR export for print and digital use."
                project_title="ShortWave"
              />
              <ProjectCard
                description=" HTTP Server in C demonstrates low-level networking skills through a web server built entirely from scratch"
                project_title="HTTP Server"
              />
            </div>
            <div>
              <ProjectCard
                description="CodeXpert is a locally hosted AI tool that assists with solving coding problems on platforms like LeetCode, leveraging the Ollama runtime for full privacy and offline support"
                project_title="CodeXpert"
              />
              <ProjectCard
                description="Mathstral, an AI-powered math assistant that uses the open-source Mistral model to break down and explain complex math problems with clarity and precision—perfect for students and self-learners tackling challenging concepts."
                project_title="Mathstral"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="text-left pt-10 pb-5 border-y-1 flex justify-between">
            <h1 className="mt-auto mx-5 md:lg-0 scroll-m-20 text-4xl font-extrabold tracking-tight w-full">
              Recent Blog
            </h1>
          </div>
          <div className="flex flex-wrap justify-start align-middle w-full p-5">
            <div className="flex flex-col gap-2">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Blog - 1
              </h4>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Blog - 2
              </h4>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Blog - 3
              </h4>
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
