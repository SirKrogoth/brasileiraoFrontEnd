import type{ AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps){
    //return <Component {...PageProps} />
    return (        
        <>
            <Component {...pageProps} />
            <ToastContainer autoClose={3000} />
        </>        
    )
}

export default MyApp;