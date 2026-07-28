import {createContext, useCallback, useEffect, useState, type ReactNode} from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({children}: {children: ReactNode}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    return stored ?? 'dark'
  })

  // Single place that writes to localStorage + DOM class.
  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    localStorage.setItem('theme', next)
  }, [])

  // Sync the class on <html> whenever theme changes (also on mount).
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}
