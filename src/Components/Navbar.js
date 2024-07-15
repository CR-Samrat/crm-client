import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("AuthToken");
        navigate("/");
    }

  return (
    <nav className="px-4 py-2 navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand">Contacts Dashboard</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to='/home'>{localStorage.getItem("AuthToken") &&
                                                localStorage.getItem("Authorities").indexOf("ROLE_ADMIN") !== -1 ?
                                                "Contacts" : ""}
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">{localStorage.getItem("AuthToken") ? "Dashboard" : ""}</Link>
            </li>
        </ul>
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="btn btn-success add-contact-btn" to="/create">Add Contact</Link>
                {
                    localStorage.getItem("AuthToken") ?
                    <button className="btn btn-danger add-contact-btn mx-3" onClick={()=>handleLogout()}>Logout</button> :
                    ""
                }
            </li>
        </ul>
    </div>
</nav>

  )
}

export default Navbar