import { Button, Input, Modal, Text } from "@/components";
import {
  createAddress,
  deleteAddress,
  fetchUserAddresses,
} from "@/services/address";
import { AddressFormState } from "@/utils/types";
import {
  ArrowCircleLeft,
  MapPin,
  PencilSimple,
  Trash,
  TrashSimple,
} from "@phosphor-icons/react";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

function Addresses({}: Props) {
  const formRef = React.useRef<FormHandles>(null);
  const router = useRouter();
  const [userAddress, setUserAddresses] = React.useState([]);
  const [modalAddress, setModalAddress] = React.useState(false);
  const [addressSelected, setAddressSelected] = React.useState(
    null as any as Number
  );

  const toggleModalAddress = (id?: number) => {
    if (id) {
      setAddressSelected(id);
    }
    setModalAddress((prev) => !prev);
  };

  React.useEffect(() => {
    fetchUserAddresses().then((data) => {
      setUserAddresses(data?.data);
    });
  }, []);

  const handleCreateAddress: SubmitHandler<AddressFormState> = async (data) => {
    const response = await createAddress(data);

    fetchUserAddresses().then((data) => {
      setUserAddresses(data?.data);
    });

    toggleModalAddress();
  };

  const handleDeleteAddress = async (id: number) => {
    await deleteAddress(id);
    fetchUserAddresses().then((data) => {
      setUserAddresses(data?.data);
    });
  };

  const redirect = () =>
    router.push({
      pathname: "dashboard",
      query: { needUpdate: true },
    });

  return (
    <div className="flex w-full items-center justify-center my-12">
      <div
        className="
"
      >
        <div>
          <button
            onClick={redirect}
            className="text-gray flex items-center gap-2 mb-4"
          >
            <ArrowCircleLeft size={32} />
            <Text
              label="Voltar para tela inicial"
              className=" cursor-pointer hover:text-stone-400 "
              color="gray"
              size="xl"
            />
          </button>
        </div>
        <div className="w-full h-fit flex items-center justify-center">
          <div className="w-[700px] bg-dark max-w-xs rounded-2xl px-6 py-8 flex flex-col sm:max-w-xl md:max-w-3xl md:p-16 space-y-6 lg:max-w-4xl xl:max-w-4xl">
            <Text
              label="Meus endereços"
              color="gray"
              size="xl"
              weight="bold"
              className="uppercase"
            />
            <div className="w-full h-56 space-y-4">
              {!userAddress?.length && (
                <Text label="Você ainda não possui endereços cadastrados." />
              )}
              {userAddress?.map((address) => (
                <>
                  <div className="w-full flex items-center bg-white py-6 px-4 justify-between rounded-md">
                    <div className="flex items-center gap-2">
                      <MapPin weight="bold" color="gray" size={24} />
                      <Text
                        label={`${address?.street}, ${address?.number}, ${address?.district}`}
                        color="gray"
                        size="md"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <PencilSimple
                        color="#FFB400"
                        weight="bold"
                        className="cursor-pointer"
                        size={24}
                      />
                      <TrashSimple
                        color="#dd5035"
                        weight="bold"
                        className="cursor-pointer"
                        onClick={() => handleDeleteAddress(address?.id)}
                        size={24}
                      />
                    </div>
                  </div>
                </>
              ))}
            </div>
            <Button
              label="Adicionar endereço"
              size="base"
              color="green"
              className="uppercase font-semibold px-3 lg:px-6 text-xs self-end"
              onClick={toggleModalAddress}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalAddress}
        onClose={toggleModalAddress}
        // onSubmit={handleCreateCar}
        noActions
      >
        <Form
          onSubmit={handleCreateAddress}
          ref={formRef}
          // initialData={
          //   {
          //     "nickname": "Casa",
          //     "postalCode": "string",
          //     "state": "PB",
          //     "city": "Campina Grande",
          //     "district": "Centro",
          //     "street": "Rua Exemplo",
          //     "number": "123",
          //     "complement": "Complemento"
          //   }
          // }
          className="py-12 space-y-2 h-screen overflow-y-scroll	"
        >
          <Text
            label="Adicionar endereço"
            color="dark"
            size="lg"
            weight="bold"
          />

          <br />
          <Input
            name="nickname"
            label="Nome"
            placeholder="Casa"
            sizing="adjustable"
          />
          <Input
            name="postalCode"
            label="CEP"
            placeholder="58432-777"
            sizing="adjustable"
          />
          <Input
            name="city"
            label="Cidade"
            placeholder="Campina Grande"
            sizing="adjustable"
          />
          <Input
            name="street"
            label="Rua"
            placeholder="Rua exemplo"
            sizing="adjustable"
          />
          <Input
            name="district"
            label="Bairro"
            placeholder="Prata"
            sizing="adjustable"
          />
          <Input
            name="number"
            label="Número"
            placeholder="312"
            sizing="adjustable"
          />
          <Input
            name="state"
            label="Estado"
            placeholder="PB"
            sizing="adjustable"
          />
          <Input
            name="complement"
            label="Complemento"
            placeholder="-"
            sizing="adjustable"
          />
          <section className="flex items-center gap-4 mt-12">
            <Button
              label="Cancelar"
              size="sm"
              className="uppercase font-semibold px-3 lg:px-6"
              color="red"
              onClick={toggleModalAddress}
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
    </div>
  );
}

export default Addresses;
