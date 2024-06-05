import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    })
    
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data)
            if(response.data.name){
                localStorage.setItem('user', JSON.stringify(response))
                navigate('/')
            }
            else{
                alert('please enter correct details')
            }
        } catch (error) {
            console.error("There was an error with the axios operation:", error);
        }
    };

    return (
        <div className="login">
            <h1>Login Page</h1>
            <input
                className="inputBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Enter Email"
            />
            <input
                className="inputBox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password"
            />
            <button onClick={handleLogin} className="appButton">Login</button>
        </div>
    );
};

export default Login;
