import { createContext } from "react";

interface themeContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const ThemeContext = createContext<themeContextType | null>(null);
