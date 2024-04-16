import { createContext, useState} from "react";
import { useRouter } from "next/router";
import clienteAxios from "@/config/axios";
import tokenAuth from "@/config/tokenAuth";

const authContext = createContext();

const AuthProvider = ({children}) => {

    const router = useRouter();

    const [auth, setAuth] = useState({
        token: typeof window !== 'undefined' ? localStorage.getItem('nodesend-token') ?? '' : '',
        autenticado: null,
        usuario: null,
        mensaje: null
    })

    const registrarUsuario = async datos => {
        try {
            const {data} = await clienteAxios.post('/api/usuarios/', datos);
            setAuth({...auth, mensaje: data.msg})

            setTimeout(() => {
                setAuth({...auth, mensaje: null})
                router.push('/login');
            }, 3000);

        } catch (error) {
            setAuth({...auth, mensaje: error.response.data.msg})

            setTimeout(() => {
                setAuth({...auth, mensaje: null})
            }, 3000);
        }
    }
   
    const iniciarSesion = async datos => {
        try {
            const {data} = await clienteAxios.post('/api/usuarios/auth', datos)
            localStorage.setItem('nodesend-token', data.token)
            setAuth({...auth, token: data.token, autenticado: true})
        } catch (error) {
            setAuth({...auth, mensaje: error.response.data.msg})

            setTimeout(() => {
                setAuth({...auth, mensaje: null})
            }, 3000);
        }
    }

    const autenticarUsuario = async token => {

        if(token) {
            tokenAuth(token);
        }

        try {
            const {data} = await clienteAxios('/api/usuarios/auth');
            setAuth({...auth, usuario: data, autenticado: true})
        } catch (error) {
            console.log(error);
        }
    }

    const cerrarSesion = () => {

        const confirmacion = confirm('¿Deseas cerrar la sesión?')

        if(confirmacion) {
            
            localStorage.removeItem('nodesend-token');

            delete clienteAxios.defaults.headers.common['Authorization'];

            setAuth({ 
                token: '',
                autenticado: null,
                usuario: null,
                mensaje: null
            })
        }
    }

    return (
        <authContext.Provider
            value={{
                auth,
                registrarUsuario,
                iniciarSesion,
                autenticarUsuario,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export {
    AuthProvider
}

export default authContext