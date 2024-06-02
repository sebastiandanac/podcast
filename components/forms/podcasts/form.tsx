'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  podcastFormSchema,
  podcastFormInputs,
} from '@/components/forms/podcasts/data';
import { Form } from '@/components/ui/form';
import { useCreatePodcast } from '@/lib/queries/podcasts';
import { FormBuilder } from '@/components/organs/form-builder';
import { Button } from '@/components/ui/button';
import { convert12HourTo24Hour } from '@/lib/utils';
import { formatDate } from '@/components/organs/form-builder/form-date-input';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { MoveUpRight } from 'lucide-react';

type Props = {
  setOpen?: (state: boolean) => void;
};

export default function PodcastForm({ setOpen }: Props) {
  const schema = podcastFormSchema;

  const mutation = useCreatePodcast();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const time = values.time.split('-');
    const hour = convert12HourTo24Hour(Number(time[0]), time[1]);

    mutation.mutate(
      {
        title: values.title,
        date_time: `${formatDate(values.date)}T${hour}:00:00`,
        guest_name: values.guest_name,
        host_name: values.host_name,
      },
      {
        onError: (error) => {
          toast({
            title: 'Error creating podcast',
            description: error.message,
            variant: 'destructive',
          });
        },
        onSuccess: async () => {
          toast({
            title: 'Podcast scheduled!',
          });

          await queryClient.invalidateQueries({
            queryKey: ['podcasts'],
          });

          form.reset();

          if (setOpen) setOpen(false);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-10'
      >
        <div className='grid gap-4 sm:grid-cols-6'>
          <FormBuilder inputs={podcastFormInputs} form={form} />
        </div>

        <Button
          text='Schedule podcast'
          type='submit'
          loading={mutation.isPending}
          iconSuffix={<MoveUpRight size={16} />}
        />
      </form>
    </Form>
  );
}
