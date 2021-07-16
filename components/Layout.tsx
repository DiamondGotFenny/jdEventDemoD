import { NextPage } from 'next';
import Head from 'next/head';
import styles from 'styles/Layout.module.css';
import Header from 'components/Header';
import Footer from './Footer';
import { useRouter } from 'next/dist/client/router';
import Showcase from './Showcase';
type layoutProps = {
  title?: string;
  keywords?: string;
  description?: string;
  children: React.ReactNode;
};

const Layout: NextPage<layoutProps> = ({
  title,
  description,
  keywords,
  children,
}) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  keywords: 'music, dj, edm, events',
  description: 'Find the latest DJ and other musical events',
};
export default Layout;
