import { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import './NavBar.css'
import {UserContext} from './UserContext'

export const Navbar = () => {

    const[showMenu,setShowMenu] = useState(false);
    const {userInfo,setUserInfo} = useContext(UserContext);

    const handleButtonToggle = () => {
        setShowMenu((prev) => !prev); 
    }

    useEffect(()=>{
        fetch('http://localhost:3000/profile',{
            credentials: 'include'
        }).then(response =>{
            response.json().then(userInfo =>{
                setUserInfo(userInfo)
            })
        })
    },[])

    function logout(){
        fetch('http://localhost:3000/logout',{
            credentials:'include',
            method: 'POST',
        })
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return<header className="fixed">
        <div className="container">
            <div className="gird navbar-grid">
                <div>
                    <Link to="/"><img className="logo" src="http://localhost:5173/images/logo.png" alt="" /></Link>
                </div>
                <nav className={showMenu?"menu-mobile":"menu-web"}>
                    {username && (
                        <>
                            <ul>
                                <li><Link to="/create" className="navlink">Write Now</Link></li>
                                <li><Link to="/about" className="navlink">About</Link></li>
                                <li><a className="logout" onClick={logout}>LogOut</a></li>
                            </ul>
                        </>
                    )}
                    
                    {!username &&(
                        <>
                            <ul>
                                <li><Link to="/login" className="navlink">Login</Link></li>
                                <li><Link to="/register" className="navlink">Register</Link></li>
                                <li><Link to="/about" className="navlink">About</Link></li>
                            </ul>
                        </>

                    )}
                        
                </nav>
                <div className="ham-menu">
                    <button onClick={handleButtonToggle}><GiHamburgerMenu/></button>
                </div>
            </div>
        </div>

    </header>
    
}