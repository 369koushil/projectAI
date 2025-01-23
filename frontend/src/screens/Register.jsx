import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API_URL}/users/register`, {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        navigate('/');
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="min-h-screen font-mono flex items-center justify-center bg-gradient-to-br from-inner via-primary to-darkblue px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
          Create an Account
        </h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2" htmlFor="username">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              className="w-full p-3 font-mono rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full p-3 font-mono rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
        <p className="text-gray-400 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
