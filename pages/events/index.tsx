import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { GetServerSideProps } from 'next';
import { NEXT_URL } from '@/config/index';
import EventItem from '@/components/EventItem';

type props = { events: [] };
const EventsPage: NextPage<props> = ({ events }) => {
  return (
    <Layout>
      <h1>Events List</h1>
      {events.length === 0 && <h3>No events to Show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
};

export default EventsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${NEXT_URL}/api/events`);
  const events: [] = await res.json();
  return {
    props: { events },
  };
};
