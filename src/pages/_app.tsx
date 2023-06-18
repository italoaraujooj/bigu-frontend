import "@/styles/reset.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { RideProvider } from "@/context/RideContext";

import { RequestProvider } from "@/context/RequestContext";
import { NotificationProvider } from "@/context/NotificationContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RequestProvider>
      <NotificationProvider>
        <AuthProvider>
          <RideProvider>
            <Component {...pageProps} />
          </RideProvider>
        </AuthProvider>
      </NotificationProvider>
    </RequestProvider>
  );
}
