import { Octagon } from "lucide-react";
import { Button } from "./ui/button";
import { Github, Gitlab, Hashnode, LinkedIn, X } from "./icons";
import { Switch } from "./ui/switch";
import useTheme from "@/hooks/useTheme";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const socialLink: { url: string; logo: React.ReactNode }[] = [
    {
      url: "https://github.com/abhinab-choudhury",
      logo: <Github className="w-5 h-5" />,
    },
    {
      url: "https://gitlab.com/abhinab-choudhury",
      logo: <Gitlab className="w-5 h-5" />,
    },
    {
      url: "https://www.linkedin.com/in/abhinab-choudhury/",
      logo: <LinkedIn className="w-5 h-5" />,
    },
    {
      url: "https://x.com/abhinabc_",
      logo: <X className="w-5 h-5" />,
    },
    {
      url: "https://abhinab-choudhury.hashnode.dev",
      logo: <Hashnode className="w-5 h-5" />,
    },
  ];

  return (
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
          {socialLink.map((link, idx) => (
            <a
              key={idx}
              className="hover:cursor-pointer"
              href={link.url}
              target="_blank"
            >
              {link.logo}
            </a>
          ))}
        </div>
      </div>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
  );
}
