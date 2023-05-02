import React, {useRef, useState} from "react";
import { Form } from '@unform/web'
import Input from '../input/input'
import { SubmitHandler, FormHandles } from '@unform/core'
import Image from "next/image";
import Back from "../../assets/CaretRight.svg"
import { validateEmail, validateMatricula, validatePassword } from "@/utils/validate";


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
    const [emailErr, setEmailErr] = useState<Boolean>(false)
    const [matriculaErr, setMatriculaErr] = useState<Boolean>(false)
    const [passwordErr, setPasswordErr] = useState<Boolean>(false)
    
    const handleSubmit: SubmitHandler<UserFormState> = data => {
        if(!validateEmail(data.email)){
            setEmailErr(true);
            return
        }
        setEmailErr(false);

        if(!validateMatricula(data.matricula)){
            setMatriculaErr(true);
            return
        }
        setMatriculaErr(false);

        if(!validatePassword(data.password)){
            setPasswordErr(true);
            return
        }
        setPasswordErr(false);

        if(!(emailErr && matriculaErr && passwordErr)){
            //envia os dados para o Back
            console.log(data)
        }
    }

    return(
        <div className="flex justify-center content-end h-screen fixed top-0 right-0 bg-white max-w-[482px] w-[100%]">
                <Form className="flex flex-col gap-5 justify-center"ref={formRef} onSubmit={handleSubmit}>
                    <Image className="w-10 h-10" src={Back} alt="voltar"/>
                    <h1 className="font-['Poppins'] font-semibold font text-3xl">
                        Criar Conta
                    </h1>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <label className="font-['Poppins'] text-[#616161] text-sm font-bold">Nome completo:</label>
                            <Input name="name" className="font-['Poppins'] placeholder-[#808080] block bg-[#C2C2C2] rounded-xl w-80 h-16 px-5" type = "text" placeholder="Exemplo eaosdlss" required />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-['Poppins'] text-[#616161] text-sm font-bold">Email (Acadêmico)</label>
                            <Input name="email" className="font-['Poppins'] placeholder-[#808080] block bg-[#C2C2C2] rounded-xl w-80 h-16 px-5" type="email" placeholder="seu.nome@ufcg.edu.br" required/>
                            {emailErr && <p className="text-red-500">Email inválido *</p>}
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="font-['Poppins'] text-[#616161] text-sm font-bold">Telefone</label>
                            <Input name="telephone" className="font-['Poppins'] placeholder-[#808080] block bg-[#C2C2C2] rounded-xl w-80 h-16 px-5" type="tel" placeholder="(83)999999999" required/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-['Poppins'] text-[#616161] text-sm font-bold">Matricula</label>
                            <Input name="matricula" className="font-['Poppins'] placeholder-[#808080] block bg-[#C2C2C2] rounded-xl w-80 h-16 px-5" type="text" placeholder="999999999" required/>
                            {matriculaErr && <p className="text-red-500">Matricula invalida *</p>}
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-['Poppins'] text-[#616161] text-sm font-bold">Senha:</label>
                            <Input name="password" className="font-['Poppins'] placeholder-[#808080] block bg-[#C2C2C2] rounded-xl w-80 h-16 px-5" type="password" placeholder="*********" required/>
                            {passwordErr && <p className="text-red-500">Senha muito curta *</p>}
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-['Poppins'] text-[#616161] text-sm font-bold">Confirme sua senha:</label>
                            <Input name="confirmPassowrd" className="font-['Poppins'] placeholder-[#808080] block bg-[#C2C2C2] rounded-xl w-80 h-16 px-5" type="password"  placeholder="*********" required/>
                        </div>
                        <button className="bg-[#FFB400] rounded-lg h-16 font-bold text-2xl text-white" type="submit">Cadastrar</button>
                        <div>
                            <p>Ao se inscrever, você concorda com nossos</p>
                            <p>Termos de Uso e com a Política de Privacidade.</p>
                        </div>
                    </div>
                </Form>
        </div>
    )
}

export default Register;