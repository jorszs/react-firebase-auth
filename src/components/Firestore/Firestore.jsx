import React, {useState, useEffect} from 'react';
import {fstore} from "../../firebaseconfig"


function Firestore() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")

    const setUsuarios = async (e) => {
        e.preventDefault()
        if(!name.trim()){
            setError("El nombre es obligatorio")
        } else if(!phone.trim()){
            setError("El numero de telefono es obligatorio")
        }

        const userData = {
            nombre: name,
            telefono: phone
        }
        
        try {
            console.log(userData);
            if(userData){
                fstore.collection("agenda").add(userData)
                        .then((docRef) => {
                            console.log("doc written: ", docRef);
                        })
                        .catch(err => {console.log("error adding doc: ", err);})
            } 
        } catch(err) {
            console.log("error: ",err);
        }
        setName("")
        setPhone("")
       
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col align-content-center">
                    <h2 >Formulario de usuarios</h2>
                    <form className="form-group">
                        <input 
                            value={name}
                            onChange={e => {setName(e.target.value)}}
                            className="form-control"
                            placeholder="Nombre"
                            type="text"
                        />
                        <input 
                            value={phone}
                            onChange={e => {setPhone(e.target.value)}}
                            className="form-control mt-3"
                            placeholder="Número de telefono"
                            type="number"
                        />
                        <input 
                            type="submit" 
                            value="Registrar" 
                            className="btn btn-success btn-block mt-3"
                            onClick={setUsuarios}
                        />
                    </form>
                    {error ? (
                        <div>
                            <p>{error}</p>
                        </div>
                    ):(<span></span>)}
                </div>
                <div className="col">
                    <h2>Mi agenda</h2>
                </div>
            </div>
        </div>
    )
}

export default Firestore
