import React, { useState } from 'react';
import axios from 'axios';
import { Link, json, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('')


    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            if (username === 'admin' && password === 'admin') navigate('/admin')

            const response = await axios.post('http://localhost:3000/api/instructor/signin', { username, password });
            localStorage.setItem('user', JSON.stringify(response.data.instructor))
            navigate('/home')
            console.log(response.data.instructor);
        } catch (error) {
            toast.error('Invalid Credentials!');
            console.error('Login error:', error.response.data);
            setErr(error.response.data)
        }
    };

    return (
        <div className='container'>
           <ToastContainer />
            <div className='card '>

                <h2 className='bg-white'>Login</h2>
                <div className='card form'>
                    <label className='bg-white'>
                        Username:
                    </label>
                    <input className='input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <label className='bg-white'>
                        Password:
                    </label>
                    <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <div className='gap bg-white'>
                    <button className='btn' onClick={handleLogin}>Login</button>
                    <button className='btn'  onClick={()=>navigate('/register')}>SignUp</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
