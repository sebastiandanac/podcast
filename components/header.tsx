import { SignedIn, UserButton, SignedOut } from '@clerk/nextjs';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { MoveUpRight } from 'lucide-react';

type Props = {};
export default function Header({}: Props) {
  return (
    <div className='sticky top-0 z-50 flex items-center justify-between border-b bg-background p-4'>
      <div className='flex items-center gap-8'>
        <span className='text-2xl font-bold'>Podcast scheduler</span>

        <div className='flex items-center gap-4'>
          <Button
            variant='ghost-link'
            text='Schedule podcasts'
            href='/schedule-podcast'
          />

          <SignedIn>
            <Button variant='ghost-link' text='Podcasts' href='/dashboard' />
          </SignedIn>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button
            variant='secondary'
            iconSuffix={<MoveUpRight size={20} />}
            text='Sign in'
            href='/sign-in'
          />
        </SignedOut>
      </div>
    </div>
  );
}
