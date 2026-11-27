import {NavLink} from 'react-router-dom';
import { useRef } from 'react';
import bundle from 'tegaki/fonts/caveat';
import { Octagon } from 'lucide-react';
import { ThemeToggle } from '@components/theme-toggle';
import { TegakiRenderer, type TegakiRendererHandle } from 'tegaki/react';


export default function Navbar() {
  const rendererRef = useRef<TegakiRendererHandle>(null);
  const handleNameClick = () => {
    const engine = rendererRef.current?.engine;
    if (engine) {
      engine.restart();
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-4 w-full border-b border-dashed border-border mb-4">
      <div className="flex flex-col items-start md:flex-row gap-2">
        <div className="font-bold tracking-tight text-xl w-full flex gap-3 items-center">
          <Octagon className="fill-accent" />
          
          <button type="button"
            onClick={handleNameClick} 
            className="cursor-pointer select-none" 
            title="Click to replay animation"
            aria-label="Abhinab Choudhury — replay name animation"
          >
            <TegakiRenderer
              ref={rendererRef}
              font={bundle}
              time={{ mode: 'uncontrolled', speed: 1, loop: false }}
              style={{ fontSize: 'clamp(24px, 5vw, 32px)' }}
            >
              Abhinab Choudhury
            </TegakiRenderer>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <nav aria-label="Main navigation" className="flex gap-3 font-mono text-xs">
          <NavLink to="/" end className={({isActive}) => isActive ? 'underline underline-offset-4 font-bold' : 'hover:underline'}>Home</NavLink>
          <NavLink to="/project" className={({isActive}) => isActive ? 'underline underline-offset-4 font-bold' : 'hover:underline'}>Projects</NavLink>
        </nav>
        <ThemeToggle />
      </div>
    </div>
  );
}
