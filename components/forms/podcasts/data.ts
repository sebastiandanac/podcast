import * as z from 'zod';
import { FormBuilderProps } from '@/components/organs/form-builder';

export const podcastFormSchema = z.object({
  title: z.string(),
  host_name: z.string(),
  guest_name: z.string(),
  date: z.date(),
  time: z.string(),
});

export const podcastFormInputs: FormBuilderProps['inputs'] = [
  {
    label: 'Title',
    name: 'title',
    type: 'input',
    className: 'sm:col-span-6',
  },
  {
    label: 'Host name',
    name: 'host_name',
    type: 'input',
    className: 'sm:col-span-6',
  },
  {
    label: 'Guest name',
    name: 'guest_name',
    type: 'input',
    className: 'sm:col-span-6',
  },
  {
    label: 'Date',
    name: 'date',
    type: 'date',
    className: 'sm:col-span-3',
  },
  {
    label: 'Time',
    name: 'time',
    placeholder: 'Choose a time',
    type: 'select',
    content: [
      { label: '8:00 AM', value: '8-AM' },
      { label: '9:00 AM', value: '9-AM' },
      { label: '10:00 AM', value: '10-AM' },
      { label: '11:00 AM', value: '11-AM' },
      { label: '12:00 PM', value: '12-PM' },
      { label: '1:00 PM', value: '1-PM' },
      { label: '2:00 PM', value: '2-PM' },
      { label: '3:00 PM', value: '3-PM' },
      { label: '4:00 PM', value: '4-PM' },
      { label: '5:00 PM', value: '5-PM' },
    ],
    className: 'sm:col-span-3',
  },
];
