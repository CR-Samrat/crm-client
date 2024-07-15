// src/AddContactForm.js

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../API/AxiosInstance';

const CreateContact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roles:'ROLE_USER'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    
    try {
      await axiosInstance.post("/crm/create",formData,{
        headers: {'Content-Type' : 'application/json'}
      }).then(response => {
        let status = response.status;
        if (status === 201) {
          navigate("/");
        }
      })
    } catch (error) {
      alert(error.response.data)
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Contact</button>
      </form>
    </div>
  );
};

export default CreateContact;
