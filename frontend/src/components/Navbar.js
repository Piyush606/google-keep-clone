import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let history = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    history("/")
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
    <div className="container-fluid">
        <div className="d-flex align-items-center">
            <img className="w-25" src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png" alt=""/>
            <Link className="navbar-brand" to="/">
                Notable
            </Link>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {localStorage.getItem('token') ? <form className="d-flex ms-auto" role="search">
            <input className="form-control me-2 w-100" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-sm btn-outline-warning" type="submit">Search</button>
        </form> : <></> }
        {!localStorage.getItem('token') ? <div className='ms-auto'><Link className="btn btn-sm btn-warning ms-2" to="/login">Login</Link><Link className="btn btn-sm btn-warning ms-2" to="/signup">Sign Up</Link></div> : <button className="btn btn-warning ms-2" onClick={handleLogout}>Logout</button>} 
        </div>
    </div>
    </nav>
  )
}

export default Navbar