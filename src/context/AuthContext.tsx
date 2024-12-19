import { UserFormState } from "@/components/register";
import {
  logOut as exit,
  getUser,
  signInRequest,
  signUpRequest,
} from "@/services/auth";
import { UserResponseDTO } from "@/types/ride";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";
import { RequestContext } from "./RequestContext";

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<any>;
  signUp: (data: UserFormState) => Promise<any>;
  logout: () => Promise<void>;
  user: UserResponseDTO | undefined;
  setUser: (user: UserResponseDTO) => void;
};

type SignInData = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserResponseDTO>();
  const isAuthenticated = !!user;
  const { inProgress, done } = useContext(RequestContext);
  const router = useRouter();

  async function signIn(credentials: SignInData) {
    const response = await signInRequest(credentials);

    if (response && response.status === 200) {
      setCookie(undefined, "nextauth.accessToken", response.data.accessToken);
      setCookie(undefined, "nextauth.refreshToken", response.data.refreshToken);
      setUser(response.data.user);
      await router.push("/dashboard");
    }
    return { data: response?.data, status: response?.status };
  }

  async function signUp(credentials: UserFormState) {
    const response = await signUpRequest(credentials);
    if (response && response.status === 201) {
      setCookie(undefined, "nextauth.accessToken", response.data.accessToken);
      setCookie(undefined, "nextauth.refreshToken", response.data.refreshToken);
      setUser(response.data.userResponse);

      router.push("/verify-email");
    }
    return { data: response?.data, status: response?.status };
  }

  async function logout() {
    await exit();
  }

  const getUserData = async () => {
    try {
      inProgress();
      const response = await getUser();
      done();

      setUser(response.data.user);

      if (!response.data.user.isVerified) {
        router.push("/verify-email");
      }
    } catch (err) {}
  };

  useEffect(() => {
    const { "nextauth.accessToken": token } = parseCookies();
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
