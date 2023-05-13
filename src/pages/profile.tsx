import { useRef, useState } from "react";
import Button from "../components/button";
import WomanAvatar from "../assets/woman.png";
import Star from "../assets/star.png";
import Image from "next/image";
import Input from "../components/input/input";
import { Form } from "@unform/web";
import Carousel from "@/components/offerRide/carousel";
import Car from "../assets/sport-car.png";
import Text from "@/components/text";
import Trash from "../assets/trash.png";
import Plus from "../assets/plus-green.png";
import Edit from "../assets/edit.png";

function CarItems() {
  const items = [1, 2]
  return (
    <div className="w-full flex">
    {
      [1,2].map(item => (
        <div key={item} className="flex items-start justify-between md:h-48 pt-6 pl-8 w-full h-48 bg-white my-2 rounded-lg py-6 px-8">
        <div className="flex items-start justify-between mb-2">
          <div className="">
            <Image className="w-10 h-10" src={Car} alt="car" />
            <div className="flex w-full h-32 items-end">
              <div className="w-2 h-20 bg-orange"></div>
              <div className="w-2 h-24 bg-yellow"></div>
              <div className="w-2 h-28 bg-light-blue"></div>
            </div>
          </div>
          <div className="w-3/4 flex-col items-center justify-between space-y-4">
            <div className="flex items-center gap-12">
              <div className="space-y-2 text-center">
                <div className="bg-light-blue text-white px-4 py-2 rounded-md font-semibold ">
                  Modelo
                </div>
                <Text label="Corolla" color="gray" className="uppercase" />
              </div>
              <div className="space-y-2 text-center">
                <div className="bg-yellow text-white px-4 py-2 rounded-md font-semibold ">
                  Capacidade
                </div>
                <Text label="Até 3 pessoas" color="gray" className="uppercase" />
              </div>{" "}
            </div>
            <div className="flex items-end justify-between">
              <div className="w-20 space-y-2 text-center">
                <div className="bg-orange text-white px-4 py-2 rounded-md font-semibold ">
                  Placa
                </div>
                <Text label="XY4329" color="gray" />
              </div>{" "}
              <div className="flex items-center gap-4 mb-2">
                <Image className="w-6 h-6" src={Plus} alt="add button car" />
                <Image className="w-6 h-6" src={Edit} alt="edit button car" />
                <Image className="w-6 h-6" src={Trash} alt="delete button car" />
              </div>
            </div>
          </div>
        </div>
      </div>
      ))
    }
    </div>
  );
}

function Profile() {
  const [readOnly, setReadOnly] = useState(true);

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
        id: 1,
        capacidade: 3,
        placa: "1232xmp",
      },
      golf: {
        id: 2,
        capacidade: 3,
        placa: "122232xmp",
      },
    },
  };

  function handleSubmit() {}

  function editSubmit() {
    setReadOnly(prev => !prev);
  }

  return (
    <div className="w-full h-fit flex items-center justify-center mt-12">
      <Form
        className="bg-dark max-w-[99rem] rounded-2xl px-8 py-12 flex flex-col gap-6 md:max-w-[1258px] md:p-16 space-y-6 mx-10"
        onSubmit={handleSubmit}
        initialData={{
          ...response,
          ...response.endereco,
          ...response.veiculos,
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              className="w-12 h-12 md:w-24 md:h-24"
              src={WomanAvatar}
              alt="avatar"
            ></Image>
            <div className="flex gap-1">
              <h1 className="text-2xl font-bold text-white md:text-4xl mr-2">
                Olá, Joana
              </h1>
              <div className="flex items-center gap-2 pt-2">
                <Image className="w-3 h-3" src={Star} alt="estrela" />
                <span className="text-gray text-[0.725rem]">5.0</span>
              </div>
            </div>
          </div>
          {/* <Button label="Salvar" onClick={editSubmit} size="md" color="green" shape="square" /> */}
        </div>

        <div className="w-full flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-5/12 space-y-4">
            <Input
              label="Nome Completo"
              name="name"
              sizing="adjustable"
              color="extralight"
              className="w-full md:h-16 md:text-lg"
              type="text"
              placeholder="Exemplo Alves"
              readOnly={readOnly}
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
              readOnly={readOnly}
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
              readOnly={readOnly}
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
              readOnly={readOnly}
              visibility="visible"
            />
          </div>

          <div className="w-full h-1 bg-blackLine md:w-1 md:h-[32.5rem]"></div>
          {/* <div className="w-full border border-solid border-blackLine xl:h-[32.5rem] xl:w-0"></div> */}

          <div className="w-full flex flex-col md:w-1/2 gap-4">
            <div className="w-full flex items-center justify-between flex-row gap-5">
              <div className="w-full">
                <Input
                  label="Endereço (rua)"
                  name="rua"
                  sizing="adjustable"
                  color="extralight"
                  className="w-full md:h-16 md:text-lg"
                  type="text"
                  placeholder="*********"
                  readOnly={readOnly}
                  visibility="visible"
                />
              </div>
              <Input
                label="Número"
                name="numero"
                sizing="xs"
                color="extralight"
                className="md:h-16 md:text-lg"
                type="text"
                placeholder="*********"
                readOnly={readOnly}
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
                readOnly={readOnly}
              />
              <div className="w-full">
              <Input
                label="Bairro"
                name="bairro"
                sizing="adjustable"
                color="extralight"
                className="md:h-16 md:text-lg"
                type="text"
                placeholder="*********"
                readOnly={readOnly}
              />
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center">           
              <h1 className="text-2xl text-white font-bold mb-2">Meus veículos</h1>
              <Carousel profile />
            </div> 
            {/* <Carousel profile={true}/> */}
            <div className="flex gap-7">
                <Button label="Alterar senha" onClick={() => {}} size="base" color="light-blue" shape="square" className="uppercase" />
                <Button label={`${readOnly ? "Editar" : "Salvar"}`} onClick={editSubmit} size="base" color={`${readOnly ? "yellow" : "green"}`} shape="square" className="uppercase" />
            </div> 
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Profile;
