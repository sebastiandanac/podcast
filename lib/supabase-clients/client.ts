import { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';

function createClerkSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      global: {
        // @ts-ignore
        fetch: async (url: string, options: Record<string, any> = {}) => {
          // @ts-ignore
          const clerkToken = await window.Clerk.session?.getToken({
            template: 'supabase',
          });

          let headers;
          headers = new Headers(options.headers);

          if (clerkToken) {
            headers.set('Authorization', `Bearer ${clerkToken}`);
          }

          // Now call the default fetch
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    }
  );
}

export const supabaseClient = createClerkSupabaseClient();
