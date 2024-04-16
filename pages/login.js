import { useEffect } from 'react'
import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '@/hooks/useAuth'
import Alerta from '@/components/Alerta'
import { useRouter } from 'next/router'

const Login = () => {

  const { iniciarSesion, auth } = useAuth();

  const { autenticado } = auth;

  const router = useRouter();
 
  useEffect( () => {
    if(autenticado) {
      router.push('/');
    }
  }, [autenticado])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('No es válido').required('El email es obligatorio'),
      password: Yup.string().required('El password es obligatorio')
    }),
    onSubmit: valores => {
      iniciarSesion(valores);
    }
  })

  return (
    <Layout>
        <div className='md:w-4/5 xl:w-3/5 mx-auto mb-16'>
          <h2 className=' text-3xl font-bold text-gray-800 text-center my-4'>
            Iniciar Sesión
          </h2>

          {auth.mensaje && <Alerta />}

          <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg'>
              <form className=' bg-white shadow-md rounded-md px-8 py-6 mb-4'
                    onSubmit={formik.handleSubmit}
              >
              <div className=' mb-4'>
                <label 
                  className='block text-black text-sm font-bold mb-2'
                  htmlFor='email'
                  >
                    Email
                </label>
                <input 
                  type='email'
                  id='email'
                  placeholder='Email de Usuario'
                  className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.email && formik.errors.email ? (
                  <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className=' font-bold'>Error:</p>
                    <p>{formik.errors.email}</p>
                  </div>
                  ) : null
                }
              </div>
              <div className=' mb-4'>
                <label 
                  className='block text-black text-sm font-bold mb-2'
                  htmlFor='password'
                  >
                    Password
                </label>
                <input 
                  type='password'
                  id='password'
                  placeholder='Password de Usuario'
                  className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.password && formik.errors.password ? (
                  <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className=' font-bold'>Error:</p>
                    <p>{formik.errors.password}</p>
                  </div>
                  ) : null
                }
              </div>

              <input 
                type='submit'
                className=' bg-red-500 hover:bg-gray-900 transition-colors w-full p-2 text-white uppercase font-bold'
                value='Inicia Sesión'
              />
              </form>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Login
