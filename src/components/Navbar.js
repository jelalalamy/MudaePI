import React from 'react'
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <section className="navbar">
        <Link to="/" className="navbarLogo">MudaePI</Link>
        <Link to="/characters" className="navbarItem">Characters</Link>
        <Link to="/compare" className="navbarItem">Compare</Link>
        <Link to="/snapshots" className="navbarItem">Snapshots</Link>
        <Link to="/api" className="navbarItem">API</Link>
        <Link to="/about" className="navbarItem">About</Link>
    </section>
  )
}

export default Navbar