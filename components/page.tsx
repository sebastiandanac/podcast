import { ReactNode } from 'react';
import Background from '@/components/background';
import { cn } from '@/lib/utils';

type Props = {
  title?: string;
  topRight?: ReactNode;
  children?: ReactNode;
  className?: string;
};
export default function Page({ title, children, className, topRight }: Props) {
  return (
    <>
      <div
        className={cn(
          'container my-48 grid gap-10 rounded-2xl border bg-background p-10 shadow-md',
          className
        )}
      >
        <div className='flex items-center justify-between'>
          {title && <h1 className='text-4xl font-bold'>{title}</h1>} {topRight}
        </div>
        {children}
      </div>

      <Background />
    </>
  );
}
