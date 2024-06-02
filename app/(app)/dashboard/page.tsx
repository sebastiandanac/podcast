import Page from '@/components/page';
import Podcasts from '@/app/(app)/dashboard/podcasts';
import PodcastFormDialog from '@/components/dialog-forms/podcast';

type Props = {};

export default async function DashboardPage({}: Props) {
  return (
    <Page
      title='Podcasts'
      className='max-w-4xl'
      topRight={<PodcastFormDialog />}
    >
      <Podcasts />
    </Page>
  );
}
