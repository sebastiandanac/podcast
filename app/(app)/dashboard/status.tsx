'use client';
import { ErrorBoundary } from 'react-error-boundary';
import { usePodcastStatuses } from '@/lib/queries/statuses';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PodcastsType } from '@/types/podcasts';
import { useUpdatePodcastStatus } from '@/lib/queries/podcasts';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

type Props = {
  podcast: PodcastsType;
};

function StatusSelect({ podcast }: Props) {
  const [value, setValue] = useState(String(podcast.status_id));

  const query = usePodcastStatuses();
  const mutation = useUpdatePodcastStatus(podcast.id);

  const { toast } = useToast();

  async function changeStatus(status_id: number) {
    mutation.mutate(
      { status_id: status_id },
      {
        onError: (error) => {
          toast({
            title: 'Error, status not updated',
            description: error.message,
          });
        },
        onSuccess: () => {
          toast({
            title: 'Status updated!',
          });

          setValue(String(status_id));
        },
      }
    );
  }

  if (query.isPending) {
    return (
      <div className='h-10 w-[160px] animate-pulse rounded bg-muted'></div>
    );
  }

  if (query?.data) {
    return (
      <Select
        value={value}
        defaultValue={String(podcast.status_id)}
        onValueChange={(value) => changeStatus(Number(value))}
        disabled={mutation.isPending}
      >
        <SelectTrigger className='w-[160px]'>
          <SelectValue placeholder='Status' />

          {mutation.isPending ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <div className='h-4 w-4'></div>
          )}
        </SelectTrigger>
        <SelectContent>
          {query.data.map((item, i) => (
            <SelectItem key={i} value={String(item.id)}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
}

export default function Status({ podcast }: Props) {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <StatusSelect podcast={podcast} />
    </ErrorBoundary>
  );
}
