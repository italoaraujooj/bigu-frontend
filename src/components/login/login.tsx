import React, {useRef, useState} from "react";
import { Form } from '@unform/web'
import Input from '../input/input'
import { SubmitHandler, FormHandles } from '@unform/core'
import Image from "next/image";
import Back from "../../assets/CaretRight.svg"
import Button from "../button";
import bcrypt from "bcryptjs"

interface UserLoginState {
    email: string;
    password: string;
}

function Login(){
    const formRef = useRef<FormHandles>(null);
    
    const handleSubmit: SubmitHandler<UserLoginState> = async data => {
        const email = data.email;
        const password = data.password;
        
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer-eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQG1haWwudWZjZy5lZHUuY29tIiwiaWF0IjoxNjgzMzg1MDEyLCJleHAiOjE2ODMzODY0NTJ9.e3NE7fRN45DjNq4Y6ve8AO88k8CFYJkllMwhyHklzmQ'
              },
              body: JSON.stringify({ email, password })
            });
            console.log(response.json()
            .then(data => console.log(data))
            )
        } catch (error) {
            console.error(error);
            return false;
        }

        function encryptPassword(password: string): string {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            return hash;
        }
    
}

    return(
        <div className="flex justify-center items-start h-screen fixed bg-white w-[100%] overflow-y-scroll pt-3 lg:right-0 lg:max-w-[30.125rem]">
            <Form className="flex flex-col gap-5 justify-center"ref={formRef} onSubmit={handleSubmit}>
                <Image className="w-10 h-10" src={Back} alt="voltar"/>
                <h1 className="font-['Poppins'] font-semibold text-2xl md:text-4xl">
                    Login
                </h1>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <Input label = "Email" name="email" sizing="sm" color="light" className="md:w-80 md:h-16 md:text-lg" type="email" placeholder="seu.nome@ufcg.edu.br" required readOnly={false}/>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Input label="Senha:" name="password" sizing="sm" color="light" className="md:w-80 md:h-16 md:text-lg" type="password" placeholder="*********" required readOnly={false}/>
                    </div>
                    <Button label="Entrar" onClick={() => {}} size="lg" color="yellow" shape="square" />
                </div>    
            </Form>
        </div>
    )

}

export default Login;