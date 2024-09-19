import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import './NavBar.css'

export const Navbar = () => {

    const[showMenu,setShowMenu] = useState(false);
    const handleButtonToggle = () => {
        setShowMenu((prev) => !prev); 
    }

    return<header className="fixed">
        <div className="container">
            <div className="gird navbar-grid">
                <div className="logo">
                    <h1>HARDICK</h1>
                </div>
                <div className="newpost">
                    <Link to="/create" className="navlink">Write Now</Link>
                </div>
                <nav className={showMenu?"menu-mobile":"menu-web"}>
                    <ul>
                        <li><Link to="/" className="navlink">Home</Link></li>
                        <li><Link to="/about" className="navlink">About</Link></li>
                        <li><Link to="/contact" className="navlink">Contact</Link></li>
                    </ul>
                </nav>
                <div className="ham-menu">
                    <button onClick={handleButtonToggle}><GiHamburgerMenu/></button>
                </div>
            </div>
        </div>

    </header>
    
}