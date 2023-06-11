import "@/styles/reset.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { RideProvider } from "@/context/RideContext";
import { Modal } from "@/components";
import LottieAnimation from "@/components/LottieAnimation";
import CarLoading from "../assets/Car.json";
import { useContext, useEffect, useState } from "react";
import { RequestContext, RequestProvider } from "@/context/RequestContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RequestProvider>
      <AuthProvider>
        <RideProvider>
          <Component {...pageProps} />
        </RideProvider>
      </AuthProvider>
    </RequestProvider>
  );
}
