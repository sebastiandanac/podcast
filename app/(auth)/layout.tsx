import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import Background from '@/components/background';

type Props = {
  children: ReactNode;
};
export default async function AuthLayout({ children }: Props) {
  const user = await currentUser();

  if (user) {
    redirect('/');
  }

  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      {children}
      <Background />
    </div>
  );
}
