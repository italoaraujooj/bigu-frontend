import Modal from "@/components/modal";
import Notification from "@/components/notification";
import Carousel from "@/components/profile/carousel";
import Text from "@/components/text";
import { AuthContext } from "@/context/AuthContext";
import { changePasswordRequest, getUser, profilePicture } from "@/services/auth";
import { createCar, getUserCars } from "@/services/car";
import { ChangePassword, CreateCarFormState } from "@/utils/types";
// import { ArrowCircleLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { deleteCar } from "@/services/car";
import { CarResponseDTO } from "@/types/ride";
import { ArrowCircleLeft } from "@phosphor-icons/react/dist/ssr/ArrowCircleLeft";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Star from "../assets/star.png";
import WomanAvatar from "../assets/woman.png";
import Button from "../components/button";
import Input from "../components/input/input";
import Homem from "../assets/avatar.png"
import Radio from "@/components/radio";

function Profile() {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);
  const formRefCar = useRef<FormHandles>(null);
  const formRefChangePassword = useRef<FormHandles>(null);
  
  const { user, setUser } = useContext(AuthContext);

  const [readOnly, setReadOnly] = useState(true);
  const [changePassword, setChangePassord] = useState(false);
  const [modalCar, setModalCar] = useState(false);
  const [cars, setCars] = useState<CarResponseDTO[]>([]);
  const [hoveredImage, setHoveredImage] = useState(false);
  const [modalRemoveCar, setModalRemoveCar] = useState(false);
  const [carToRemove, setCarToRemove] = useState<string | null>(null);

  const toggleModalCar = () => setModalCar((prev) => !prev);
  const toggleModalRemoveCar = (id: string | null) => {
    setCarToRemove(id);
    setModalRemoveCar((prev) => !prev);
  };
  const handleOpenChangePassword = () => setChangePassord(true);
  const handleCloseChangePassword = () => setChangePassord(false);

  function editSubmit() {
    setReadOnly((prev) => !prev);
  }

  useEffect(() => {
    const loadCars = async () => {
      const responseCars: any = await getUserCars();
      if (Array.isArray(responseCars.data.userVehicles)) {
        setCars(responseCars.data.userVehicles);
      } else {
        console.error("Erro: userCars não é um array", responseCars.data.userVehicles);
      }
    };
    loadCars();
    console.log(cars);
  }, []);

  const handleCreateCar: SubmitHandler<CreateCarFormState> = async (data) => {
    try {
      const payload = {
        ...data, 
        avgConsumption: Number(data.avgConsumption),
        type: data.type.toLocaleUpperCase(),
      };
      const response: any = await createCar(payload);
      if (response.status === 201) {
        setCars([...cars, response.data.newCar]);
        toast.success(response.data.message);
        toggleModalCar();
      }
    } catch (err) {
      console.log(err);
      toast.error("Houve um erro na criação do carro");
    }
  };

  const handleDeleteCar = async (id: string): Promise<void> => {
    try {
      const response: any = await deleteCar(id);
      if (response?.status === 200) {
        const previousCars = cars;
        const currentCars = previousCars.filter(
          (car: CarResponseDTO) => car.vehicleId !== id
        );
        setCars(currentCars);
        toggleModalRemoveCar(null)
        toast.success(`O carro foi removido.`);
      }
    } catch (err) {
      toast.error("Houve um erro na remoção do carro");
    }
  };

  const handleChangePassword: SubmitHandler<ChangePassword> = async (data) => {
    try {
      const response: any = await changePasswordRequest(data);
      if (response.status === 200) {
        toast.success("A senha foi alterada com sucesso");
        handleCloseChangePassword();
      }
    } catch (err) {
      toast.error("Houve um erro na alteração da senha");
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    const files = event.target.files;
    if (files && files.length > 0) {
      file = files[0];
    }
  
    if (!file) {
      toast.error('Nenhum arquivo foi selecionado');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response: any = await profilePicture(formData);
      if (response && response.status == 201) {
        const userResponse = await getUser();
        setUser(userResponse.data.user);
        toast.success('Imagem atualizada com sucesso');
      }
    } catch (error) {
      toast.error('Erro ao enviar a imagem');
    }
  };

  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className="flex w-full items-center justify-center my-8">
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
            className="bg-dark max-w-[360px] p-4 rounded-2xl flex flex-col gap-6 sm:max-w-xl md:max-w-3xl md:p-16 space-y-6 lg:max-w-4xl xl:max-w-4xl"
            onSubmit={() => {}}
            initialData={{
              name: user?.name,
              email: user?.email,
              telephone: user?.phoneNumber,
              matricula: user?.matricula
            }}
            ref={formRef}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredImage(true)}
                  onMouseLeave={() => setHoveredImage(false)}
                >
                  {user?.sex === "Feminino" ?
                  <Image
                    onClick={() => router.push("/profile")}
                    className={`w-12 h-12 md:w-24 md:h-24 object-cover rounded-full transition duration-300 ${
                      hoveredImage ? "blur-sm" : ""
                    }`}
                    src={WomanAvatar}
                    alt="foto"
                  />
                  :
                  <Image
                    onClick={() => router.push("/profile")}
                    className={`w-12 h-12 md:w-24 md:h-24 object-cover rounded-full transition duration-300 ${
                      hoveredImage ? "blur-sm" : ""
                    }`}
                    src={Homem}
                    alt="foto"
                  />
                  }
                  {hoveredImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800/70 rounded-full">
                      <label
                        title="Click to upload"
                        className="cursor-pointer flex items-center gap-4 px-6 py-4 relative"
                      >
                        <img
                          className="w-12"
                          src="https://www.svgrepo.com/show/357902/image-upload.svg"
                          alt="file upload icon"
                          width="512"
                          height="512"
                        />
                        <Input
                          name="foto"
                          className="w-full md:h-16 md:text-lg hidden"
                          type="file"
                          sizing="xs"
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex gap-1 items-center">
                  <h1 className="text-xl font-bold text-white md:text-4xl mr-2 font-[Poppins]">
                    {`Olá, ${user?.name.split(" ")[0]}`}
                  </h1>
                  <div className="flex items-center gap-2 pt-2">
                    <Image className="w-3 h-3" src={Star} alt="estrela" />
                    <span className="text-gray text-[0.725rem] pt-1">{user ? user.avgScore.toFixed(1) : 0.0}</span>
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
                  value={user?.name}
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
                  <Link
                    className="w-full py-1 cursor-pointer group"
                    href="/addresses"
                  >
                    <div className="flex items-center justify-between">
                      <Text
                        label="Ver endereços"
                        size="md"
                        weight="bold"
                        className="uppercase"
                      />
                      <CaretRight weight="bold" color="white" />
                    </div>
                    <div className="w-full h-1 bg-gray mt-4 rounded-sm group-hover:bg-yellow transition ease-in-out duration-300" />
                  </Link>
                </div>
                <div className="w-full flex flex-col justify-center">
                  <h1 className="text-2xl text-white font-bold mb-2 font-[Poppins]">
                    Meus veículos
                  </h1>
                  <Carousel
                    profile
                    add={toggleModalCar}
                    remove={toggleModalRemoveCar}
                    items={cars}
                  />
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
            <Modal isOpen={modalCar} onClose={toggleModalCar} noActions>
              <Text
                label="Adicionar veículo"
                color="dark"
                size="lg"
                weight="bold"
              />
              <Form
                onSubmit={handleCreateCar}
                ref={formRefCar}
                className="space-y-2"
              >
                <br />
                <Text
                  label="TIPO DE VEICULO"
                  color="#616161"
                  size="md"
                  weight="bold"
                />
                <Radio
                name="type"
                options={[
                  { id: "CAR", label: "Carro" },
                  { id: "MOTORCYCLE", label: "Motocicleta" },
                ]}
                onChange={(value: string) => setSelectedValue(value)}
                />
                <Input
                  name="brand"
                  label="Marca"
                  placeholder="Chevrolet"
                  sizing="adjustable"
                  color="extralight"
                />
                <Input
                  name="vehicleModel"
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
                  name="avgConsumption"
                  label="Consumo médio (km/l)"
                  placeholder="16"
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
                    size="xs"
                    className="uppercase font-semibold px-3 sm:w-48 sm:h-12 sm:px-8 sm:text-sm lg:px-6"
                    color="red"
                    onClick={toggleModalCar}
                  />
                  <Button
                    label="Confirmar"
                    size="xs"
                    className="uppercase font-semibold px-3 sm:w-48 sm:h-12 sm:px-8 sm:text-sm lg:px-6"
                    color="green"
                    type="submit"
                  />
                </section>
              </Form>
            </Modal>
            <Modal isOpen={modalRemoveCar} onClose={() => toggleModalRemoveCar(null)} noActions>
              <Text
                label="Tem certeza que deseja remover esse carro?"
                color="dark"
                size="lg"
                weight="bold"
                className="text-lg"
              />
              <section className="flex items-center gap-4 mt-12">
                <Button
                  label="Cancelar"
                  size="xs"
                  className="uppercase font-semibold px-3 sm:w-48 sm:h-12 sm:px-8 sm:text-sm lg:px-6"
                  color="red"
                  onClick={() => toggleModalRemoveCar(null)}
                />
                <Button
                  label="Confirmar"
                  size="xs"
                  className="uppercase font-semibold px-3 sm:w-48 sm:h-12 sm:px-8 sm:text-sm lg:px-6"
                  color="green"
                  onClick={() => handleDeleteCar(carToRemove as string)}
                />
              </section>
            </Modal>
          </Form>
        </div>
      </div>
      {
        <Modal
          isOpen={changePassword}
          onClose={handleCloseChangePassword}
          noActions
        >
          <Form onSubmit={handleChangePassword} ref={formRefChangePassword}>
            <div className=" bg-white rounded-lg p-3 flex flex-col gap-4 justify-center items-center">
              <h2 className="text-2xl font-semibold font-[Poppins]">
                Alterar senha
              </h2>
              <Input
                label="Senha atual: "
                name="actualPassword"
                sizing="adjustable"
                color="extralight"
                className="sm:w-72 md:h-16 md:text-lg"
                type="password"
                placeholder="*********"
              />

              <Input
                label="Nova senha: "
                name="newPassword"
                sizing="adjustable"
                color="extralight"
                className="sm:w-72 md:h-16 md:text-lg"
                type="password"
                placeholder="*********"
              />
              <Input
                label="Confirmar senha: "
                name="newPasswordConfirmation"
                sizing="adjustable"
                color="extralight"
                className="sm:w-72 md:h-16 md:text-lg"
                type="password"
                placeholder="*********"
              />
              <p
                className=" text-gray cursor-pointer font-[Poppins]"
                onClick={() => {
                  Router.push("/recover-password");
                }}
              >
                Esqueci minha senha
              </p>
              <section className="flex items-center gap-4 mt-12">
                <Button
                  label="Cancelar"
                  size="xs"
                  className="uppercase font-semibold px-3 lg:px-6"
                  color="red"
                  onClick={handleCloseChangePassword}
                />
                <Button
                  label="Confirmar"
                  size="xs"
                  className="uppercase font-semibold px-3 lg:px-6"
                  color="green"
                  type="submit"
                />
              </section>
            </div>
          </Form>
        </Modal>
      }
      <Notification />
    </div>
  );
}

export default Profile;
