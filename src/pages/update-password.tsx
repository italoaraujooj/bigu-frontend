import { Button, Input } from "@/components";
import { changePasswordRequest } from "@/services/auth";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface RecoverPasswordFormState {
    password: string;
    confirmPassword: string;
}

export default function RecoverPassword() {
    const router = useRouter();
    const formRef = useRef<FormHandles>(null);
    const [email, setEmail] = useState("")

    useEffect(() => {
        const emailQuery = router.query.email;

        if (typeof emailQuery === 'string') {
            setEmail(emailQuery);
        } else if (Array.isArray(emailQuery)) {
            setEmail(emailQuery[0]);
        }
    }, [router.query.email]);

    console.log(email)

    const handleSubmit: SubmitHandler<RecoverPasswordFormState> = async ({ password, confirmPassword }) => {
        if(password !== confirmPassword){
            toast.error("As senhas não correspondem.")
        }
        const body = {
            email: email,
            newPassword: password,
            confirmPassword: confirmPassword,
          }
        try{
            const response = await changePasswordRequest(body)
            if(response && response.status === 200){
                toast.success("Senha alterada com sucesso.")
                router.push("/")
            }
        }catch(error: any){
            toast.error(error.message)
        }
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <Form
                onSubmit={handleSubmit}
                ref={formRef}
                className="w-96 drop-shadow-md bg-white rounded-md flex flex-col justify-center py-8 px-12"
            >
                <Input
                    name="password"
                    label="Nova senha"
                    placeholder=""
                    sizing="adjustable"
                    type="password"
                    className="w-full"
                    required
                />

                <Input
                    name="confirmPassword"
                    label="Confirme a nova senha"
                    placeholder=""
                    sizing="adjustable"
                    type="password"
                    className="w-full"
                    required
                />
                <Button
                label="Confirmar"
                size="base"
                color="yellow"
                shape="rounded"
                type="submit"
                className=" self-center"
                />
            </Form>
        </div>
    )
}