import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {

    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    const formRef = useRef(null)

    const [course, setCourse] = useState('')
    const [level, setLevel] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [instructor, setInstructor] = useState('')
    const [batch, setBatch] = useState('')
    const [date, setDate] = useState('')

    const getUsers = async () => {
        try {
            const usr = await axios.get('http://localhost:3000/api/istructor/all')
            setUsers(usr.data.instructors)
        } catch (error) {
            console.log(error)
        }
    }


    const handleAdd = async()=>{
        
        try {
           const res = await axios.post('http://localhost:3000/api/admin/add-course',{
            name: course,
            level: level,
            description: description,
            image: image,
            batch: batch,
            instructorId:instructor,
            date:date
           })

           console.log(res)
           toast.success("Record Added")
           formRef.current.reset()
        } catch (error) {
            // toast.error(`Lecture is already sheduled on ${date}`)
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className='container'>
            <ToastContainer/>
            <h1>Admin dashboard</h1>
            {/* name, level, description, image, instructorId, batch, date */}
            <div className='card'>
                <div className='form bg-white' ref={formRef}>
                    <label htmlFor="name" className='bg-white'>Course name:</label>
                    <input type="text" name='name' value={course} onChange={(e)=> setCourse(e.target.value)} className='input' autoFocus />
                    <label htmlFor="name" className='bg-white'>Level:</label>
                    <select type="text" value={level} name='name' onChange={(e)=> setLevel(e.target.value)} className='input'>
                        <option value="">-- select --</option>
                        <option value='Biginner'>Beginner</option>
                        <option value='Intermediate'>Intermediate</option>
                        <option value='Advance'>Advance</option>
                    </select>
                    <label htmlFor="name" className='bg-white'>Description:</label>
                    <textarea type="text" value={description} onChange={(e)=> setDescription(e.target.value)} name='name' className='input' />
                    <label htmlFor="name" className='bg-white'>Image url:</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} name='name' className='input' />
                    <label htmlFor="batch" className='bg-white'>Batch:</label>
                    <select type="text" value={batch} onChange={(e)=>setBatch(e.target.value)} name='name' className='input'>
                        <option value="">-- select --</option>
                        <option value="Batch A"> Batch A</option>
                        <option value="Batch B"> Batch B</option>
                        <option value="Batch C"> Batch C</option>
                        <option value="Batch D"> Batch D</option>
                    </select>
                    <label htmlFor="username" className='bg-white'>User name:</label>
                    <select type="text" value={instructor} onChange={(e)=>setInstructor(e.target.value)} name='username' className='input' >
                        <option value="">-- select --</option>
                        {users && users.map(user => (
                            <option key={user._id} value={user._id}>{user.name}</option>
                        ))}
                    </select>
                    <label htmlFor="name" className='bg-white'>Date:</label>
                    <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} name='name' className='input' />

                    <button className='btn' onClick={handleAdd}>Add</button>
                </div>
            </div>
                            <button onClick={()=>navigate('/')} className='logoutBtn'>Logout</button>
        </div>
    )
}

export default Admin