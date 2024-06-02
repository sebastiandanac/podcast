'use server';

import { Database } from '@/types/supabase';
import { supabaseServer } from '@/lib/supabase-clients/server';

type PodcastType = Database['public']['Tables']['podcasts'];

function isWithinSchedulableHours(timestamp: string) {
  const date = new Date(timestamp);
  const hour = date.getHours();
  return hour >= 8 && hour < 17;
}

export async function insertPodcast(data: PodcastType['Insert']) {
  if (!isWithinSchedulableHours(data.date_time)) {
    throw new Error('Podcast must be scheduled within 8am-5pm.');
  }

  try {
    return await supabaseServer.from('podcasts').insert(data).throwOnError();
  } catch (error) {
    throw new Error(String(error));
  }
}
