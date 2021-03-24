import React, {useState ,useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {auth} from "../firebaseconfig";

const Menu = () => {
    const history = useHistory();
    const [user, setUser] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                setUser(user)
            }
        })
    }, [])

    const logout = () => {
        auth.signOut()
        setUser(null)
        history.push("/")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Inicio</Link>
                    </li>
                    <li className="nav-item">
                        {!user ? (
                            <Link className="nav-link" to="/login">Login-firebase</Link>
                        ):(<span></span>)}
                    </li>
                    <li className="nav-item">
                            <Link className="nav-link" to="/firestore" >Login-firestore</Link>
                    </li>
                    <li className="nav-item">
                    {user ? (
                            <Link className="nav-link" to="/admin">Admin</Link>
                        ):(<span></span>)}
                    </li>
                </ul>
                {user ? (
                    <button 
                        onClick={logout}
                        className="btn btn-danger"
                    >
                    Cerrar sesion
                    </button>
                ) : (
                    <span></span>
                )}
            </nav>
        </div>
    )
}

export default Menu
