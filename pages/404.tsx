import Layout from 'components/Layout';
import { NextPage } from 'next';
import { FaExclamationTriangle } from 'react-icons/fa';
import styles from 'styles/404.module.css';
import Link from 'next/link';
const NotFoundPage: NextPage = () => {
  return (
    <Layout>
      <div className={styles.error}>
        <h1 className={styles.errorMsg}>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>Sorry,there is nothing here</h4>
        <Link href="/">Go Back Home</Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
