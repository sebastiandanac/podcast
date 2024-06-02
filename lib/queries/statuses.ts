import { useQuery } from '@tanstack/react-query';
import { selectPodcastStatuses } from '@/server/select-podcast-statuses';

export function usePodcastStatuses() {
  return useQuery({
    queryKey: ['podcast-statuses'],
    queryFn: selectPodcastStatuses,
  });
}
