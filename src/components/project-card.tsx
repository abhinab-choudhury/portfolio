import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export default function ProjectCard({
  className,
  header_icon,
  description,
  project_title,
  github_url,
  deployment_url,
  blog_url,
}: {
  className?: string;
  header_icon: React.ReactNode;
  description: string;
  image_src?: string;
  project_title: string;
  github_url?: string;
  deployment_url?: string;
  blog_url?: string;
}) {
  return (
    <div className={cn(className, "w-full")}>
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full flex flex-col p-10 justify-between gap-4">
          <div className="flex flex-col gap-5">
            <h3 className="cursor-pointer text-balance flex gap-3 items-center scroll-m-20 text-2xl font-semibold tracking-tight">
              {header_icon}
              {project_title}
            </h3>
            <p className="text-sm">{description}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {github_url && (
              <Badge variant={"default"} asChild>
                <a className="px-2 py-1" href={github_url} target="_blank">
                  Github
                </a>
              </Badge>
            )}
            {deployment_url && (
              <Badge variant={"secondary"} asChild>
                <a className="px-2 py-1" href={deployment_url} target="_blank">
                  Deployment
                </a>
              </Badge>
            )}
            {blog_url && (
              <Badge variant={"outline"} asChild>
                <a className="px-2 py-1" href={blog_url} target="_blank">
                  Blog
                </a>
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectCardSkeleton({ className }: { className: string }) {
  return <div className={cn(className, "w-full h-[200px] pb-5")}></div>;
}
