import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Abhinab",
  initials: "AC",
  url: "https://dillion.io",
  location: "Odisha, India",
  locationLink: "https://www.google.com/maps/place/odisha",
  description:
    "I love building things and helping people. Very active on Twitter.",
  summary:
    "At present I am active freelancer, I currently a student to learning building and scaling my skills. In the present, [I pursuing degree in computer science](/#education).",
  avatarUrl: "/me.jpeg",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Java",
    "C++",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "abhinabchoudhury291@gmail.com",
    tel: "+917077664878",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://dub.sh/abhinab-choudhury",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/abhinab-choudhury-18022822b/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/abhinabc_",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "abhinabchoudhury291@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "BharateCore",
      href: "https://bhaarat-core-12f7vwaa1-abhinab-choudhurys-projects.vercel.app/", 
      badges: ["Freelance"],
      location: "Remote",
      title: "Frontend Developer",
      logoUrl: "/bharate_core.png",
      start: " Jul 2024",
      end: "Aug 2024",
      description:
        "Developed a landing page for BharateCore using HTML, CSS, and JavaScript. Ensured responsive design and optimized for performance.",
    },
    {
      company: "Websurds",
      href: "https://websurds.vercel.app/",
      badges: ["Freelance"],
      location: "Remote",
      title: "Full Stack Developer",
      logoUrl: "/websurds.png",
      start: " Jul 2024",
      end: "Aug 2024",
      description:
        "Built a full-stack application using React, Tailwind CSS, and Acertinuy UI. Delivered a user-friendly interface and ensured seamless backend integration.",
    },
    // {
    //   company: "Atomic Finance",
    //   href: "https://atomic.finance",
    //   badges: [],
    //   location: "Remote",
    //   title: "Bitcoin Protocol Engineer",
    //   logoUrl: "/atomic.png",
    //   start: "May 2021",
    //   end: "Oct 2022",
    //   description:
    //     "Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.",
    // },
  ],
  education: [
    {
      school: "Institute of Technical Education and Research - ITER",
      href: "https://www.soa.ac.in/iter",
      degree: "Computer Science and Information Technology (CSIT)",
      logoUrl: "/iter.png",
      start: "2023",
      end: "2027",
    },
  ],
  projects: [
    {
      title: "Currency Convert",
      href: "https://abhinab-choudhury.github.io/currency-convert/",
      dates: "Oct 2023 - Feb 2024",
      active: true,
      description:"Easy-to-Use currency converter application written in JavaScript",
      technologies: [
        "React",
        "JavaScript",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/abhinab-choudhury/currency-convert",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/currency-convert.png",
      video:"",
    },
    {
      title: "Password Generator",
      href: "https://chatcollect.com",
      dates: "May 2024 - Apr 2024",
      active: true,
      description:
        "This is a simple password generator web application built using React and React Hooks. The app allows users to generate random passwords with customizable length and character options.",
      technologies: [
        "React",
        "JavaScript",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://password-generator-one-black.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/abhinab-choudhury/password-generator",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/password-generator.png",
      video:"",
    },
    {
      title: "Futurely",
      href: "futurely.vercel.app",
      dates: "May 2024 - Apr 2024",
      active: true,
      description: "Futurely is an innovative website that helps users predict their future and provides detailed horoscopes based on their respective sun signs.",
      technologies: [
        "React",
        "Gemini",
        "JavaScript",
        "Rapid-api",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Website",
          href: "futurely.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/abhinab-choudhury/Futurely",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/futurely.png",
      video: "",
    },
    {
      title: "WCat-CLI-Tool",
      href: "https://www.npmjs.com/package/wcat-command",
      dates: "Aug 16, 2023 - Aug 21, 2023",
      active: true,
      description:
        "wcat-command is a powerful CLI tool for displaying and manipulating file content directly in the terminal. It allows you to view and process files with various options for formatting and redirection.",
      technologies: [
        "Node.js",
        "Javascript",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.npmjs.com/package/wcat-comman",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/abhinab-choudhury/wcat-command",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/wcat.png",
      video: "",
    },
    // {
    //   title: "Automatic Chat",
    //   href: "https://automatic.chat",
    //   dates: "April 2023 - March 2024",
    //   active: true,
    //   description:
    //     "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
    //   technologies: [
    //     "Next.js",
    //     "Typescript",
    //     "PostgreSQL",
    //     "Prisma",
    //     "TailwindCSS",
    //     "Shadcn UI",
    //     "Magic UI",
    //     "Stripe",
    //     "Cloudflare Workers",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://automatic.chat",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //   ],
    //   image: "",
    //   video:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    // },
  ],
  hackathons: [
    // {
    //   title: "Hack Western 5",
    //   dates: "November 23rd - 25th, 2018",
    //   location: "London, Ontario",
    //   description:
    //     "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
    //   links: [],
    // },
    {
      title: "Hack Odisha 4.0",
      dates: "October 19th - 20th, 2024",
      location: "India",
      description:
        "Developed Care AI, an AI-powered women's healthcare platform featuring chatbot support, menstrual cycle tracking, and virtual doctor consultations.",
      image:
        "https://www.hackodisha.com/images/HO4.svg",
      mlh: "https://www.hackodisha.com/images/HO4.svg",
      links: [],
    },
  ],
} as const;
