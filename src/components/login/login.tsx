import React, {useRef, useState} from "react";
import { Form } from '@unform/web'
import Input from '../input/input'
import { SubmitHandler, FormHandles } from '@unform/core'
import Image from "next/image";
import Back from "../../assets/CaretRight.svg"
import Button from "../button";

interface UserLoginState {
    email: string;
    password: string;
}

function Login(){
    const formRef = useRef<FormHandles>(null);
    
    const handleSubmit: SubmitHandler<UserLoginState> = data => {
    console.log(data.email)
    console.log(data.password)
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
                        <Input label = "Email" name="email" sizing="sm" color="light" className="md:w-80 md:h-16 md:text-lg" type="email" placeholder="seu.nome@ufcg.edu.br" required/>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Input label="Senha:" name="password" sizing="sm" color="light" className="md:w-80 md:h-16 md:text-lg" type="password" placeholder="*********" required/>
                    </div>
                    <Button label="Entrar" onClick={() => {}} size="lg" color="yellow" shape="square" />
                </div>    
            </Form>
        </div>
    )

}

export default Login;