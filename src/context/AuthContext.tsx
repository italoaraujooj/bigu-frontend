import { getUser, signInRequest, signUpRequest, logOut } from "@/services/auth";
import { Children, createContext, useEffect, useState } from "react";
import Router from "next/router";
import { api } from "@/services/api";
import { destroyCookie, parseCookies, setCookie } from "nookies";

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  logOu: () => Promise<void>;
  user: any;
  setUser: (user: User) => void;
};

type SignInData = {
  email: string;
  password: string;
};

type SignUpData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

type User = {
  email: string;
};

type Token = {
  token: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null as any);
  const isAuthenticated = !!user;
  
  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();
    if (token) {
      getUser().then((data) => {
        setUser(data.data);
      })
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await signInRequest({ email, password });
      console.log(JSON.stringify(response, null, 2));
      // localStorage.setItem("bigu-token", response?.data.token)
      setCookie(undefined, 'nextauth.token', response?.data?.token, {
        maxAge: 8600,
      });

      setUser(response?.data?.userDTO)
      
      Router.push("/dashboard");

      // return response;
    } catch (err) {
      console.log(err);
    }
    
  }

  async function signUp({
    fullName,
    email,
    phoneNumber,
    password,
  }: SignUpData) {
    const response = await signUpRequest({
      fullName,
      email,
      phoneNumber,
      password,
    });
    // localStorage.setItem("bigu-token", response?.data.token);
    setCookie(undefined, 'nextauth.token', response?.data?.token, {
      maxAge: 8600,
    });    
    // api.defaults.headers["Authorization"] = `Bearer ${response?.data.token}`;
    Router.push("/dashboard");
  }

  async function logOu() {
    await logOut();
    Router.push('/');
    destroyCookie(null, 'nextauth.token');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, logOu, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
