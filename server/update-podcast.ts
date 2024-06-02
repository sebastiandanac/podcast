'use server';

import { supabaseServer } from '@/lib/supabase-clients/server';
import { Database } from '@/types/supabase';

export async function updatePodcast({
  data,
  podcastId,
}: {
  data: Database['public']['Tables']['podcasts']['Update'];
  podcastId: number;
}) {
  return supabaseServer
    .from('podcasts')
    .update(data)
    .eq('id', podcastId)
    .select()
    .throwOnError();
}
