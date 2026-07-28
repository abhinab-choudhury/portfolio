import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import {cn} from '@lib/utils'

function Switch({className, ...props}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer border-2 border-foreground data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-foreground inline-flex h-[1.3rem] w-10 shrink-0 items-center shadow-[2px_2px_0px_0px_var(--foreground)] transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-foreground pointer-events-none block size-4 ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-[2px]',
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export {Switch}
