import '@/styles/globals.css'
import '@/styles/Spinner.css'
import { AuthProvider } from '@/context/authProvider';
import { ArchivosProvider } from '@/context/archivosProvider';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ArchivosProvider>
        <Component {...pageProps} />
      </ArchivosProvider>
    </AuthProvider>
  )
}
