import Link from 'next/link';
import stlyes from '@/styles/Footer.module.css';
const Footer = () => {
  return (
    <div>
      <footer className={stlyes.footer}>
        <p>Copyright &copy; DJ Events 2021</p>
        <p>
          <Link href="/about">About This Project</Link>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
