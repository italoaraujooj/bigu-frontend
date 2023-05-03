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
        <div className="flex justify-center items-start h-screen fixed bg-white w-[100%] overflow-y-scroll pt-3 md:right-0 md:max-w-[30.125rem]">
                <Form className="flex flex-col gap-5 justify-center"ref={formRef} onSubmit={handleSubmit}>
                    <Image className="w-10 h-10" src={Back} alt="voltar"/>
                    <h1 className="font-['Poppins'] font-semibold text-2xl md:text-4xl">
                        Criar Conta
                    </h1>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <label className="font-['Poppins'] text-[#616161] font-bold text-sm md:text-lg">Nome completo:</label>
                            <Input name="name" className="font-['Poppins'] placeholder-[#808080] block bg-[#C2C2C2] rounded-xl w-80 h-14 px-5 text-sm md:h-20 md:text-lg" type = "text" placeholder="Exemplo eaosdlss" required />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-['Poppins'] text-[#616161] text-sm font-bold md:text-lg">Email (Acadêmico)</label>
                            <Input name="email" className="font-['Poppins'] placeholder-[#808080] block bg-[#C2C2C2] rounded-xl w-80 h-14 px-5 text-sm md:h-20 md:text-lg" type="email" placeholder="seu.nome@ufcg.edu.br" required/>
                            {emailErr && <p className="text-red-500">Email inválido *</p>}
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="font-['Poppins'] text-[#616161] text-sm font-bold md:text-lg">Telefone</label>
                            <Input name="telephone" className="font-['Poppins'] placeholder-[#808080] block bg-[#C2C2C2] rounded-xl w-80 h-14 px-5 text-sm md:h-20 md:text-lg"  type="tel" placeholder="(83)999999999" required/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-['Poppins'] text-[#616161] text-sm font-bold md:text-lg">Matricula</label>
                            <Input name="matricula" className="font-['Poppins'] placeholder-[#808080] block bg-[#C2C2C2] rounded-xl w-80 h-14 px-5 text-sm md:h-20 md:text-lg" type="text" placeholder="999999999" required/>
                            {matriculaErr && <p className="text-red-500">Matricula invalida *</p>}
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-['Poppins'] text-[#616161] text-sm font-bold md:text-lg">Senha:</label>
                            <Input name="password" className="font-['Poppins'] placeholder-[#808080] block bg-[#C2C2C2] rounded-xl w-80 h-14 px-5 text-sm md:h-20 md:text-lg" type="password" placeholder="*********" required/>
                            {passwordErr && <p className="text-red-500">Senha muito curta *</p>}
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-['Poppins'] text-[#616161] text-sm font-bold md:text-lg">Confirme sua senha:</label>
                            <Input name="confirmPassowrd" className="font-['Poppins'] placeholder-[#808080] block bg-[#C2C2C2] rounded-xl w-80 h-11 px-5 text-sm md:h-20 md:text-lg" type="password"  placeholder="*********" required/>
                        </div>
                        <button className="bg-[#FFB400] rounded-lg h-12 font-bold text-white text-xl md:h-16 md:text-3xl" type="submit">Cadastrar</button>
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