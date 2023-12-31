import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    let location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }


    useEffect(() => {
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark" >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex" >
                        <Link type="button" to="/login" className="btn btn-success mx-1">Login</Link>
                        <Link type="button" to="/signup" className="btn btn-primary mx-1">Signup</Link>
                    </form> :
                        <div className="p-2">
                            <Link to="/profile"><i className="fa-regular fa-user mx-3" style={{ color: "white" }}></i></Link>
                            <button onClick={handleLogout} type="button" className="btn btn-primary mx-1">Logout</button>
                        </div>}
                </div>
            </div>
        </nav >
    )
}


export default Navbar