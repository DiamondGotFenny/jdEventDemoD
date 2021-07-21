import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Next_URL } from 'config/index';

const AuthContext = createContext(null);

export const AuthProvide = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => isLoggedIn(), []);

  // Register user
  const register = async (user) => {
    const res = await fetch(`${Next_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(user);
      router.push('/');
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Login user
  const login = async (user) => {
    const { email: identifier, password } = user;
    const res = await fetch(`${Next_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${Next_URL}/api/logout`, {
      method: 'POST',
    });
    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  //check if user is logged in
  const isLoggedIn = async () => {
    const res = await fetch(`${Next_URL}/api/user`);
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
