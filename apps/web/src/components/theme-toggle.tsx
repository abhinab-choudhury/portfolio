import {Sun, Moon} from 'lucide-react'
import {Button} from '@components/ui/button'
import {useTheme} from '@hooks/use-theme'
import {useThemeTransition} from '@hooks/use-theme-transition'

export function ThemeToggle() {
  const {theme, setTheme} = useTheme()
  const {toggle} = useThemeTransition()

  return (
    <Button
      variant="outline"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={theme === 'dark'}
      className="theme-toggle-snapshot relative size-10 p-0 overflow-hidden"
      onClick={(e) => toggle(e, theme, setTheme)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle(e, theme, setTheme)
        }
      }}
    >
      <Sun
        className={`absolute size-5 transition-all duration-300 ${
          theme === 'dark'
            ? 'rotate-0 scale-100 opacity-100'
            : 'rotate-90 scale-0 opacity-0'
        }`}
      />
      <Moon
        className={`absolute size-5 transition-all duration-300 ${
          theme === 'light'
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
        }`}
      />
    </Button>
  )
}
