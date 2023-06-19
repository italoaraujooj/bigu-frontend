import { getUser, signInRequest, signUpRequest, logOut, forgotPasswordRequest } from "@/services/auth";
import { Children, createContext, useEffect, useState } from "react";
import Router from "next/router";
import { api } from "@/services/api";
import { destroyCookie, parseCookies, setCookie } from "nookies";

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<any>;
  signUp: (data: SignUpData) => Promise<any>;
  logOu: () => Promise<void>;
  user: any;
  setUser: (user: User) => void;
  forgotPassword: (data: string) => Promise<void>
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
      const response: any = await signInRequest({ email, password });
      if (response.status === 200) {
        setCookie(undefined, 'nextauth.token', response?.data?.token, {
          maxAge: 8600,
        });
        setUser(response?.data?.userResponse)
        Router.push("/dashboard");
      }  
      return { data: response?.data, status: response?.status };
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
    if(response){
      setCookie(undefined, 'nextauth.token', response?.data?.token, {
        maxAge: 8600,
      });    
      Router.push("/dashboard");
    }
  }

  async function forgotPassword(email: string) {
    try {
      const response = await forgotPasswordRequest(email);
      console.log(response)
      Router.push("/");

      
    } catch (err) {
      console.log(err);
    }
    
  }

  async function logOu() {
    await logOut();
    Router.push('/');
    destroyCookie(null, 'nextauth.token');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, logOu, setUser, forgotPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}
