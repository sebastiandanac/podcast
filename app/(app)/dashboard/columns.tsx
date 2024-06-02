'use client';

import { ColumnDef } from '@tanstack/react-table';
import { PodcastsType } from '@/types/podcasts';
import Status from '@/app/(app)/dashboard/status';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';

export const columns: ColumnDef<PodcastsType>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'guest_name',
    header: 'Guest name',
  },
  {
    accessorKey: 'host_name',
    header: 'Host name',
  },
  {
    accessorKey: 'date_time',
    header: 'Date & time',
    cell: ({ row }) => format(row.original.date_time, 'Pp'),
  },
  {
    accessorKey: 'status_id.name',
    header: 'Status',
    cell: ({ row }) => <Status podcast={row.original} />,
  },
];
