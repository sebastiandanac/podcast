'use server';

import { Database } from '@/types/supabase';
import { supabaseServer } from '@/lib/supabase-clients/server';

type PodcastType = Database['public']['Tables']['podcasts'];

function isWithinSchedulableHours(timestamp: string) {
  const date = new Date(timestamp);
  const hour = date.getHours();
  return hour >= 8 && hour < 17;
}

function isWeekend(timestamp: string) {
  const date = new Date(timestamp);
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  return day === 0 || day === 6;
}

export async function insertPodcast(data: PodcastType['Insert']) {
  if (!isWithinSchedulableHours(data.date_time)) {
    throw new Error('Podcast must be scheduled within 8am-5pm.');
  }

  if (isWeekend(data.date_time)) {
    throw new Error('Podcast can be scheduled only on weekdays.');
  }

  try {
    return await supabaseServer.from('podcasts').insert(data).throwOnError();
  } catch (error) {
    throw new Error(String(error));
  }
}
