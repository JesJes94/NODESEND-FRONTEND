import { createContext, useState } from "react";
import clienteAxios from "@/config/axios";

const ArchivosContext = createContext();

const ArchivosProvider = ({children}) => {

    const [alerta, setAlerta] = useState('');
    const [cargando, setCargando] = useState(false);
    const [archivo, setArchivo] = useState({
        mensaje_archivo: null,
        nombre: '',
        nombre_original: '',
        descargas: 1,
        password: '',
        autor: null,
        url: ''
    })

    const handleSetAlerta = msg => {
        setAlerta(msg);
    }

    const handleSetPassword = password => {
        setArchivo({...archivo, password})
    } 

    const handleSetDescargas = descargas => {
        setArchivo({...archivo, descargas})
    }

    const subirArchivo = async (formData, nombreArchivo) => {

        setCargando(true);

        try {
            const {data} = await clienteAxios.post('/api/archivos/', formData);
            setArchivo({...archivo, 
                nombre: data.archivo, 
                nombre_original: nombreArchivo});
          } catch (error) {
            setArchivo({...archivo, 
                mensaje_archivo: error.response.data.msg})
          } finally {
            setCargando(false);
          }
    }

    const crearEnlace = async () => {

        const {nombre, nombre_original, descargas, password, autor} = archivo;

        const datos = {
            nombre,
            nombre_original,
            descargas,
            password,
            autor
        }

        try {
            const { data } = await clienteAxios.post('/api/enlaces', datos);
            setArchivo({...archivo, url: data.msg})
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ArchivosContext.Provider
            value={{
                alerta,
                handleSetAlerta,
                archivo,
                subirArchivo,
                cargando,
                crearEnlace,
                handleSetPassword,
                handleSetDescargas
            }}
        >
            {children}
        </ArchivosContext.Provider>
    )
}

export {
    ArchivosProvider
}

export default ArchivosContext