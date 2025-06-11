import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export default function ProjectCard({
  className,
  header_icon,
  description = "No Description Found",
  image_src = "https://placehold.co/300x200",
  project_title = "Untitled",
  github_url,
  deployment_url,
  blog_url,
}: {
  className?: string;
  header_icon?: React.ReactNode;
  description?: string;
  image_src?: string;
  project_title?: string;
  github_url?: string;
  deployment_url?: string;
  blog_url?: string;
}) {
  return (
    <div className={cn(className, "w-full pb-5")}>
      <div className="flex flex-col md:flex-row p-10 gap-5 w-full">
        <img src={image_src} className="cursor-pointer rounded-xl" />
        <div className="w-[100%] md:w-[50%] flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-5">
            <h3 className="cursor-pointer flex gap-3 items-center scroll-m-20 text-2xl font-semibold tracking-tight">
              {header_icon}
              {project_title}
            </h3>
            <p className="text-sm">{description}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {github_url && (
              <Badge variant={"default"} asChild>
                <a href={github_url} target="_blank">
                  Github
                </a>
              </Badge>
            )}
            {deployment_url && (
              <Badge variant={"secondary"} asChild>
                <a href={deployment_url} target="_blank">
                  Deployment
                </a>
              </Badge>
            )}
            {blog_url && (
              <Badge variant={"outline"} asChild>
                <a href={blog_url} target="_blank">
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
