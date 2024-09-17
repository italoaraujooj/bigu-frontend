import {
  getUser,
  signInRequest,
  signUpRequest,
  logOut as exit,
} from "@/services/auth";
import { createContext, useContext, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { RequestContext } from "./RequestContext";
import { fakeDelay } from "@/utils/delay";
import { User } from "@/utils/types";
import { UserFormState } from "@/components/register";

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<any>;
  signUp: (data: UserFormState) => Promise<any>;
  logout: () => Promise<void>;
  user: User | undefined;
  setUser: (user: User) => void;
};

type SignInData = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  const { inProgress, done } = useContext(RequestContext);
  const router = useRouter();
  
  async function signIn(credentials: SignInData) {
    const response = await signInRequest(credentials);
    
    if (response && response.status === 200) {
      setCookie(undefined, "nextauth.token", response?.data?.token, {
        maxAge: 8600,
      });
      setUser(response.data.user);
      router.push("/dashboard");
    }
    return { data: response?.data, status: response?.status };
  }

  async function signUp(credentials: UserFormState) {
    const response = await signUpRequest(credentials);
    if (response && response.status === 201) {
      setCookie(undefined, "nextauth.token", response?.data?.token, {
        maxAge: 8600,
      });
      setUser(response.data.user);
      
      router.push({
        pathname: '/dashboard',
        query: { firstAccess: true }
      })
    }
    return { data: response?.data, status: response?.status };
  }

  async function logout() {
    router.push("/");
    setUser(undefined);
    await exit();
  }

  const getUserData = async () => {
    try {
      inProgress();
      const response = await getUser();

      await fakeDelay(500);

      done();

      setUser(response.data.user);
    } catch (err) {

    }
  }

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) {
      getUserData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
