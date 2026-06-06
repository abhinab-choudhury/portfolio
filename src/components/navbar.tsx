import {Octagon} from 'lucide-react'
import {Button} from './ui/button'
import {Switch} from './ui/switch'
import useTheme from '@/hooks/useTheme'
import type {ISocialLink} from '@/pages'

export default function Navbar({socialLink}: {socialLink: ISocialLink[]}) {
  const {theme, setTheme} = useTheme()

  return (
    <div className="flex justify-between align-bottom p-10 w-full">
      <div className="flex flex-col items-start md:flex-row gap-2">
        <h1 className="font-semibold tracking-tight text-3xl w-[90%] flex gap-3 items-center">
          <Octagon className="fill-accent" />
          Abhinab Choudhury
        </h1>
        <Button variant={'link'} className="mt-2 p-0">
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
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      />
    </div>
  )
}
