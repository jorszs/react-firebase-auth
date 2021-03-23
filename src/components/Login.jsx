import React from 'react'

const Login = () => {
    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form className="form-group" >
                    <input 
                        className="form-control mt-2"
                        type="text" 
                        placeholder="Email"
                    />
                    <input
                        className="form-control mt-2"
                        type="text" 
                        placeholder="Contraseña"
                    />
                    <input 
                        className="btn btn-dark btn-block mt-4"
                        value="Registrar usuario"
                        type="submit"
                    />
                </form>
            </div>
            <div className="col"></div>
        </div>
    )
}

export default Login
