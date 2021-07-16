import { NextPage } from 'next';
import Layout from 'components/Layout';
import { GetServerSideProps } from 'next';
import { API_URL, ITEMS_PER_PAGE } from 'config/index';
import EventItem from 'components/EventItem';
import Pagination from 'components/Pagination';
import { useState } from 'react';

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
type Props = { events: evt[]; page: number; total: number };
const EventsPage: NextPage<Props> = ({ events, page, total }) => {
  const [currentPage, setCurrentPage] = useState(page);

  return (
    <Layout>
      <h1>Events List</h1>
      {events.length === 0 && <h3>No events to Show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalCount={total}
        pageSize={ITEMS_PER_PAGE}
        siblingCount={1}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Layout>
  );
};

export default EventsPage;

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 1 },
}) => {
  //Calculate start page
  const startIndex = +page === 1 ? 0 : (+page - 1) * ITEMS_PER_PAGE;
  //fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();
  //fetch events
  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${ITEMS_PER_PAGE}&_start=${startIndex}`
  );
  const events: [] = await res.json();
  return {
    props: { events, page: +page, total },
  };
};
