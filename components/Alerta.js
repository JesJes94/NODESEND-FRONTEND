import React from 'react'
import useAuth from '@/hooks/useAuth'
import useArchivos from '@/hooks/useArchivos';

const Alerta = () => {

    const {auth} = useAuth();
    const {alerta} = useArchivos();


  return (
    <div className=' flex justify-center'>
        <div className=' bg-red-500 py-2 px-3 w-full my-5 max-w-lg font-bold text-center text-white uppercase'>
            {auth.mensaje || alerta}
        </div>
    </div>
  )
}

export default Alerta
