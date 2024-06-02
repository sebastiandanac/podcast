'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoveUpRight } from 'lucide-react';
import PodcastForm from '@/components/forms/podcasts/form';
import { useState } from 'react';

type Props = {};
export default function PodcastFormDialog({}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          text='Schedule podcast'
          iconSuffix={<MoveUpRight size={16} />}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mb-4'>
          <DialogTitle>Schedule podcast</DialogTitle>
        </DialogHeader>

        <PodcastForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
