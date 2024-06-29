import { useState } from "react"

export default function UserWelcome() {

    const [nombre, setNombre] = useState(null);

    function handleCHange(nombre) {
        setNombre(nombre);
    }

    return (
        <>
        <h2>Mi primer componente!</h2>
        <input 
            onChange={e =>  handleCHange(e.target.value)}
        />
        <p>Bienvenido, { nombre }!</p>
        </>
    )
}