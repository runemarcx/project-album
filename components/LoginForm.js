import React, { useState } from 'react';
import Link from 'next/link';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { useRouter } from 'next/router';
import '../src/app/globals.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Fields must not be empty');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged In:', { email, password });
      // Redirect to the page after successful login
      router.push('/home');
    } catch (error) {
      console.log('Login failed:', error);
      if (error.code === AuthErrorCodes.USER_NOT_FOUND) {
        setError('Email not registered yet');
      } else if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
        setError('Incorrect password');
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className="container-login">
      <div className="card-login">
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="input-container-login">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-container-login">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-login">{error}</p>}

          <button type="submit" className="button-login">Login</button>
        </form>

        <p className="link-login">
          Don't have an account?{' '}
          <Link href="/register">
            <span>Register here</span>
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
