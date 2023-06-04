import '@/styles/reset.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthContext'
import { RideProvider } from '@/context/RideContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RideProvider>
        <Component {...pageProps} />
      </RideProvider>
    </AuthProvider>  
  )
}
