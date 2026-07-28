import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'

import {cn} from '@lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-[transform,box-shadow,opacity] duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-2 focus-visible:border-foreground",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground border-2 border-foreground shadow-[4px_4px_0px_0px_var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px]',
        destructive:
          'bg-destructive text-white border-2 border-foreground shadow-[4px_4px_0px_0px_var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px]',
        outline:
          'bg-background border-2 border-foreground shadow-[4px_4px_0px_0px_var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px]',
        secondary: 'bg-secondary text-secondary-foreground border-2 border-foreground shadow-[4px_4px_0px_0px_var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px]',
        ghost: 'border-2 border-transparent hover:border-foreground hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline border-2 border-transparent',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-9 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-11 px-6 has-[>svg]:px-4',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({variant, size, className}))}
      {...props}
    />
  )
}

const CalButton = ({className, value}: {className?: string; value: string}) => {
  return (
    <button
      className={cn(
        className,
        'bg-red-950 text-red-400 border-2 border-foreground border-b-4 font-bold overflow-hidden relative px-4 py-2 hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-[4px_4px_0px_0px_var(--foreground)]',
      )}
    >
      <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
      {value}
    </button>
  )
}

export {Button, CalButton, buttonVariants}
