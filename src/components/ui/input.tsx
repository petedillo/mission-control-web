import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.05] px-3 py-2 text-sm backdrop-blur-xl ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary/50 focus-visible:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
