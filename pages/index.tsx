import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { GetServerSideProps } from 'next';
import { NEXT_URL } from '@/config/index';
import EventItem from '@/components/EventItem';
type props = { events: [] };
const Home: NextPage<props> = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to Show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
};
export default Home;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${NEXT_URL}/api/events`);
  const events: [] = await res.json();
  return {
    props: { events: events.slice(0, 3) },
  };
};
