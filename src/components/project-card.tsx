import { cn } from "@/lib/utils";

export default function ProjectCard({
  className,
  description = "No Description Found",
  image_src = "https://placehold.co/300x200",
  project_title = "Untitled",
}: {
  className?: string;
  description: string;
  image_src?: string;
  project_title: string;
}) {
  return (
    <div className={cn(className, "rounded-sm w-full pb-5")}>
      <div className="flex flex-col md:flex-row p-10 gap-5 w-full">
        <img src={image_src} className="rounded-xl" />
        <div className="w-[100%] md:w-[50%] flex flex-col gap-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {project_title}
          </h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
