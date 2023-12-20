import {
  signInRequest,
  signUpRequest,
  logOut as exit,
} from "@/services/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import NotificationContext from "./NotificationContext";
import { User } from "@/utils/types";

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<any>;
  signUp: (data: SignUpData) => Promise<any>;
  logout: () => Promise<void>;
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
  sex: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const {notificationHandler} = useContext(NotificationContext)
  const router = useRouter();
  
  async function signIn(credentials: SignInData) {
    try {
      const response: any = await signInRequest(credentials);
      if (response.status === 200) {
        setCookie(undefined, "nextauth.token", response?.data?.token, {
          maxAge: 8600,
        });
        setUser(response?.data?.userResponse);
        router.push("/dashboard");
      }
      return { data: response?.data, status: response?.status };
    } catch (err) {
      console.log(err);
    }
  }

  async function signUp(credentials: SignUpData) {
    try {
      const response = await signUpRequest(credentials);
      if (response) {
        setCookie(undefined, "nextauth.token", response?.data?.token, {
          maxAge: 8600,
        });
        setUser(response?.data?.userResponse);
        router.push({
          pathname: '/dashboard',
          query: { firstAccess: true }
      })
      }
      return { data: response?.data, status: response?.status };
    } catch (error) {
      notificationHandler('fail', 'Ocorreu um erro ao criar a conta');
      console.log(error);
    }
  }

  async function logout() {
    await exit();
    router.push("/");
    destroyCookie(null, "nextauth.token");
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
