import React, {useRef, useState} from "react";
import { Form } from '@unform/web'
import Input from '../input/input'
import { SubmitHandler, FormHandles } from '@unform/core'
import Image from "next/image";
import Back from "../../assets/CaretRight.svg"
import Button from "../button";

interface UserFormState {
    name: string;
    email: string;
    telephone: string;
    matricula: string;
    password: string;
    confirmPassowrd: string
}

function Register(){
    const formRef = useRef<FormHandles>(null)
    
    const handleSubmit: SubmitHandler<UserFormState> = data => {
        console.log(data.name)
        console.log(data.email)
        console.log(data.telephone)
        console.log(data.matricula)
        console.log(data.name)
    
    }

    return(
        <div className="flex justify-center items-start h-screen fixed bg-white w-[100%] overflow-y-scroll pt-3 lg:right-0 lg:max-w-[30.125rem]">
                <Form className="flex flex-col gap-5 justify-center"ref={formRef} onSubmit={handleSubmit}>
                    <Image className="w-10 h-10" src={Back} alt="voltar"/>
                    <h1 className="font-['Poppins'] font-semibold text-2xl md:text-4xl">
                        Criar Conta
                    </h1>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Input label="Nome Completo: " name="name" sizing="sm" color="light" className="md:w-80 md:h-16 md:text-lg" type="text" placeholder="Exemplo Alves" required  />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input label="Email (Acadêmico)"  name="email" sizing="sm" color="light" className="md:w-80 md:h-16 md:text-lg" type="email" placeholder="seu.nome@ufcg.edu.br" required/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input label="Telefone" name="telephone" sizing="sm" color="light" className="md:w-80 md:h-16 md:text-lg"  type="tel" placeholder="(83)999999999" required/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input label="Senha:"  name="password" sizing="sm" color="light" className="md:w-80 md:h-16 md:text-lg" type="password" placeholder="*********" required/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input label="Confirme sua senha:" name="confirmPassowrd" sizing="sm" color="light" className="md:w-80 md:h-16 md:text-lg" type="password"  placeholder="*********" required/>
                        </div>
                        {/* <button className="bg-[#FFB400] rounded-lg h-16 font-bold text-2xl text-white" type="submit">Cadastrar</button> */}
                        <Button label="Cadastrar" onClick={() => {}} size="lg" color="yellow" shape="square" />
                        <div>
                            <p className="text-xs md:text-sm flex justify-center">Ao se inscrever, você concorda com nossos</p>
                            <p className="text-xs md:text-sm flex justify-center">Termos de Uso e com a Política de Privacidade.</p>
                        </div>
                    </div>
                </Form>
        </div>
    )
}

export default Register;