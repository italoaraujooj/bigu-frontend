import { Button, Input, Modal, Text, Dropdown } from "@/components";
import {
  createAddress,
  deleteAddress,
  editAddress,
  fetchUserAddresses,
} from "@/services/address";
import { AddressResponseDTO } from "@/types/types";
import { Address, AddressFormState } from "@/utils/types";
// import {
//   ArrowCircleLeft,
//   MapPin,
//   PencilSimple,
//   TrashSimple,
// } from "@phosphor-icons/react/dist/ssr";
import { ArrowCircleLeft } from "@phosphor-icons/react/dist/ssr/ArrowCircleLeft";
import { MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";
import { PencilSimple } from "@phosphor-icons/react/dist/ssr/PencilSimple";
import { TrashSimple } from "@phosphor-icons/react/dist/ssr/TrashSimple";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

interface DropdownOption {
  label: string;
  value: string;
}

const ESTADOS: DropdownOption[] = [
  { label: "AC", value: "AC" },
  { label: "AL", value: "AL" },
  { label: "AP", value: "AP" },
  { label: "AM", value: "AM" },
  { label: "BA", value: "BA" },
  { label: "CE", value: "CE" },
  { label: "DF", value: "DF" },
  { label: "ES", value: "ES" },
  { label: "GO", value: "GO" },
  { label: "MA", value: "MA" },
  { label: "MT", value: "MT" },
  { label: "MS", value: "MS" },
  { label: "MG", value: "MG" },
  { label: "PA", value: "PA" },
  { label: "PB", value: "PB" },
  { label: "PR", value: "PR" },
  { label: "PE", value: "PE" },
  { label: "PI", value: "PI" },
  { label: "RJ", value: "RJ" },
  { label: "RN", value: "RN" },
  { label: "RS", value: "RS" },
  { label: "RO", value: "RO" },
  { label: "RR", value: "RR" },
  { label: "SC", value: "SC" },
  { label: "SP", value: "SP" },
  { label: "SE", value: "SE" },
  { label: "TO", value: "TO" },
];

function Addresses() {
  const formRef = React.useRef<FormHandles>(null);
  const formRefEdit = React.useRef<FormHandles>(null);
  const router = useRouter();
  const [userAddress, setUserAddresses] = React.useState<Address[]>([]);
  const [modalAddress, setModalAddress] = React.useState(false);
  const [modalEditAddress, setModalEditAddress] = React.useState(false);
  const [addressSelected, setAddressSelected] = React.useState(null as any);
  const [stateSelected, setStateSelected] = React.useState(
    {} as DropdownOption
  );

  const toggleModalEditAddress = (address?: AddressResponseDTO) => {
    setAddressSelected(address);

    setModalEditAddress((prev) => !prev);
  };

  const toggleModalAddress = (id?: number) => {
    if (id) {
      setAddressSelected(id);
    }
    setModalAddress((prev) => !prev);
  };

  React.useEffect(() => {
    fetchUserAddresses().then((data) => {
      setUserAddresses(data?.data.userAddress);
    });
  }, []);

  const handleCreateAddress: SubmitHandler<AddressFormState> = async (data) => {
    const payload = { ...data, estado: stateSelected.value };
    const responsePost = await createAddress(payload);
    if (responsePost?.status === 201) {
      toast.success(`O endereço '${data.nome}' foi cadastrado.`);
      const responseGet = await fetchUserAddresses();
      setUserAddresses(responseGet?.data.userAddress);
    }
    toggleModalAddress();
  };

  const handleEditAddress: SubmitHandler<AddressFormState> = async (data) => {
    const payload = { ...data, estado: stateSelected.value };
    const responsePost = await editAddress(payload, addressSelected.addressId);
    if (responsePost?.status === 200) {
      toast.success(`O endereço '${data.nome}' foi editado.`);
      const responseGet = await fetchUserAddresses();
      setUserAddresses(responseGet?.data.userAddress);
    }
    toggleModalEditAddress();
  };

  const handleDeleteAddress = async (address: Address) => {
    const responseDelete = await deleteAddress(address.addressId);
    if (responseDelete?.status === 200) {
      toast.success(`O endereço '${address.nome}' foi removido.`);
    }
    const responseGet = await fetchUserAddresses();
    setUserAddresses(responseGet?.data.userAddress);
  };

  const redirect = () => router.push("/dashboard");

  const fetchViaCep = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data?.erro) {
        toast.error("CEP não encontrado.");
        return null;
      }
      return data;
    } catch (error) {
      toast.error("Erro ao buscar endereço.");
      return null;
    }
  };

  return (
    <div className="flex w-full items-center justify-center flex-col py-8 px-4">
      <div>
        <button
          onClick={redirect}
          className="text-gray flex items-center gap-2 mb-4"
        >
          {/* @ts-ignore */}
          <ArrowCircleLeft size={32} />
          {/* @ts-ignore */}
          <Text
            label="Voltar para tela inicial"
            className=" cursor-pointer hover:text-stone-400 "
            color="gray"
            size="xl"
          />
        </button>
      </div>
      <div className="w-full h-fit flex items-center justify-center">
        <div className="bg-dark w-full rounded-2xl px-4 py-6 flex flex-col sm:max-w-xl md:max-w-3xl md:p-16 space-y-6 lg:max-w-4xl xl:max-w-4xl">
          {/* @ts-ignore */}
          <Text
            label="Meus endereços"
            color="gray"
            size="xl"
            weight="bold"
            className="uppercase"
          />
          <div className="w-full h-56 space-y-4">
            {!userAddress?.length && (
              // @ts-ignore
              <Text label="Você ainda não possui endereços cadastrados." />
            )}
            {userAddress?.map((address: Address, index: number) => (
              <div key={index}>
                <div className="w-full flex items-center bg-white py-4 px-2 justify-between rounded-md">
                  <div className="flex items-center gap-2">
                    {/* @ts-ignore */}
                    <MapPin weight="bold" color="gray" size={24} />
                    {/* @ts-ignore */}
                    <Text
                      label={`${address.rua}, ${address.numero}, ${address.bairro}`}
                      color="gray"
                      size="md"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    {/* @ts-ignore */}
                    <PencilSimple
                      color="#FFB400"
                      weight="bold"
                      className="cursor-pointer"
                      size={24}
                      onClick={() => toggleModalEditAddress(address)}
                    />
                    {/* @ts-ignore */}
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
          {/* @ts-ignore */}
          <Button
            label="Adicionar endereço"
            size="base"
            color="green"
            className="uppercase font-semibold px-3 lg:px-6 text-xs self-end"
            // @ts-ignore
            onClick={toggleModalAddress}
          />
        </div>
      </div>
      {/* @ts-ignore */}
      <Modal isOpen={modalAddress} onClose={toggleModalAddress} noActions>
        {/* @ts-ignore */}
        <Form
          onSubmit={handleCreateAddress}
          ref={formRef}
          className="py-12 space-y-2 max-h-[80vh] overflow-y-auto"
        >
          {/* @ts-ignore */}
          <Text
            label="Adicionar endereço"
            color="dark"
            size="lg"
            weight="bold"
          />

          <br />
          {/* @ts-ignore */}
          <Input
            name="nome"
            label="Nome"
            placeholder="Casa"
            sizing="adjustable"
          />
          {/* @ts-ignore */}
          <Input
            name="cep"
            label="CEP"
            placeholder="58432-777"
            sizing="adjustable"
            onBlur={async (e) => {
              const cep = e.target.value.replace(/\D/g, "");
              if (cep.length === 8) {
                const data = await fetchViaCep(cep);
                if (data) {
                  formRef.current?.setData({
                    cidade: data.localidade,
                    rua: data.logradouro,
                    bairro: data.bairro,
                    estado: data.uf,
                  });
                  setStateSelected({ label: data.uf, value: data.uf });
                }
              }
            }}
          />
          {/* @ts-ignore */}
          <Input
            name="cidade"
            label="Cidade"
            placeholder="Campina Grande"
            sizing="adjustable"
          />
          {/* @ts-ignore */}
          <Input
            name="rua"
            label="Rua"
            placeholder="Rua exemplo"
            sizing="adjustable"
          />
          {/* @ts-ignore */}
          <Input
            name="bairro"
            label="Bairro"
            placeholder="Prata"
            sizing="adjustable"
          />
          {/* @ts-ignore */}
          <Input
            name="numero"
            label="Número"
            placeholder="312"
            sizing="adjustable"
          />
          {/* @ts-ignore */}
          <Dropdown
            label="Estado"
            options={ESTADOS}
            selectedOption={stateSelected}
            onSelectOption={(selectedOption) =>
              setStateSelected(selectedOption)
            }
          />
          {/* @ts-ignore */}
          <Input
            name="complemento"
            label="Complemento"
            placeholder="-"
            sizing="adjustable"
          />
          <section className="flex items-center gap-4 mt-12">
            {/* @ts-ignore */}
            <Button
              label="Cancelar"
              size="sm"
              className="uppercase font-semibold px-3 lg:px-6"
              color="red"
              // @ts-ignore
              onClick={toggleModalAddress}
            />
            {/* @ts-ignore */}
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
      <Modal
        isOpen={modalEditAddress}
        onClose={() => setModalEditAddress(false)}
        noActions
      >
        {/* @ts-ignore */}
        <Form
          onSubmit={handleEditAddress}
          ref={formRefEdit}
          className="py-12 space-y-2 max-h-[80vh] overflow-y-auto"
          initialData={{
            nome: addressSelected?.nome,
            cep: addressSelected?.cep,
            cidade: addressSelected?.cidade,
            estado: addressSelected?.estado,
            rua: addressSelected?.rua,
            bairro: addressSelected?.bairro,
            numero: addressSelected?.numero,
            complemento: addressSelected?.complemento,
          }}
        >
          {/* @ts-ignore */}
          <Text
            label="Adicionar endereço"
            color="dark"
            size="lg"
            weight="bold"
          />

          <br />
          {/* @ts-ignore */}
          <Input
            name="nome"
            label="Nome"
            placeholder="Casa"
            sizing="adjustable"
          />
          {/* @ts-ignore */}
          <Input
            name="cep"
            label="CEP"
            placeholder="58432-777"
            sizing="adjustable"
          />
          {/* @ts-ignore */}
          <Input
            name="cidade"
            label="Cidade"
            placeholder="Campina Grande"
            sizing="adjustable"
          />
          {/* @ts-ignore */}
          <Input
            name="rua"
            label="Rua"
            placeholder="Rua exemplo"
            sizing="adjustable"
          />
          {/* @ts-ignore */}
          <Input
            name="bairro"
            label="Bairro"
            placeholder="Prata"
            sizing="adjustable"
          />
          {/* @ts-ignore */}
          <Input
            name="numero"
            label="Número"
            placeholder="312"
            sizing="adjustable"
          />
          {/* @ts-ignore */}
          <Dropdown
            label="Estado"
            options={ESTADOS}
            selectedOption={stateSelected}
            onSelectOption={(selectedOption) =>
              setStateSelected(selectedOption)
            }
          />
          {/* @ts-ignore */}
          <Input
            name="complemento"
            label="Complemento"
            placeholder="-"
            sizing="adjustable"
          />
          <section className="flex items-center gap-4 mt-12">
            {/* @ts-ignore */}
            <Button
              label="Cancelar"
              size="sm"
              className="uppercase font-semibold px-3 lg:px-6"
              color="red"
              // @ts-ignore
              onClick={() => setModalEditAddress(false)}
            />
            {/* @ts-ignore */}
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
