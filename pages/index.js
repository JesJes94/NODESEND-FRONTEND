import { use, useEffect } from "react";
import Layout from "../components/Layout.js";
import useAuth from "@/hooks/useAuth.js";
import useArchivos from "@/hooks/useArchivos.js";
import Link from "next/link";
import Dropzone from "@/components/Dropzone.js";
import Alerta from "@/components/Alerta.js";

export default function Home() {

  const { autenticarUsuario } = useAuth();

  const { alerta, archivo: {url} } = useArchivos();

  useEffect( () => {
    const token = localStorage.getItem('nodesend-token');

    if(token) {
      autenticarUsuario(token);
    }
  }, [])


  return (
    <>
      <Layout>
        <div className=" md:w-4/5 xl:w-3/5 mx-auto">

          { url ? (
            <>
              <p className="text-center"><span className=" font-bold text-red-600 text-2xl uppercase">Tu url es: </span>{`${process.env.frontendURL}/enlaces/${url}`}</p>

              <button
                type="button"
                className=' bg-red-500 hover:bg-gray-900 transition-colors w-full p-2 text-white uppercase font-bold rounded-md mt-5'
                onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
                
              >
                Copiar Enlace
              </button>
            </>
          )
    
          :
            <div className="shadow-lg p-5 bg-white rounded-lg py-10">

            {alerta && (
                <div className=" mb-5">
                  <Alerta />
                </div>
              )
            }

              <div className=" md:flex gap-4">
                <Dropzone />

                <div className=" md:flex-1 mb-3 mx-2 mt-8 lg:mt-0">
                  <h2 className="text-3xl font-sans font-bold text-gray-800 my-4">
                    Compartir archivos de forma rápida y sencilla
                  </h2>
                  <p className="leading-loose mb-5">
                    <span className="text-red-500 font-bold">React-NodeSend</span>{' '}
                    Maecenas quis erat fringilla, fermentum nulla sed, commodo quam. In suscipit sodales libero, id viverra est aliquam at. Sed a accumsan quam, ut vulputate neque. Mauris id augue ac quam viverra luctus. Curabitur tincidunt, magna in elementum eleifend, sem augue tristique massa, sit amet ultricies lectus elit eget lorem.
                  </p>

                  <Link href='/crearcuenta'
                        className='text-red-500 font-bold hover:text-red-700 flex justify-center md:flex-none'
                  >
                    Crea una cuenta para mayores beneficios
                  </Link>
                </div>
              </div>
            </div>
          }
        </div>
      </Layout>
    </>
  );
}
