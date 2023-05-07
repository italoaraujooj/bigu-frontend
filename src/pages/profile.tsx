import { useRef } from "react";
import Button from "../components/button";
import MaleAvatar from "../assets/woman.png";
import Star from "../assets/star.png";
import Image from 'next/image';
import Input from "../components/input/input";
import { Form } from "@unform/web";
function Profile(){

    const response = {//response da API retornando os dados do usuaio
        nome: "Matheus Alves Rafael",
        email:"seu.nome@ccc.ufcg.edu.br",
        telefone: "99999999999",
        matricula:"128929323",
        endereco:{
            rua:"Rua vigario calixto",
            cep:"58417205",
            numero: 246,
            bairro:"catole"
        },
        veiculos:{
            corolla:{
                capacidade:3,
                placa:"1232xmp"
            }
        }
    }
    

    function handleSubmit(){

    }

    return(
        <Form className="bg-dark max-w-[350px] rounded-2xl p-4 flex flex-col gap-6 md:max-w-[1258px] md:p-16 mx-auto" 
        onSubmit={handleSubmit} 
        initialData={{ name: response.nome, 
        email: response.email, 
        telephone: response.telefone, 
        matricula: response.matricula,
        rua:response.endereco.rua,
        cep:response.endereco.cep,
        numero:response.endereco.numero,
        bairro:response.endereco.bairro }}>
            <div className="flex items-center gap-3">
                <Image className="w-12 h-12 md:w-32 md:h-32" src={MaleAvatar} alt='avatar'></Image>
                <div className="flex gap-1">
                    <h1 className="text-2xl font-bold text-white md:text-5xl">Olá, Joana</h1>
                    <div className="flex items-center gap-1 pt-2">
                        <Image className="w-3 h-3" src={Star} alt="estrela"/>
                        <span className="text-gray text-[0.625rem]">5.0</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-start md:gap-x-20">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <Input label="Nome Completo" name="name" sizing="sm" color="light" className="md:w-96 md:h-16 md:text-lg" type="text" placeholder="Exemplo Alves" readOnly={true} visibility="visible"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Input label="Email" name="email" sizing="sm" color="light" className="md:w-96 md:h-16 md:text-lg" type="text" placeholder="seu.nome@ufcg.edu.br" readOnly={true} visibility="visible" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Input label="Telefone" name="telephone" sizing="sm" color="light" className="md:w-96 md:h-16 md:text-lg" type="text" placeholder="(83)999999999" readOnly={true} visibility="visible"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Input label="Matricula" name="matricula" sizing="sm" color="light" className="md:w-96 md:h-16 md:text-lg" type="text" placeholder="*********" readOnly={true} visibility="visible"/>
                    </div>
                </div>
                
                <div className="w-[20.625rem] border border-solid border-blackLine md:h-[32.5rem] md:w-0"></div>
                
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row">
                        <Input label="Endereço (rua)" name="rua" sizing="sm" color="light" className="md:w-96 md:h-16 md:text-lg" type="text" placeholder="*********" readOnly={true} visibility="visible"/>
                        <Input label="Numero" name="numero" sizing="adjustable" color="light" className="w-28 md:w-80 md:h-16 md:text-lg" type="text" placeholder="*********" readOnly={true} visibility="hidden md:visible"/>
                    </div>
                    <div className="flex gap-11 md:flex-col md:gap-6">
                        <div className="flex flex-col gap-2">
                            <Input label="CEP" name="cep" sizing="adjustable" color="light" className="md:w-80 md:h-16 md:text-lg" type="text" placeholder="*********" readOnly={true} visibility="visible"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input label="Numero" name="numero" sizing="adjustable" color="light" className="w-28 md:w-80 md:h-16 md:text-lg" type="text" placeholder="*********" readOnly={true} visibility="visible md:hidden"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                            <Input label="Bairro" name="bairro" sizing="adjustable" color="light" className="md:w-80 md:h-16 md:text-lg" type="text" placeholder="*********" readOnly={true} visibility="visible"/>
                    </div>
                    <h1 className="text-2xl text-white font-bold"> Meus veículos</h1>
                </div>
            </div>
        </Form>
    )

}

export default Profile;