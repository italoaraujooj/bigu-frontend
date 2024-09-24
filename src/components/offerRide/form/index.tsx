import React, {useContext, useEffect, useRef, useState} from "react";
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import {
  Text,
  Input,
  Button,
  Dropdown,
  Carousel,
  TextArea,
  NumericField,
  Checkbox,
} from "@/components";
import { Address, OfferRideFormState } from "@/utils/types";
import { checkboxesOptions, fieldsLastRow } from "@/utils/offer-ride-constants";
import { formatDateTime, moneyMask } from "@/utils/masks";
import useFields from "@/hooks/useFields";
import { fetchUserAddresses } from "@/services/address";
import {AuthContext} from "@/context/AuthContext";
import { toast } from "react-toastify";
import { createRide } from "@/services/ride";
import Router from "next/router";

interface FormatAddress {
  value: string
  label: string
}

function OfferRideForm() {
  const { createFields } = useFields();

  const { user } = useContext(AuthContext);
  
  const formRef = useRef<FormHandles>(null);
  const [checkboxes, setCheckboxes] = useState(checkboxesOptions);
  const [userAddresses, setUserAddresses] = useState<FormatAddress[]>([]);
  const [ufcgAddressesSelected, setUfcgAddressesSelected] = useState<FormatAddress>({} as FormatAddress);
  const [userAddressesSelected, setUserAddressesSelected] = useState<FormatAddress>({} as FormatAddress);
  const [vacancies, setVacancies] = useState(0);
  const [onlyWomanChecked, setOnlyWomanChecked] = useState(true);
  const [selectedCar, setSelectedCar] = useState("");

  const ufcgAddresses = [
    {
      value: "66e093bfe2323b4802da45c3",
      label:"Entrada principal"
    },
    {
      value: "66e09414e2323b4802da45c5",
      label:"Entrada CEEI"
    },
    {
      value: "66e09431e2323b4802da45c7",
      label:"Entrada Humanas"
    },
    {
      value: "66e09466e2323b4802da45c9",
      label:"Entrada CCT"
    }
  ]

  useEffect(() => {
    const loadData = async () => {
      const responseAddress = await fetchUserAddresses()
      if(responseAddress?.data){
        const addressesFormated = responseAddress.data.userAddress.map((address: Address) => ({
          label: address.nome,
          value: address.addressId,
        }));
        setUserAddresses(addressesFormated);
      }
    }
    loadData();
  }, [])

  const handleCheckboxChange = (checkboxId: number) => {
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.id === checkboxId) {
        return { ...checkbox, checked: true };
      } else {
        return { ...checkbox, checked: false };
      }
    });

    setCheckboxes(updatedCheckboxes);
  };

  const handleSubmit: SubmitHandler<OfferRideFormState> = async (data) => {
    const checkboxSelected = checkboxes[0];
    const { date, hours, estimated_value } = data;
    const { checked, value } = checkboxSelected!;
    const startAddress = checked ? userAddressesSelected?.value : ufcgAddressesSelected?.value;
    const destinationAddress = checked ? ufcgAddressesSelected?.value : userAddressesSelected?.value;

    const dateTime = formatDateTime(date, hours);
    const numSeats = vacancies + 1;
    const price = Number(String(estimated_value).split(" ")[1].replace(",","."))
    const toWomen = user?.sex === "F" ? onlyWomanChecked : false;
    const carId = selectedCar;
    const description = "any description";
    const body = {
      driver: user?.userId,
      startAddress: startAddress,
      destinationAddress: destinationAddress,
      numSeats: numSeats,
      goingToCollege: value === "going" && checked,
      price: price,
      scheduledTime: dateTime,
      car: carId,
      description: description,
      toWomen: toWomen,
    };
    try{
      const response = await createRide(body);
      if(response?.status == 201){
        Router.push("/dashboard")
        toast.success("A carona foi criada com sucesso")
      }
    }catch(err: any){
      toast.error(err.message)
    }
  };


  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row lg:justify-between"
      ref={formRef}
    >
      <div className="w-full lg:w-2/5 space-y-2">
        <section className="mb-7">
          <Checkbox
            label={checkboxesOptions[0].label}
            checked={checkboxes[0].checked}
            onChange={() => handleCheckboxChange(1)}
          />
          <Checkbox
            label={checkboxesOptions[1].label}
            checked={checkboxes[1].checked}
            onChange={() => {
              handleCheckboxChange(2);
            }}
          />
        </section>
        <Dropdown
        key={1}
          label="Local de Origem"
          options={checkboxes[0].checked ? userAddresses : ufcgAddresses}
          onSelectOption={(selectedOption) =>
            checkboxes[0].checked
              ? setUserAddressesSelected(selectedOption)
              : setUfcgAddressesSelected(selectedOption)
          }
        />
        <Dropdown
        key={2}
          label="Local de Destino"
          options={checkboxes[0].checked ? ufcgAddresses : userAddresses}
          onSelectOption={(selectedOption) =>
            checkboxes[0].checked
              ? setUfcgAddressesSelected(selectedOption)
              : setUserAddressesSelected(selectedOption)
          }
        />
        {createFields(fieldsLastRow, "w-full flex items-end gap-4 space-y-2")}
        <div className="flex gap-4 items-center space-y-2">
          <div className="w-1/2 lg:w-3/4 flex flex-col ">
            <NumericField vacancies={vacancies} setVacancies={setVacancies} />
          </div>
          <div className="w-1/2">
            <Input
              name="estimated_value"
              label="VALOR ESTIMADO"
              type="text"
              color="extralight"
              sizing="adjustable"
              placeholder="R$ 8,90"
              mask={moneyMask}
              readOnly={false}
            />
          </div>
        </div>
        { user?.sex === "F" && <div>
          <Checkbox
            label="oferecer carona apenas para as mulheres"
            checked={onlyWomanChecked}
            onChange={() => setOnlyWomanChecked((prev) => !prev)}
            className="my-4 mb-6"
          />
        </div> }
      </div>
      <div className="w-full lg:w-1/2 space-y-7">
        <div>
          <Text
            label="Escolha um veículo"
            size="lg"
            className="mb-4"
            weight="bold"
          />
          <Carousel add={() => {}} setCarSelected={setSelectedCar}/>
        </div>

        <TextArea
          label="Detalhe sua carona"
          placeholder="Detalhe um pouco da sua carona..."
        />

        <section className="w-full flex justify-center gap-8">
          {/* <Button
            type="button"
            label="salvar rascunho"
            size="base"
            className="uppercase font-semibold px-3 lg:px-6"
            color="dark-blue"
          /> */}
          <Button
            label="oferecer carona"
            size="base"
            className="uppercase font-semibold px-3 lg:px-6"
            color="green"
            type="submit"
          />
        </section>
      </div>
    </Form>
  );
}

export default OfferRideForm;
