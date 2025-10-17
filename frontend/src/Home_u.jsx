
import React, { useState } from 'react'
import jsPDF from 'jspdf'
import axios from 'axios'

const Home = ({ setToken, userInfo }) => {
  const [profile, setProfile] = useState({
    name: (userInfo && userInfo.name) ? userInfo.name : 'Student Name',
    email: (userInfo && userInfo.email) ? userInfo.email : 'student@email.com',
    address: '',
    skills: '',
    contact: '',
    dob: '',
    gpa: '',
    university: '',
    experience: '',
    about: '',
  });

  const [editMode, setEditMode] = useState(false);

  // Progress bar calculation
  const profileFields = [
    profile.name,
    profile.email,
    profile.address,
    profile.skills,
    profile.contact,
    profile.dob,
    profile.gpa,
    profile.university,
    profile.experience,
    profile.about
  ];
  const totalFields = profileFields.length;
  const filledFields = profileFields.filter(val => val && val.trim() !== '').length;
  const progressPercent = Math.round((filledFields / totalFields) * 100);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5001/api/user/update', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditMode(false);
    } catch (err) {
      alert('Error updating profile.');
    }
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(16);
    doc.text('Student Profile', 10, y);
    y += 10;
    Object.entries(profile).forEach(([key, value]) => {
      doc.setFontSize(12);
      doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value || 'Not set'}`, 10, y);
      y += 8;
    });
    doc.save('student_profile.pdf');
  };

  const handleDeleteProfile = async () => {
  try {
    const token = localStorage.getItem('token'); 
    await axios.delete('http://localhost:5001/api/user/delete', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setToken("");
    alert('Profile deleted successfully.');
  } catch (err) {
    alert('Error deleting profile.');
  }
};

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-4xl font-extrabold mb-8 text-center'>Profile</h2>
        <div className='mb-6'>
          <div className='flex justify-between items-center mb-1'>
            <span className='text-base font-medium text-blue-700'>Form Completion</span>
            <span className='text-sm font-semibold text-blue-700'>{progressPercent}%</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-4'>
            <div
              className='bg-blue-600 h-4 rounded-full transition-all duration-300'
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        <form className='space-y-6' onSubmit={handleUpdate}>
          <label htmlFor='name' className='block text-xl font-semibold mb-1'>Name</label>
          <input autoComplete='name' id='name' name='name' type='text' value={profile.name} onChange={handleChange} placeholder='Name' className='w-full px-4 py-3 border rounded-md text-lg' required />
          
          <label htmlFor='email' className='block text-xl font-semibold mb-1'>Email</label>
          <input autoComplete='email' id='email' name='email' type='email' value={profile.email} onChange={handleChange} placeholder='Email' className='w-full px-4 py-3 border rounded-md text-lg' required />
          
          <label htmlFor='address' className='block text-xl font-semibold mb-1'>Address</label>
          <input autoComplete='street-address' id='address' name='address' type='text' value={profile.address} onChange={handleChange} placeholder='Address (optional)' className='w-full px-4 py-3 border rounded-md text-lg' />
          
          <label htmlFor='skills' className='block text-xl font-semibold mb-1'>Skills</label>
          <input autoComplete='off' id='skills' name='skills' type='text' value={profile.skills} onChange={handleChange} placeholder='Skills (optional)' className='w-full px-4 py-3 border rounded-md text-lg' />
          
          <label htmlFor='contact' className='block text-xl font-semibold mb-1'>Contact Number</label>
          <input autoComplete='tel' id='contact' name='contact' type='text' value={profile.contact} onChange={handleChange} placeholder='Contact Number (optional)' className='w-full px-4 py-3 border rounded-md text-lg' />
          
          <label htmlFor='dob' className='block text-xl font-semibold mb-1'>Date of Birth</label>
          <input autoComplete='bday' id='dob' name='dob' type='date' value={profile.dob} onChange={handleChange} placeholder='Date of Birth (optional)' className='w-full px-4 py-3 border rounded-md text-lg' />
          
          <label htmlFor='gpa' className='block text-xl font-semibold mb-1'>GPA</label>
          <input autoComplete='off' id='gpa' name='gpa' type='text' value={profile.gpa} onChange={handleChange} placeholder='GPA (optional)' className='w-full px-4 py-3 border rounded-md text-lg' />
          
          <label htmlFor='university' className='block text-xl font-semibold mb-1'>University</label>
          <input autoComplete='organization' id='university' name='university' type='text' value={profile.university} onChange={handleChange} placeholder='University (optional)' className='w-full px-4 py-3 border rounded-md text-lg' />
          
          <label htmlFor='experience' className='block text-xl font-semibold mb-1'>Experience</label>
          <input autoComplete='off' id='experience' name='experience' type='text' value={profile.experience} onChange={handleChange} placeholder='Experience (optional)' className='w-full px-4 py-3 border rounded-md text-lg' />
          
          <label htmlFor='about' className='block text-xl font-semibold mb-1'>About Me</label>
          <textarea autoComplete='off' id='about' name='about' value={profile.about} onChange={handleChange} placeholder='About Me (optional)' className='w-full px-4 py-3 border rounded-md text-lg' rows={3} />
          <div className='flex gap-2 mt-4 justify-center'>
            <button type='submit' className='bg-green-600 text-white px-3 py-1 rounded text-base'>Save</button>
            <button type='button' onClick={handleDownloadPDF} className='bg-green-600 text-white px-3 py-1 rounded text-base'>Download PDF</button>
            <button type='button' onClick={handleDeleteProfile} className='bg-red-600 text-white px-3 py-1 rounded text-base'>Delete</button>
            <button type='button' onClick={() => setToken("")} className='bg-gray-600 text-white px-3 py-1 rounded text-base'>Logout</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
