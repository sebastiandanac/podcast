import Header from '@/components/header';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export default function AppLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
