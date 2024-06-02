import PodcastForm from '@/components/forms/podcasts/form';
import Page from '@/components/page';

type Props = {};
export default function SchedulePodcastPage({}: Props) {
  return (
    <Page title='Schedule podcast' className='max-w-xl'>
      <PodcastForm />
    </Page>
  );
}
