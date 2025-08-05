import { cn } from "@/lib/utils";
import { Box } from "lucide-react";

export default function BlogCard({
  className,
  blog_title,
  create_at,
  gist,
}: {
  className?: string;
  blog_title: string;
  create_at: string;
  gist?: string;
}) {
  return (
    <div className={cn(className, "p-4 text-start w-full")}>
      <a className="flex gap-3 items-center cursor-pointer scroll-m-20 text-xl font-semibold tracking-tight">
        <Box />
        {blog_title}
      </a>
      <p className="text-sm py-3">{gist}</p>
      <p className="text-xs text-muted-foreground hover:underline cursor-pointer">
        {create_at}
      </p>
    </div>
  );
}
