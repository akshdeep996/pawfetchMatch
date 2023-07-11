import React, { useState, FormEvent, ChangeEvent, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { UserNameContext } from '../../Context';
import login from '../API/AuthAPI/login';
import { useNavigate } from 'react-router-dom';



const Authentication: React.FC = () => {
  const [, setUserName] = useContext(UserNameContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await login(name, email);

      if (response.success) {
        setUserName(name);
        navigate('/home');
      }
    } catch (error) {
      // console.error('Error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = name === '' || email === '';

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className="mt-40 flex items-center justify-center">
      <div className="bg-color4 p-10 border-solid rounded-lg text-center shadow-lg">
        <h2 className="text-2xl font-bold text-color5 pb-5">
          Hey Hooman! <FontAwesomeIcon icon={faPaw} />
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-6 text-left">
            <label htmlFor="name" className="block font-semibold mb-1 text-color1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="w-full text-xl border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-color2 focus:text-color5 text-color2"
              autoComplete="off"
            />
          </div>
          <div className="mb-6 text-left">
            <label htmlFor="email" className="block font-semibold mb-1 text-color1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full text-xl border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-color2 focus:text-color5 text-color2"
              autoComplete="off"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-full bg-color3 text-color2 hover:bg-color2 hover:text-color4 py-2 px-4"
              disabled={isDisabled || loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
