import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ "email": "", "password": "" })
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        //API CALL
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        if (json.success === true) {
            //redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in successfully!", "success");
            navigate("/");
        } else { props.showAlert("Invalid Credentials", "danger") }
    }
    return (
        <div className='container'>
            <form className='myForm' onSubmit={onSubmit}>
                <h3 className='text-center' style={{ paddingBottom: "20px" }}>Login</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login