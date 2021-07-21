import { FaUser } from 'react-icons/fa';
import AuthContext from 'context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import Link from 'next/link';
import styles from 'styles/AuthForm.module.css';
import Layout from 'components/Layout';
import { useForm, SubmitHandler } from 'react-hook-form';

type IFormInput = {
  email: string;
  password: string;
};
const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const { login, error } = useContext(AuthContext);
  //this logging the errors from server
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const validationOpt = {
    email: {
      required: 'Email is required',
    },
    password: {
      required: true,
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
      maxLength: {
        value: 30,
        message: 'Password must not more than 30 characters',
      },
    },
  };
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    login(data);
  };
  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser />
          Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" {...register('email', validationOpt.email)} />
            {errors.email && errors.email.message}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register('password', validationOpt.password)}
            />
            {errors.password && errors.password.message}
          </div>
          <input type="submit" value="Login" className="btn" />
        </form>
        <p>
          Don &apos;t have an account?{' '}
          <Link href="/account/Register">Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
