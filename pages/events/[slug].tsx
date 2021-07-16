import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Layout from 'components/Layout';
import { GetServerSideProps } from 'next';
import { API_URL } from 'config/index';

import Link from 'next/link';
import Image from 'next/image';
import styles from 'styles/Event.module.css';
type props = {
  evt: {
    id: string;
    name: string;
    slug: string;
    venue: string;
    address: string;
    performers: string;
    date: string;
    time: string;
    description: string;
    image: { formats: { medium: { url: string } } };
  };
};
const EventPage: NextPage<props> = ({ evt }) => {
  const router = useRouter();
  const date: string = new Date(evt.date).toLocaleDateString('en-Us');
  return (
    <Layout title={evt.name}>
      <div className={styles.event}>
        <span>
          {date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              alt={`DJ Event ${evt.name}`}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <Link href="/events">
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

export const getServerSideProps: GetServerSideProps = async ({
  query: { slug },
}) => {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();
  return {
    props: { evt: events[0] },
  };
};
