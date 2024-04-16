import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Spinner from "./Spinner";
import useArchivos from "@/hooks/useArchivos";
import useAuth from "@/hooks/useAuth";
import Formulario from "@/components/Formulario.js";

const Dropzone = () => {

  const {handleSetAlerta, subirArchivo, cargando, crearEnlace} = useArchivos();

  const {auth: {autenticado}} = useAuth();

  const onDropAccepted = useCallback( async (acceptedFiles) => {

    //Crear un form-data

    const formData = new FormData();
    formData.append('archivo', acceptedFiles[0])

    subirArchivo(formData, acceptedFiles[0].path);

  }, [])

  const onDropRejected = () => {
    handleSetAlerta('No se puede subir archivos de más de 1 MB, crea una cuenta')

    setTimeout(() => {
      handleSetAlerta('');
    }, 3000);
  }

  const { getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxSize: autenticado ? 1024*1024*10 : 1024*1024});

  const archivos = acceptedFiles.map( archivo => (
    <li className="bg-white p-3 mb-3 shadow-lg rounded-lg" key={archivo.lastModified}>
      <p className="font-bold text-xl">{archivo.path}</p>
      <p className="font-sm text-gray-500">{(archivo.size / Math.pow(1024, 2)).toFixed(2)}{''} MB</p>
    </li>
  ))

  return (
    <div className="h-auto mb-3 mx-2 mt-8 lg:mt-0 flex flex-auto md:flex-1 flex-col items-center justify-center bg-gray-100 border-dashed border-gray-400 border-2">

        { acceptedFiles?.length > 0 ? 
          (
            <div className="w-full px-5 py-4">
              <h4 className="text-2xl text-center font-bold mb-4 mt-5 md:mt-0">Archivos</h4>
              <ul>
                {archivos}
              </ul>

              {autenticado && <Formulario />} 

              {cargando ?  
               <div className="flex flex-col justify-center mt-10">
                <p className=" text-blue-700 font-bold text-center">Subiendo archivo</p>
                <Spinner />
               </div>
              
              : ( 
              
                <button
                    type="button"
                    className=" bg-blue-700 w-full py-2 px-3 rounded-lg my-10 text-white hover:bg-blue-800 transition-colors" 
                    onClick={() => crearEnlace()}
                  >
                    Crear Enlace
                </button>
              
              )}
            </div>
          ) : 

          (
            <div { ...getRootProps({ className: 'dropzone py-32 w-full'})}>
              <input className=" h-full" {...getInputProps()}/>
               <div className="flex justify-center">
                  {
                    isDragActive ? 
                    (
                      <p className="text-2xl text-center text-gray-600">Suelta el archivo</p>
                    ) : 
                    
                    (
                      <div className=" w-4/5">
                        <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrastralo aquí</p>
                        <button 
                        className=" bg-blue-700 w-full py-2 px-3 rounded-lg my-10 text-white hover:bg-blue-800 transition-colors" 
                        >
                          Selecciona archivos para subir  
                        </button>
                      </div>
                    )
                  }
                </div>
            </div>
          )
        }
    </div>
  )
}

export default Dropzone
