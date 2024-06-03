import { useMutation, useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/lib/supabase-clients/client';
import { Database } from '@/types/supabase';
import { insertPodcast } from '@/server/insert-podcast';
import { updatePodcast } from '@/server/update-podcast';

async function fetchPodcasts() {
  return await supabaseClient
    .from('podcasts')
    .select()
    .order('created_at', { ascending: false })
    .throwOnError()
    .then((r) => r.data);
}

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
