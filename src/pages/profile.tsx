import { useContext, useEffect, useRef, useState } from "react";
import Button from "../components/button";
import WomanAvatar from "../assets/woman.png";
import Star from "../assets/star.png";
import Image from "next/image";
import Input from "../components/input/input";
import { Form } from "@unform/web";
import Carousel from "@/components/profile/carousel";
import Car from "../assets/sport-car.png";
import Text from "@/components/text";
import Trash from "../assets/trash.png";
import Plus from "../assets/plus-green.png";
import Edit from "../assets/edit.png";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import Router from "next/router";
import withPrivateRoute from "@/routes/PrivateRoute";
import { ArrowCircleLeft, ArrowRight, CaretRight } from "@phosphor-icons/react";
import Modal from "@/components/modal";
import { changePasswordRequest, getUser } from "@/services/auth";
import { createCar } from "@/services/car";
import { FormHandles, SubmitHandler } from "@unform/core";
import { ChangePassword, CreateCarFormState } from "@/utils/types";
import NotificationContext from "@/context/NotificationContext";
import Notification from "@/components/notification";
import React from "react";
import { RideContext } from "@/context/RideContext";
import { toast } from "react-toastify";

function Profile() {
  const formRef = useRef<FormHandles>(null);
  const formRefCar = useRef<FormHandles>(null);
  const formRefChangePassword = useRef<FormHandles>(null);

  // const {notificationHandler, showNotification} = useContext(NotificationContext)
  
  const { user, isAuthenticated, setUser } = useContext(AuthContext);
  const { cars, setCars } = useContext(RideContext);

  const [readOnly, setReadOnly] = useState(true);
  const [changePassword, setChangePassord] = useState(false);
  const [save, setSave] = useState(false);
  const [modalCar, setModalCar] = useState(false);

  const [needUpdate, setNeedUpdate] = React.useState(false);
  const toggleNeedUpdate = () => setNeedUpdate(prev => !prev);

  const toggleModalCar = () => setModalCar((prev) => !prev);
  const handleOpenChangePassword = () => setChangePassord(true);
  const handleCloseChangePassword = () => setChangePassord(false);

  const handleOpenSave = () => setSave(true);
  const handleCloseSave = () => setSave(false);

  function editSubmit() {
    setReadOnly((prev) => !prev);
  }

  const handleCreateCar: SubmitHandler<CreateCarFormState> = async (data) => {
    try{
      const response: any = await createCar(data);
      if(response.status === 200){
        setCars([...cars, response.data])
        toggleNeedUpdate();
        // handleCreateCarNotification("success", "O carro foi criado com sucesso");
        toast.success("Carro criado com sucesso!");
        toggleModalCar();

      }
    }catch(err){
      toast.error("Houve um erro na criação do carro");
    }
  };

  const handleCreateCarNotification = (type:string, message: string) => {
    toggleModalCar();
    notificationHandler(type, message)
  };
  
  const handleChangePassword: SubmitHandler<ChangePassword> = async (data) => {
    try{
      const response: any = await changePasswordRequest(data);
      if(response.status === 200){
        handleChangePasswordNotification("success", "A senha foi alterada com sucesso")
      }
    }catch(err){
      handleChangePasswordNotification("fail", "Houve um erro na alteração da senha")
    }
  };
  
  const handleChangePasswordNotification = (type: string, message: string) => {
    handleCloseChangePassword();
    notificationHandler(type, message)
  }

  return (
    <div className="flex w-full items-center justify-center my-12">
      <div>
        <div>
          <Link
            href="/dashboard"
            className="text-gray flex items-center gap-2 mb-4"
          >
            <ArrowCircleLeft size={32} />
            <Text
              label="Voltar para tela inicial"
              className=" cursor-pointer hover:text-stone-400 "
              color="gray"
              size="xl"
            />
          </Link>
        </div>
        <div className="w-full h-fit flex items-center justify-center">
          <Form
            className="bg-dark max-w-xs rounded-2xl px-8 py-12 flex flex-col gap-6 sm:max-w-xl md:max-w-3xl md:p-16 space-y-6 lg:max-w-4xl xl:max-w-4xl"
            onSubmit={handleOpenSave}
            initialData={{
              name: user?.fullName,
              email: user?.email,
              telephone: user?.phoneNumber,
            }}

            ref={formRef}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image
                  className="w-12 h-12 md:w-24 md:h-24"
                  src={WomanAvatar}
                  alt="avatar"
                ></Image>
                <div className="flex gap-1">
                  <h1 className="text-xl font-bold text-white md:text-4xl mr-2 font-[Poppins]">
                    {`Olá, ${user?.fullName.split(" ")[0]}`}
                  </h1>
                  <div className="flex items-center gap-2 pt-2">
                    <Image className="w-3 h-3" src={Star} alt="estrela" />
                    <span className="text-gray text-[0.725rem]">5.0</span>
                  </div>
                </div>
              </div>
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
                  value={user?.fullname}
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
                  placeholder="(83) 9 9999-9999"
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
                  placeholder="120110432"
                  readOnly={readOnly}
                  visibility="visible"
                />
              </div>

              <div className="w-full h-1 bg-blackLine md:w-1 md:h-[32.5rem]"></div>

              <div className="w-full flex flex-col md:w-1/2 gap-4">
                <div className="w-full flex items-center justify-between flex-row gap-5">
                  <Link className="w-full py-1 cursor-pointer group" href='/addresses'>
                    <div className="flex items-center justify-between">
                      <Text label="Ver endereços" size="md" weight="bold" className="uppercase"/>
                      <CaretRight weight="bold" color="white" /> 
                    </div>
                    <div className="w-full h-1 bg-gray mt-4 rounded-sm group-hover:bg-yellow transition ease-in-out duration-300" />
                  </Link>
                </div>
                <div className="w-full flex flex-col justify-center">
                  <h1 className="text-2xl text-white font-bold mb-2 font-[Poppins]">
                    Meus veículos
                  </h1>
                  <Carousel profile add={toggleModalCar} needUpdate={needUpdate} toggleNeedUpdate={toggleNeedUpdate}/>
                </div>
                <div className="flex gap-7">
                  <Button
                    label="Alterar senha"
                    onClick={handleOpenChangePassword}
                    size="base"
                    color="light-blue"
                    shape="square"
                    className="uppercase"
                  />
                  <Button
                    label={`${readOnly ? "Editar" : "Salvar"}`}
                    onClick={editSubmit}
                    size="base"
                    color={`${readOnly ? "yellow" : "green"}`}
                    shape="square"
                    className="uppercase"
                    type={`${readOnly ? "submit" : "button"}`}
                  />
                </div>
              </div>
            </div>
            <Modal
              isOpen={modalCar}
              onClose={toggleModalCar}
              noActions
            >
                <Text label="Adicionar carro" color="dark" size="lg" weight="bold" />
              <Form onSubmit={handleCreateCar} ref={formRefCar} className="space-y-2">
                <br />
                <Input
                  name="brand"
                  label="Marca"
                  placeholder="Chevrolet"
                  sizing="adjustable"
                  color="extralight"
                />
                <Input
                  name="model"
                  label="Modelo"
                  placeholder="Onix"
                  sizing="adjustable"
                  color="extralight"
                />
                <Input
                  name="modelYear"
                  label="Ano"
                  placeholder="2023"
                  sizing="adjustable"
                  color="extralight"
                />
                <Input
                  name="color"
                  label="Cor"
                  placeholder="Prata"
                  sizing="adjustable"
                  color="extralight"
                />
                <Input
                  name="plate"
                  label="Placa"
                  placeholder="XKG432"
                  sizing="adjustable"
                  color="extralight"
                />
                <section className="flex items-center gap-4 mt-12">
                  <Button
                    label="Cancelar"
                    size="sm"
                    className="uppercase font-semibold px-3 lg:px-6"
                    color="red"
                    onClick={toggleModalCar}
                  />
                  <Button
                    label="Confirmar"
                    size="sm"
                    className="uppercase font-semibold px-3 lg:px-6"
                    color="green"
                    type="submit"
                  />
                </section>
              </Form>
            </Modal>
            {/* {save && (
              <Modal isOpen={save} onClose={handleCloseSave}>
                <form>
                  <div className=" bg-white rounded-lg p-3 flex flex-col gap-4 justify-center items-center">
                    <h2 className=" text-2xl font-semibold">
                      Confirmar modificações
                    </h2>
                    <div className="flex gap-2">
                      <Button
                        label="Cancelar"
                        size="base"
                        className="uppercase font-semibold px-3 lg:px-6"
                        color="red"
                        onClick={handleCloseSave}
                      />
                      <Button
                        label="Confirmar"
                        size="base"
                        className="uppercase font-semibold px-3 lg:px-6"
                        color="green"
                        type="submit"
                      />
                    </div>
                  </div>
                </form>
              </Modal>
            )} */}
          </Form>
        </div>
      </div>
      {(
        <Modal
          isOpen={changePassword}
          onClose={handleCloseChangePassword}
          noActions
        >
          <Form onSubmit={handleChangePassword} ref={formRefChangePassword}>
            <div className=" bg-white rounded-lg p-3 flex flex-col gap-4 justify-center items-center">
              <h2 className=" text-2xl font-semibold">Alterar senha</h2>
              <Input
                label="Senha atual: "
                name="actualPassword"
                sizing="sm"
                color="extralight"
                className="md:h-16 md:text-lg"
                type="password"
                placeholder="*********"
              />

              <Input
                label="Nova senha: "
                name="newPassword"
                sizing="sm"
                color="extralight"
                className="md:h-16 md:text-lg"
                type="password"
                placeholder="*********"
              />
              <Input
                label="Confirmar senha: "
                name="newPasswordConfirmation"
                sizing="sm"
                color="extralight"
                className="md:h-16 md:text-lg"
                type="password"
                placeholder="*********"
              />
              <p
                className=" text-gray cursor-pointer"
                onClick={() => {
                  Router.push("/recover-password");
                }}
              >
                Esqueci minha senha
              </p>
              <section className="flex items-center gap-4 mt-12">
                  <Button
                    label="Cancelar"
                    size="sm"
                    className="uppercase font-semibold px-3 lg:px-6"
                    color="red"
                    onClick={handleCloseChangePassword}
                  />
                  <Button
                    label="Confirmar"
                    size="sm"
                    className="uppercase font-semibold px-3 lg:px-6"
                    color="green"
                    type="submit"
                  />
                </section>
            </div>
          </Form>
        </Modal>
      )}
      <Notification/>
    </div>
  );
}

export default Profile;
