import React, { useState } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { usersCollection, addDoc } from '../utils/firebase';
import { useRouter } from 'next/router';
import '../src/app/globals.css';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !name || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = { email, name, uid: user.uid };

      const docRef = await addDoc(usersCollection, userData);
      console.log('Form submitted:', user, docRef, { email, name, password, confirmPassword });

      // Redirect to the login page after successful registration
      router.push('/login');
    } catch (error) {
      console.log('Registration failed:', error);
      if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
        setError('Email is already registered');
      } else {
        setError('Registration failed');
      }
    }
  };

  return (
    <div className="container-register">
      <div className="card-register">
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        {error && <p className="error-register">{error}</p>}

        <form className="form-register" onSubmit={handleSubmit}>
          <div className="input-container-register">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-container-register">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-container-register">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-container-register">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {password !== confirmPassword && <p className="password-match">Passwords do not match</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="button-register"
            >
              Register
            </button>
          </div>
        </form>

        <p className="link-register">
          Already have an account?{' '}
          <Link legacyBehavior href="/login">
            <a>Login here</a>
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
