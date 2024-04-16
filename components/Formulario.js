import {useState} from 'react'
import useArchivos from '@/hooks/useArchivos';

const Formulario = () => {

    const {handleSetPassword, handleSetDescargas} = useArchivos();

    const [confirmado, setConfirmado] = useState(false);

    const opciones = [2, 5, 10, 20]

  return (
    <div className=' w-full mt-10'>
        <div>
            <label className='text-lg text-gray-800 '>Eliminar tras:</label>
            <select className=' appearance-none w-full mt-2 bg-white border-1 border-gray-400 text-black py-3 px-4 rounded leading-none focus:outline-none focus:border-gray-500'
                onChange={e => handleSetDescargas(e.target.value)}
            >
                <option value="" disabled>--Seleccione--</option>
                <option value={1}>1 Descarga</option>
                {opciones.map(opcion => (
                    <option value={opcion} key={opcion}>{`${opcion} Descargas`}</option>
                ))}
            </select>
        </div>

        <div className=' mt-5'>
            <div className=' flex gap-4 items-center'>
                <label className='text-lg text-gray-800'>Proteger con contraseña</label>
                <input type='checkbox' onChange={() => setConfirmado(!confirmado)}/>
            </div>

            {confirmado && (
                <input 
                    type='password' 
                    className='appearance-none w-full mt-2 bg-white border-1 border-gray-400 text-black py-3 px-4 rounded leading-none focus:outline-none focus:border-gray-500'
                    onChange={e => handleSetPassword(e.target.value)}
                />

            )}
            
            
        </div>
    </div>
  )
}

export default Formulario
