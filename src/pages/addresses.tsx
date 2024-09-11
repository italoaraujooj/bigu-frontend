import { Button, Input, Modal, Text } from "@/components";
import {
  createAddress,
  deleteAddress,
  fetchUserAddresses,
} from "@/services/address";
import { Address, AddressFormState } from "@/utils/types";
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
import { toast } from "react-toastify";

type Props = {};

function Addresses({}: Props) {
  const formRef = React.useRef<FormHandles>(null);
  const router = useRouter();
  const [userAddress, setUserAddresses] = React.useState<Address[]>([]);
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
    const responsePost = await createAddress(data);
    if(responsePost?.status === 201){
      toast.success(`O endereço '${data.nome}' foi cadastrado.`)
      const responseGet = await fetchUserAddresses();
      setUserAddresses(responseGet?.data)
    }
    toggleModalAddress();
  };

  const handleDeleteAddress = async (address: Address) => {
    const responseDelete = await deleteAddress(address._id);
    if(responseDelete?.status === 200){
      toast.success(`O endereço '${address.nome}' foi removido.`)
    }
    const responseGet = await fetchUserAddresses();
      setUserAddresses(responseGet?.data)
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
              {userAddress?.map((address: Address, index: number) => (
                <div key={index}>
                  <div className="w-full flex items-center bg-white py-6 px-4 justify-between rounded-md">
                    <div className="flex items-center gap-2">
                      <MapPin weight="bold" color="gray" size={24} />
                      <Text
                        label={`${address.rua}, ${address.numero}, ${address.bairro}`}
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
                        onClick={() => handleDeleteAddress(address)}
                        size={24}
                      />
                    </div>
                  </div>
                </div>
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
        noActions
      >
        <Form
          onSubmit={handleCreateAddress}
          ref={formRef}
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
            name="nome"
            label="Nome"
            placeholder="Casa"
            sizing="adjustable"
          />
          <Input
            name="cep"
            label="CEP"
            placeholder="58432-777"
            sizing="adjustable"
          />
          <Input
            name="cidade"
            label="Cidade"
            placeholder="Campina Grande"
            sizing="adjustable"
          />
          <Input
            name="rua"
            label="Rua"
            placeholder="Rua exemplo"
            sizing="adjustable"
          />
          <Input
            name="bairro"
            label="Bairro"
            placeholder="Prata"
            sizing="adjustable"
          />
          <Input
            name="numero"
            label="Número"
            placeholder="312"
            sizing="adjustable"
          />
          <Input
            name="estado"
            label="Estado"
            placeholder="PB"
            sizing="adjustable"
          />
          <Input
            name="complemento"
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
