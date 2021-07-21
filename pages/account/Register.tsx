import { FaUser } from 'react-icons/fa';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from 'context/AuthContext';
import { useContext, useRef } from 'react';
import Link from 'next/link';
import styles from 'styles/AuthForm.module.css';
import Layout from 'components/Layout';
import { useForm, SubmitHandler } from 'react-hook-form';

type IFormInput = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInput>();
  const { register: registerReq, error } = useContext(AuthContext);
  useEffect(() => {
    error && toast.error(error);
  });
  //use for a ref to the password confirm form element
  const password = useRef({});
  password.current = watch('password', '');

  const validationOpt = {
    username: {
      required: 'usename is required',
      minLength: {
        value: 5,
        message: 'username must have at least 5 characters',
      },
      maxLength: {
        value: 10,
        message: 'username must not more than 10 characters',
      },
    },
    email: {
      required: 'Email is required',
    },
    password: {
      required: 'please enter valid password',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
      maxLength: {
        value: 30,
        message: 'Password must not more than 30 characters',
      },
    },
    confirmPassword: {
      validate: (value) =>
        value === password.current || 'The passwords do not match',
    },
  };
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    registerReq(data);
  };
  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser />
          Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              {...register('username', validationOpt.username)}
            />
            {errors.username && errors.username.message}
          </div>
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
          <div>
            <label htmlFor="confirmPassword">Repeat Password</label>
            <input
              type="password"
              {...register('confirmPassword', validationOpt.confirmPassword)}
            />
            {errors.confirmPassword && errors.confirmPassword.message}
          </div>
          <input type="submit" value="Login" className="btn" />
        </form>
        <p>
          Already have an account? <Link href="/account/Login">Login</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
