import Link from "next/link"
import useProvider from "@/hooks/useAuth"

const Header = () => {

  const { auth : {usuario}, cerrarSesion } = useProvider();

  return (
    <header className=" py-8 flex flex-col md:flex-row items-center justify-between">

        <Link href='/'>    
           <img className=" w-64 mb-8 md:mb-0" src='/logo.svg' />
        </Link>

      {usuario ? (
      
      <div className="flex gap-8 items-center">
        <p className="font-bold">Hola: {usuario.nombre}</p>
        <button type="button"
                className="bg-black py-3 px-5 rounded-lg uppercase font-bold text-white"
                onClick={() => cerrarSesion()}
        >
          Cerrar Sesión
        </button>
      </div>

      )
      
      : 
      
      (
        <div className=" flex gap-4">
          <Link href='/login' className="bg-red-500 py-2 px-5 uppercase text-white rounded-md font-bold shadow-sm hover:bg-red-700 transition-colors">
              Iniciar Sesión
          </Link>
          <Link href='/crearcuenta' className=" bg-gray-900 py-2 px-5 uppercase text-white rounded-md font-bold shadow-sm hover:bg-black transition-colors">
              Crear Cuenta
          </Link>
        </div>
      )}

      
    </header>
  )
}

export default Header
