import { useRef } from "react";
import Button from "../components/button";
import MaleAvatar from "../assets/woman.png";
import Star from "../assets/star.png";
import Image from "next/image";
import Input from "../components/input/input";
import { Form } from "@unform/web";
function Profile() {
  const response = {
    //response da API retornando os dados do usuaio
    nome: "Matheus Alves Rafael",
    email: "seu.nome@ccc.ufcg.edu.br",
    telefone: "99999999999",
    matricula: "128929323",
    endereco: {
      rua: "Rua vigario calixto",
      cep: "58417205",
      numero: 246,
      bairro: "catole",
    },
    veiculos: {
      corolla: {
        capacidade: 3,
        placa: "1232xmp",
      },
    },
  };

  function handleSubmit() {}

  return (
    <div className="w-full h-fit flex items-center justify-center mt-24">
      <Form
        className="bg-dark max-w-[99rem] rounded-2xl px-8 py-12 flex flex-col gap-6 md:max-w-[1258px] md:p-16 space-y-6 mx-10"
        onSubmit={handleSubmit}
        initialData={{ ...response, ...response.endereco, ...response.veiculos }}
      >
        <div className="flex items-center gap-3">
          <Image
            className="w-12 h-12 md:w-32 md:h-32"
            src={MaleAvatar}
            alt="avatar"
          ></Image>
          <div className="flex gap-1">
            <h1 className="text-2xl font-bold text-white md:text-5xl">
              Olá, Joana
            </h1>
            <div className="flex items-center gap-1 pt-2">
              <Image className="w-3 h-3" src={Star} alt="estrela" />
              <span className="text-gray text-[0.625rem]">5.0</span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2 space-y-4">
            <Input
              label="Nome Completo"
              name="name"
              sizing="adjustable"
              color="extralight"
              className="w-full md:h-16 md:text-lg"
              type="text"
              placeholder="Exemplo Alves"
              readOnly={true}
              visibility="visible"
            />
            <Input
              label="Email"
              name="email"
              sizing="adjustable"
              color="extralight"
              className="w-full md:h-16 md:text-lg"
              type="text"
              placeholder="seu.nome@ufcg.edu.br"
              readOnly={true}
              visibility="visible"
            />
            <Input
              label="Telefone"
              name="telephone"
              sizing="adjustable"
              color="extralight"
              className="w-full  md:h-16 md:text-lg"
              type="text"
              placeholder="(83)999999999"
              readOnly={true}
              visibility="visible"
            />
            <Input
              label="Matricula"
              name="matricula"
              sizing="adjustable"
              color="extralight"
              className="w-full  md:h-16 md:text-lg"
              type="text"
              placeholder="*********"
              readOnly={true}
              visibility="visible"
            />
          </div>

          <div className="w-full h-1 bg-blackLine md:w-1 md:h-[32.5rem]"></div>
          {/* <div className="w-full border border-solid border-blackLine xl:h-[32.5rem] xl:w-0"></div> */}

          <div className="w-full flex flex-col md:w-1/2 gap-6">
            <div className="w-full flex items-center justify-between flex-row gap-5">
              <Input
                label="Endereço (rua)"
                name="rua"
                sizing="adjustable"
                color="extralight"
                className="w-full md:h-16 md:text-lg"
                type="text"
                placeholder="*********"
                readOnly={true}
                visibility="visible"
              />
              <Input
                label="Número"
                name="numero"
                sizing="xs"
                color="extralight"
                className="md:h-16 md:text-lg"
                type="text"
                placeholder="*********"
                readOnly={true}
                visibility="visible"
              />
            </div>
            <div className="w-full flex flex-col md:flex-row gap-5">
              <Input
                label="CEP"
                name="cep"
                sizing="adjustable"
                color="extralight"
                className="w-1/2 md:h-16 md:text-lg"
                type="text"
                placeholder="*********"
                readOnly={true}
              />
              <Input
                label="Bairro"
                name="bairro"
                sizing="adjustable"
                color="extralight"
                className="md:h-16 md:text-lg"
                type="text"
                placeholder="*********"
                readOnly={true}
              />
            </div>
            <h1 className="text-2xl text-white font-bold"> Meus veículos</h1>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Profile;
