'use client';
import { MoveUpRight, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-10 md:p-24'>
      <div className='flex flex-col items-center gap-6'>
        <h2 className='text-5xl font-bold'>error</h2>
        <div className='flex gap-4'>
          <Button
            text='Refresh'
            iconSuffix={<RotateCw size={16} />}
            onClick={() => reset()}
            className='max-sm:w-full'
            variant='secondary'
          />
          <Button
            text='Home'
            iconSuffix={<MoveUpRight size={16} />}
            href='/'
            className='max-sm:w-full'
          />
        </div>
      </div>
    </div>
  );
}
