import {Octagon} from 'lucide-react'
import {Button} from '@components/ui/button'
import {ThemeToggle} from '@components/theme-toggle'
import type {ISocialLink} from '../App'

interface NavbarProps {
  socialLink: ISocialLink[]
}

export default function Navbar({socialLink}: NavbarProps) {
  return (
    <div className="flex justify-between align-bottom p-6 md:p-10 w-full border-b-2 border-dashed border-foreground mb-2">
      <div className="flex flex-col items-start md:flex-row gap-2">
        <h1 className="font-bold tracking-tight text-2xl md:text-3xl w-[90%] flex gap-3 items-center">
          <Octagon className="fill-accent" />
          Abhinab Choudhury
        </h1>
        <Button variant={'link'} className="mt-2 p-0 text-base">
          @llpabhinabc_
        </Button>
        <div className="flex md:hidden gap-3">
          {socialLink.map((link, idx) => (
            <a key={idx} className="hover:cursor-pointer" href={link.url} target="_blank">
              {link.logo}
            </a>
          ))}
        </div>
      </div>
      <ThemeToggle />
    </div>
  )
}
