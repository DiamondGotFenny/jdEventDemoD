import { NextPage } from 'next';
import Layout from 'components/Layout';
import Link from 'next/link';
import { API_URL } from 'config/index';
import EventItem from 'components/EventItem';
import qs from 'qs';
import { useRouter } from 'next/router';
import useSWR from 'swr';
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
const SearchResult: NextPage<Props> = () => {
  const router = useRouter();
  //the query key can only be named as term
  const { term } = router.query;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  const { data: events, error } = useSWR(`${API_URL}/events?${query}`, fetcher);
  if (error) return <div>There is an error happens, please try again!</div>;
  if (!events) return <div>loading........</div>;
  return (
    <Layout title="Search Results">
      <h1>Search Result for {term}</h1>
      {events.length === 0 && <h3>No events to Show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Link href="/events">Go Back</Link>
    </Layout>
  );
};

export default SearchResult;
