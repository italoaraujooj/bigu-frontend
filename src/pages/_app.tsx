import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import "@/styles/reset.css";
import type { AppProps } from "next/app";

import { NotificationProvider } from "@/context/NotificationContext";
import { RequestProvider } from "@/context/RequestContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <RequestProvider>
      {/* @ts-ignore */}
      <AuthProvider>
        {/* @ts-ignore */}
        <NotificationProvider>
          {/* <RideProvider> */}
          {/* @ts-ignore */}
          <ToastContainer />
          {/* @ts-ignore */}
          <Component {...pageProps} />
          {/* </RideProvider> */}
        </NotificationProvider>
      </AuthProvider>
    </RequestProvider>
  );
}
