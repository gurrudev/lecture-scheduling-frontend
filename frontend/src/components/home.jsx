import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    const user = localStorage.getItem('user');
    const navigate = useNavigate();

    const obj = JSON.parse(user);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const userSchedule = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/instructor/schedule/${obj._id}`);
            setData(response.data.scheduledDetails); // assuming the array is nested under 'scheduledDetails'
            // console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    useEffect(() => {
        userSchedule();
    }, []);

    return (
        <>
      <h1>Welcome {obj.name}</h1>
      <button className='logoutBtn' onClick={handleLogout}>Logout</button>
      <div className='container'>
        <div className='gap'>
          {data && data.map((lecture) => (
            <div className='card-container' key={lecture._id}>
              <div className='card'>
                <img src={lecture.image} alt="" />
                <p><strong>Course:</strong> {lecture.name}</p>
                <p><strong>Level:</strong> {lecture.level}</p>
                <p><strong>Description:</strong> {lecture.description}</p>
                <p><strong>Batch:</strong> {lecture.batch}</p>
                <p><strong>Date:</strong> {lecture.lectures.map(data => formatDate(data.date))}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
    );
};

export default Home;
