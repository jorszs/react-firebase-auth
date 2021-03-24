import React, {useState} from 'react'
import {auth} from "../firebaseconfig";
import {useHistory} from "react-router-dom";
const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msgerror, setMsgerror] = useState(null)

    const RegisterUser = (e) => {
        e.preventDefault()
            auth.createUserWithEmailAndPassword(email, password)
                .then(
                    history.push("/")
                )
                .catch(e => {
                    if(e.code == "auth/invalid-email"){
                        setMsgerror("Email no valido.")
                    }
                    if(e.code == "auth/weak-password"){
                        setMsgerror("La contraseña debe tener almenos 6 caracteres.")
                    }
                })
            }
        
    const LoginUser = () => {
        auth.signInWithEmailAndPassword(email, password)
                .then(response => {
                    history.push("/")
                })
                .catch(err => {
                    // auth/wrong-password
                    if(err.code == "auth/wrong-password"){
                        setMsgerror("Contraseña incorrecta.")
                    }
                })
    }

    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={ RegisterUser } className="form-group" >
                    <input 
                        onChange={e => setEmail(e.target.value)}
                        className="form-control mt-2"
                        type="email" 
                        placeholder="Email"
                        />
                    <input
                        onChange={e => setPassword(e.target.value)}
                        className="form-control mt-2"
                        type="password" 
                        placeholder="Contraseña"
                    />
                    <input 
                        className="btn btn-dark btn-block mt-4"
                        value="Registrar usuario"
                        type="submit"
                    />
                </form>
                <button 
                onClick={LoginUser}
                className="btn btn-success btn-block" >Iniciar sesion</button>
                {
                    msgerror != null ? (
                        <div >
                            {msgerror}
                        </div>
                    ) : (
                        <span></span>
                    )
                }
            </div>
            <div className="col"></div>
        </div>
    )
}

export default Login
