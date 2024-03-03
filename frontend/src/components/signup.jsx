import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  console.log(name, username, password)

  const handleSignup = async () => {
    try {
      await axios.post('https://zany-teal-pelican-wear.cyclic.app/api/instructor/signup', { name, username, password });
    //   console.log('Signup successful');
      navigate('/')
    } catch (error) {
        toast.error('Somthing went wrong')
      console.error('Signup error:', error.response.data);
    }
  };

  return (
    <div className='container'>
        <ToastContainer />
        <div className='card'>
      <h2 className='bg-white'>Sign Up</h2>
      <div className='form card'>
      <label className='bg-white'>
        Name:
      </label>
        <input type="text"  className='input' value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label className='bg-white'>
        Username:
      </label>
        <input type="text" className='input' value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label className='bg-white'>
        Password:
      </label>
        <input type="password" className='input' value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <div className='gap'>
      <button className='btn' onClick={handleSignup}>Sign Up</button>
      <button className='btn' onClick={()=>navigate('/')}>Sign In</button>

      </div>
    </div>
    </div>
    </div>
  );
};

export default Signup;
