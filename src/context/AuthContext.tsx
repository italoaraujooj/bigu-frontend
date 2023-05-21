import { getUser, signInRequest, signUpRequest } from "@/services/auth";
import { Children, createContext, useEffect, useState } from "react";
import Router from "next/router"
import jwt from "jsonwebtoken"

type AuthContextType = {
    isAuthenticated: boolean
    signIn: (data: SignInData) => Promise<void>
    signUp: (data: SignUpData) => Promise<void>
}

type SignInData = {
    email: string,
    password: string
}

type SignUpData = {
    fullName:string,
    email:string,
    phoneNumber:string,
    password:string
}



type User = {
    email:string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: any){
    const [user, setUser] = useState<User | null>(null)
    const isAuthenticated = false;

    // setar o usuario com os dados recebidos do back
    // useEffect(() => {
    //     const token = localStorage.getItem("bigu-token");
        
    //     if(token){
    //         getUser().then(response => {
    //             console.log(response)
    //         })
    //     }
    // })

    async function signIn({email, password}: SignInData) {
        const response = await signInRequest(
            {email,
            password
        })
        localStorage.setItem("bigu-token", response.data.token)
        const payload = decodeJWT(response.data.token)
        console.log(payload);
        console.log(response.data.token);
        Router.push("/profile")
    }

    async function signUp({fullName, email, phoneNumber, password}: SignUpData) {
        const response = await signUpRequest(
            {fullName,
            email,
            phoneNumber,
            password
        })
        localStorage.setItem("bigu-token", response.data.token)
        const payload = decodeJWT(response.data.token)
        console.log(payload);
        console.log(response.data.token);
        Router.push("/profile")
    }

    function decodeJWT(token:string) {
        try {
          const decoded = jwt.decode(token);
          return decoded;
        } catch (error) {
          console.error('Erro ao decodificar o token JWT:', error);
          return null;
        }
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, signIn, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}