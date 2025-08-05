import { Rss } from "lucide-react";

export default function Footer() {
  return (
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
  );
}
