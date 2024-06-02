import { cn } from '@/lib/utils';
import Background from '@/components/background';

type Props = {};
export default function Loading({}: Props) {
  return (
    <>
      <div
        className={cn(
          'container my-48 grid max-w-4xl gap-10 rounded-2xl border bg-background p-10 shadow-md'
        )}
      >
        <div className='h-10 w-52 animate-pulse rounded bg-muted'></div>

        <div className='grid gap-4'>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className='flex h-6 gap-6 rounded-md bg-muted'></div>
          ))}
        </div>
      </div>

      <Background />
    </>
  );
}
