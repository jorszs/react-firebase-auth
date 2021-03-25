import React from 'react'

const Inicio = () => {
    return (
        <div style={{textAlign: "center", color: "1F2E43"}}>
            <h1 style={{textAlign: "center", color: "1F2E43", marginTop:"30px", marginBottom:"15px", fontWeight:"bold"}} >Laboratorio de React y firebase/firestore</h1>
            <p>La sección de login usa el servicio de registro y autenticacion de usuario de firebase,</p> 
            
            <p>y la sección de agenda utiliza el servicio de base de datos no relacional "firestore".</p>
        </div>
    )
}

export default Inicio
