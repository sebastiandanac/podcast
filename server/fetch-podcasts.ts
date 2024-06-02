'use server';

import { supabaseServer } from '@/lib/supabase-clients/server';

export async function fetchPodcasts() {
  return await supabaseServer
    .from('podcasts')
    .select()
    .order('created_at', { ascending: false })
    .throwOnError()
    .then((r) => r.data && r.data);
}
