import { NextPage } from 'next';
import Link from 'next/link';
import Layout from 'components/Layout';
import { GetServerSideProps } from 'next';
import { API_URL } from 'config/index';
import EventItem from 'components/EventItem';
type evt = {
  id: string;
  name: string;
  slug: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
  image: { formats: { thumbnail: { url: string } } };
};
type Props = { events: evt[] };
const Home: NextPage<Props> = ({ events }) => {
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

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
