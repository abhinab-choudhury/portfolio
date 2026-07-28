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
    <div className="flex justify-between align-bottom p-6 md:p-10 w-full border-b-2 border-dashed border-foreground mb-2">
      <div className="flex flex-col items-start md:flex-row gap-2">
        <h1 className="font-bold tracking-tight text-2xl md:text-3xl w-full flex gap-3 items-center">
          <Octagon className="fill-accent" />
          
          <div 
            onClick={handleNameClick} 
            className="cursor-pointer select-none" 
            title="Click to replay animation"
          >
            <TegakiRenderer
              ref={rendererRef}
              font={bundle}
              time={{ mode: 'uncontrolled', speed: 1, loop: false }}
              style={{ fontSize: 48 }}
            >
              Abhinab Choudhury
            </TegakiRenderer>
          </div>
        </h1>
      </div>
      <ThemeToggle />
    </div>
  );
}
