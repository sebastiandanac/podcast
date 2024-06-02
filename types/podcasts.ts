import { Database } from '@/types/supabase';

export type PodcastsType = Database['public']['Tables']['podcasts']['Row'];
