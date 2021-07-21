import 'styles/globals.css';
import { AuthProvide } from 'context/AuthContext';
const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvide>
      <Component {...pageProps} />
    </AuthProvide>
  );
};

export default MyApp;
