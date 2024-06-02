'use client';
import { usePodcasts } from '@/lib/queries/podcasts';
import { DataTable } from '@/app/(app)/dashboard/data-table';

type Props = {};
export default function Podcasts({}: Props) {
  const query = usePodcasts();

  if (query.isLoading || query.isPending) {
    return (
      <div className='divide-y rounded-md border'>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className='flex h-[52px] gap-6 p-4'>
            {Array.from({ length: 8 }).map((_, n) => (
              <div
                key={n}
                className='size-full animate-pulse rounded-lg bg-muted'
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (query.isError) {
    return <div>error</div>;
  }

  if (query.data) {
    // @ts-ignore
    return <DataTable data={query.data} />;
  }
}
