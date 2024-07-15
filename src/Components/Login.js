import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        await axios.post('http://localhost:8080/crm/login', {
            username: username,
            password: password
        }, { withCredentials: true })
        .then(response => {
            console.log(response);
            
            if(response.status === 200 && response.data !== "") {
                localStorage.setItem("AuthToken", response.data.token);
                localStorage.setItem("Authorities", response.data.roles);
            }
            navigate('/dashboard');
        })
        .catch(error => {
            // Handle login error
            console.error('Login error', error);
            alert("Invalid credentials");
        });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleSubmit} className="bg-light mb-5 p-4 rounded shadow">
                <h2 className="text-center mb-4">Login</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                <div className="mt-3 text-center">
                    <a href="#" className="text-decoration-none">Forgot Password?</a>
                </div>
            </form>
        </div>
    );
    
};

export default Login;
