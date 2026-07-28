import {useContext} from 'react'
import {ThemeContext, type ThemeContextType, type Theme} from '@context/index'

export type {Theme}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
