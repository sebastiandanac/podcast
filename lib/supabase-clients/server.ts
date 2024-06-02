import { Database } from '@/types/supabase';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

function createClerkSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      global: {
        // Get the Supabase token with a custom fetch method
        fetch: async (url, options: Record<string, any> = {}) => {
          const clerkToken = await auth().getToken({ template: 'supabase' });

          let headers;
          headers = new Headers(options?.headers);

          if (clerkToken) {
            // Construct fetch headers
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

export const supabaseServer = createClerkSupabaseClient();
