import clienteAxios from "./axios";

const tokenAuth = token => {
    if(!token) {
        delete clienteAxios.defaults.headers.common['Authorization'];
    } else {
        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}

export default tokenAuth;

