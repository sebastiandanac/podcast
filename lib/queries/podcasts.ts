import { useMutation, useQuery } from '@tanstack/react-query';
import { Database } from '@/types/supabase';
import { insertPodcast } from '@/server/insert-podcast';
import { updatePodcast } from '@/server/update-podcast';
import { fetchPodcasts } from '@/server/fetch-podcasts';

export function usePodcasts() {
  return useQuery({
    queryKey: ['podcasts'],
    queryFn: fetchPodcasts,
  });
}

export function useCreatePodcast() {
  return useMutation({
    mutationKey: ['create-podcast'],
    mutationFn: insertPodcast,
  });
}

export function useUpdatePodcast(podcastId: number) {
  return useMutation({
    mutationKey: ['update-podcast'],
    mutationFn: (data: Database['public']['Tables']['podcasts']['Update']) =>
      updatePodcast({ data, podcastId }),
  });
}
