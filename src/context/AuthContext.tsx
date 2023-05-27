import { getUser, signInRequest, signUpRequest, logOut } from "@/services/auth";
import { Children, createContext, useEffect, useState } from "react";
import Router from "next/router"
import jwt from "jsonwebtoken"
import { api } from "@/services/api";

type AuthContextType = {
    isAuthenticated: boolean
    signIn: (data: SignInData) => Promise<void>
    signUp: (data: SignUpData) => Promise<void>
    logOu: (data: Token) => Promise<void>
    user: any
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

type Token = {
    token: string;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: any){
    const [user, setUser] = useState({})
    const isAuthenticated = !!user;

    useEffect(() => {
        const token = localStorage.getItem("bigu-token");
        if(token){
            getUser().then(response => {
                setUser(response.data)
            })
        }   
    }, [])
   
    async function signIn({email, password}: SignInData) {
        const response = await signInRequest(
            {email,
            password
        })
        localStorage.setItem("bigu-token", response?.data.token)
        api.defaults.headers['Authorization'] = `Bearer ${response?.data.token}`
        Router.push("/dashboard")
    }

    async function signUp({fullName, email, phoneNumber, password}: SignUpData) {
        const response = await signUpRequest(
            {fullName,
            email,
            phoneNumber,
            password
        })
        localStorage.setItem("bigu-token", response?.data.token)
        api.defaults.headers['Authorization'] = `Bearer ${response?.data.token}`
        Router.push("/dashboard")
    }

    async function logOu(params:Token) {
        const response = await logOut(params);
        if(response?.status == 200){
            localStorage.removeItem("Bigu-token")
            Router.push("/")
        }        
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signUp, logOu}}>
            {children}
        </AuthContext.Provider>
    )
}