import React, {useState, useEffect} from 'react';
import {fstore} from "../../firebaseconfig"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()

function Firestore() {
    const [idUser, setIdUser] = useState("")
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")
    const [users, setUsers] = useState([])
    const [updateUsers, setUpdateUsers] = useState(false)
    const [editMode, setEditMode] = useState(false)

    useEffect(()  => {
        fstore.collection("agenda").get()
                .then(({docs}) => {
                    const usersList = docs.map(item => ({id: item.id, ...item.data()}))
                    setUsers(usersList)
                    setUpdateUsers(false)
                })
    }, [fstore, updateUsers])
 
    //notification
    const notify = (message) => {
        toast(message)
    }

    const addUser = async (e) => {
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
            if(userData){
                fstore.collection("agenda").add(userData)
                        .then((docRef) => {
                            setUpdateUsers(true)
                            notify("Usuario creado.")
                        })
                        .catch(err => {
                            notify("Error al registrar usuario.")
                        })
            } 
        } catch(err) {
            console.log("error: ",err);
        }
        setName("")
        setPhone("")
       
    }

    const deleteUser = (userId) => {
        fstore.collection('agenda').doc(userId).delete()
                .then(userDelete => {
                    notify("Usuario eliminado.")
                    setUpdateUsers(true)
                })
                .catch(err => {
                    notify("Error al eliminar el usuario.")
                })
    }

    const updateUser = async (userId) => {
        try{
            
            const userData = await fstore.collection("agenda").doc(userId).get()
            const {nombre, telefono} = userData.data()
            setName(nombre)
            setPhone(telefono)
            setEditMode(true)
            setIdUser(userId)
        } catch(err){
            console.log(err);
        }
    }

    const editUser = async (e) => {
        e.preventDefault()
        if(!name.trim()){
            setError("El nombre es obligatorio")
        } else if(!phone.trim()){
            setError("El numero de telefono es obligatorio")
        }

        const userUpdate = {
            nombre: name,
            telefono: phone
        }

        try{
            await fstore.collection("agenda").doc(idUser).set(userUpdate)
            notify("Usuario actualizado.")
            setUpdateUsers(true)
            setName("")
            setPhone("")
            setEditMode(false)
        } catch(err){
            console.log(err);
            notify("Error al actualizar usuario.")
        }
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col align-content-center">
                    <h2 >Formulario de usuarios</h2>
                    <form onSubmit={editMode ? editUser : addUser} className="form-group">
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
                        {
                            editMode ? (
                                <input 
                                    type="submit" 
                                    value="Editar" 
                                    className="btn btn-success btn-block mt-3"
                                />
                            ):(
                                <input 
                                    type="submit" 
                                    value="Registrar" 
                                    className="btn btn-success btn-block mt-3"
                                />
                            )
                        }
                    </form>
                    {error ? (
                        <div>
                            <p>{error}</p>
                        </div>
                    ):(<span></span>)}
                </div>
                <div className="col">
                    <h2>Mi agenda</h2>
                    <ul className="list-group">
                    {
                        users.length !== 0 ? (
                            users.map(user => (
                                user.nombre? 
                                    (
                                        <li key={user.id} className="list-group-item">
                                            {user.nombre} . . . . . . . {user.telefono}
                                            <button onClick={() => deleteUser(user.id)} className="btn btn-danger float-right" >Eliminar</button>
                                            <button onClick={() => updateUser(user.id)} className="btn btn-info float-right mr-3">Editar</button>
                                        </li>
                                    )
                                : <span key={user.id}></span>
                            ))
                            ):(
                                <span >No hay contactos...</span>
                                )
                            }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Firestore
