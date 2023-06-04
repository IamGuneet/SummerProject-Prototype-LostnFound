// import React from 'react'
import "./navbar.css"
import logoImg from "../../assets/navBarLogo.jpg"

const Navbar = () => {
  return (
    <div className='navbar navbar-expand-lg navbar-light bg-light sticky-top'>
            <a className="navbar-brand p-2" href="/">
            <img src={logoImg} className="logo-img" alt='logo' />
            </a>
            <ul className="navbar-nav p-2">
        <div className="routes">
          <li className="nav-item">
            <a href='/' className="nav-link ">Home</a>
          </li>
          <li className="nav-item">
            <a href='/items' className="nav-link">Items</a>
          </li>
          <li className="nav-item">
            <a href='/login' className="nav-link">Login</a> 
          </li>
          <li className="nav-item">
            <a  rel="noreferrer" target="_blank" href='https://www.instagram.com/gitam.lostandfound/' className="nav-link"><i className="fab fa-instagram fa-2x"></i>    </a> 
          </li>
        
        </div>
            </ul>
    </div>
  )
}

export default Navbar
