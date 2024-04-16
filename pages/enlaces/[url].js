import Layout from "@/components/Layout";
import clienteAxios from "@/config/axios";
import { useState } from "react";
import useArchivos from "@/hooks/useArchivos";
import Alerta from "@/components/Alerta";

export async function getServerSideProps({params}) {

    try {
        const {url} = params

        const {data} = await clienteAxios(`/api/enlaces/${url}`)

        return {
            props: {
                enlace: {archivo: data.archivo, password: data.password, url}
            }
        } 
    } catch (error) {
        console.log(error);

        return {
            props: {}
        }
    }
}

export async function getServerSidePaths() {

    try {
        const {data} = await clienteAxios('/api/enlaces');
        
        const paths = data.enlaces.map(enlace => ({
            params: {
                url: enlace.url   
            }
        }))

        return {
            paths,
            fallback: false
        }
    } catch (error) {
        console.log(error);

        return {
            paths: [],
            fallback: false
        }
    }

        
}

export default function Enlace({enlace}){

    const [tienePassword, setTienePassword] = useState(enlace.password)
    const [password, setPassword] = useState('');
    const {alerta, handleSetAlerta} = useArchivos('')

    const verificarPassword = async e => {
        e.preventDefault();

        const datos = {
            password
        }
        
        try {
            const {data} = await clienteAxios.post(`/api/enlaces/${enlace.url}`, datos)
            setTienePassword(data.password);
        } catch (error) {
            handleSetAlerta(error.response.data.msg);
            
            setTimeout(() => {
                handleSetAlerta('');
            }, 3000);
        }

    }

    return (
        <Layout>

        {tienePassword ? (
            <>
                <p className="text-center">Este enlace está protegido por una password, colócalo a continuación</p>

                {alerta && <Alerta />}

                <div className="flex justify-center mt-5">
                    <div className="  w-full max-w-lg">
                        <form className=' bg-white shadow-md rounded-md px-8 py-6 mb-4'
                            onSubmit={verificarPassword}
                        >
                            <label 
                                className='block text-black text-sm font-bold mb-5'
                                htmlFor='password'
                            >
                                Password
                            </label>
                            <input 
                                type='password'
                                id='password'
                                placeholder='Password de Usuario'
                                className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                                leading-tight focus:outline-none focus:shadow-outline mb-5'
                                onChange={e => setPassword(e.target.value)}
                            />
                            <input 
                                type='submit'
                                className=' bg-red-500 hover:bg-gray-900 transition-colors w-full p-2 text-white uppercase font-bold'
                                value='Validar password'
                            />
                        </form>
                    </div>
                </div>
            </>

        ) : (
            <div>
                <h1 className=" text-3xl text-center text-gray-400">Descarga tu archivo:</h1>
                <div className=" flex justify-center items-center mt-10">
                    <a href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                    className="bg-red-500 py-3 px-10 font-bold text-center text-white uppercase cursor-pointer">Aquí</a>
                </div>
            </div>  
        )}
        </Layout>
    )
}