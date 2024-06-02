import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchPodcasts } from '@/server/fetch-podcasts';
import { ReactNode } from 'react';
import { selectPodcastStatuses } from '@/server/select-podcast-statuses';

type Props = {
  children: ReactNode;
};
export default async function Layout({ children }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['podcasts'],
    queryFn: fetchPodcasts,
  });
  await queryClient.prefetchQuery({
    queryKey: ['podcast-statuses'],
    queryFn: selectPodcastStatuses,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
