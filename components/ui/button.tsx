import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex  gap-2 items-center justify-center text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        'destructive-light':
          'bg-destructive/20 text-destructive hover:bg-destructive/90 hover:text-destructive-foreground',
        'destructive-outline':
          'border-destructive text-destructive border hover:text-white hover:bg-destructive',
        'destructive-hover':
          'hover:text-white hover:bg-destructive font-medium',
        outline:
          'border border-input hover:bg-border hover:text-accent-foreground font-medium',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium',
        ghost: 'hover:bg-border hover:text-accent-foreground font-medium',
        link: 'underline-offset-4 hover:underline text-primary font-medium',
        'ghost-link': 'text-primary/70 hover:text-primary font-medium',
      },
      size: {
        default: 'h-10 py-2 px-4',
        square: 'h-10 w-10',
        'square-sm': 'h-7 w-7',
        xs: 'h-8 px-2',
        sm: 'h-9 px-3',
        lg: 'h-12 px-8',
        xl: 'h-16 px-12 text-xl',
      },
      rounded: {
        full: 'rounded-full',
        xl: 'rounded-xl',
        md: 'rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  text?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconSuffix?: React.ReactNode;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      text,
      children,
      rounded,
      icon,
      iconSuffix,
      href,
      ...props
    },
    ref
  ) => {
    let Comp;
    const domainRe = /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;

    if (asChild) {
      Comp = Slot;
    } else if (href) {
      if (domainRe.exec(href)) {
        Comp = 'a';
      }

      Comp = Link;
    } else {
      Comp = 'button';
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, rounded }))}
        // @ts-ignore
        ref={ref}
        // @ts-ignore
        href={href}
        {...props}
      >
        {children ? (
          children
        ) : (
          <>
            {loading && !iconSuffix ? (
              <Loader className='size-4 animate-spin' />
            ) : (
              icon
            )}
            {text && <span>{text}</span>}
            {loading && iconSuffix ? (
              <Loader className='size-4 animate-spin' />
            ) : (
              iconSuffix
            )}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
