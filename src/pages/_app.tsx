import "@/styles/reset.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { RideProvider } from "@/context/RideContext";

import { RequestProvider } from "@/context/RequestContext";
import { NotificationProvider } from "@/context/NotificationContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RequestProvider>
      <AuthProvider>
        <NotificationProvider>
          <RideProvider>
              <ToastContainer/>
              <Component {...pageProps} />
          </RideProvider>
        </NotificationProvider>
      </AuthProvider>
    </RequestProvider>
  );
}
