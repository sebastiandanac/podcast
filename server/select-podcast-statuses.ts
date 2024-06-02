'use server';

import { supabaseServer } from '@/lib/supabase-clients/server';

export async function selectPodcastStatuses() {
  return await supabaseServer
    .from('podcast_statuses')
    .select()
    .throwOnError()
    .then((r) => r.data && r.data);
}
