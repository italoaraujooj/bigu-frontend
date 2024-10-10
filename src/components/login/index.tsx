import React, { useContext, useRef, useState } from "react";
import { Form } from "@unform/web";
import Input from "../input/input";
import { SubmitHandler, FormHandles } from "@unform/core";
import Image from "next/image";
import Back from "../../assets/CaretRight.svg";
import Button from "../button";
import { AuthContext } from "@/context/AuthContext";
import clsx from "clsx";
import Modal from "../modal";
import Router from "next/router";
import { RequestContext } from "@/context/RequestContext";
import LottieAnimation from "../LottieAnimation";
import CarLoading from "../../assets/Car.json";
import { toast } from "react-toastify";

interface UserLoginState {
  email: string;
  password: string;
}

type Props = {
  visible: boolean;
  handleClose: () => void;
};

function Login(props: Props) {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useContext(AuthContext);
  const { visible, handleClose } = props;
  const { loading, inProgress, done } = useContext(RequestContext);

  const handleSubmit: SubmitHandler<UserLoginState> = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };

    await signIn(user);
  };

  const handleRecoveryPassword = () => {

    Router.push("/recover-password")

  }


  return (
    <div
      id="login"
      className={clsx(
        "transition ease-in-out delay-150 duration-500",
        `flex pr-12 lg:pr-0 justify-center items-start h-screen fixed bg-white w-[100%] overflow-y-scroll pt-3 top-0 lg:right-0 lg:max-w-[30.125rem]`,
        visible ? "translate-x-0" : "translate-x-full"
      )}
    >
      <Form
        className="flex flex-col gap-5 justify-center"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Image
          className="w-10 h-10 cursor-pointer"
          src={Back}
          alt="voltar"
          onClick={handleClose}
        />
        <h1 className="font-['Poppins'] font-semibold text-3xl md:text-5xl my-2">
          Login
        </h1>
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="flex flex-col gap-3">
            <Input
              label="Email"
              name="email"
              sizing="adjustable"
              color="extralight"
              className="md:w-80 md:h-16 md:text-lg"
              type="email"
              placeholder="seu.nome@ufcg.edu.br"
              readOnly={false}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <Input
              label="Senha:"
              name="password"
              sizing="sm"
              color="extralight"
              className="md:w-80 md:h-16 md:text-lg"
              type="password"
              placeholder="*********"
              readOnly={false}
              required
            />
          </div>
          <span className="text-sm text-gray cursor-pointer self-end hover:underline font-[Poppins]" onClick={handleRecoveryPassword}>Esqueci minha senha</span>
          <Button label="Entrar" size="lg" color="yellow" shape="square" type="submit" />
        </div>
      </Form>
      {<Modal isOpen={loading} onClose={() => {}} noActions transparent>
          <div className="w-72 h-72"><LottieAnimation data={CarLoading}  /></div>
        </Modal> }
    </div>
  );
}
export default Login;
