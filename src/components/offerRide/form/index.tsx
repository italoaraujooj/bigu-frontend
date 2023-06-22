import React, {useContext, useRef, useState} from "react";
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import {
  Text,
  Input,
  Button,
  Dropdown,
  Modal,
  Carousel,
  TextArea,
  NumericField,
  Checkbox,
} from "@/components";
import { OfferRideFormState } from "@/utils/types";
import { checkboxesOptions, fieldsLastRow } from "@/utils/offer-ride-constants";
import { formatDateTime, moneyMask } from "@/utils/masks";
import { createRide } from "@/services/ride";
import useFields from "@/hooks/useFields";
import { fetchUfcgAddresses, fetchUserAddresses } from "@/services/address";
import  Router  from "next/router";
import {AuthContext} from "@/context/AuthContext";
import { RideContext } from "@/context/RideContext";
import NotificationContext from "@/context/NotificationContext";
import Notification from "@/components/notification";

function OfferRideForm() {
  const { createFields } = useFields();

  const { user, isAuthenticated, setUser } = useContext(AuthContext);
  const { setRides } = useContext(RideContext);
  const {notificationHandler, showNotification} = useContext(NotificationContext);
  
  const formRef = useRef<FormHandles>(null);
  const [checkboxes, setCheckboxes] = useState(checkboxesOptions);
  const [ufcgAddresses, setUfcgAddresses] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [ufcgAddressesSelected, setUfcgAddressesSelected] = useState({} as any);
  const [userAddressesSelected, setUserAddressesSelected] = useState({} as any);
  const [vacancies, setVacancies] = useState(0);
  const [onlyWomanChecked, setOnlyWomanChecked] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

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
    const startAddressId = checked ? userAddressesSelected?.value : ufcgAddressesSelected?.value;
    const destinationAddressId = checked ? ufcgAddressesSelected?.value : userAddressesSelected?.value;

    const dateTime = formatDateTime(date, hours);
    const numSeats = vacancies + 1;
    const price = Number(String(estimated_value).split(" ")[1].replace(",","."))
    const toWomen = user?.sex === "F" ? onlyWomanChecked : false;
    const carId = selectedCar;
    const description = "any description";
    try{
      const body = {
        goingToCollege: value === "going" && checked,
        startAddressId,
        destinationAddressId,
        dateTime,
        numSeats,
        price,
        toWomen,
        carId,
        description,
      };
  
      console.log(body)
  
      const response = await createRide(body);
      if(response?.status == 200){
        setRides((previousState: any) => [...previousState, response?.data])
        Router.push("/dashboard")
        notificationHandler("success", "A carona foi criada com sucesso")
      }
    }catch(err: any){
      notificationHandler("fail", "Falha ao criar uma carona")
      console.log(err)
    }
  };
  
  React.useEffect(() => {
    fetchUserAddresses().then((data) => {
      const addressesFormated = data?.data.map((address: any) => ({
        label: address?.nickname,
        value: address?.id,
      }));
      setUserAddresses(addressesFormated);
    });
    fetchUfcgAddresses().then((data) => {
      const addressesFormated = data?.data.map((address: any) => ({
        label: address?.nickname,
        value: address?.id,
      }));
      setUfcgAddresses(addressesFormated);
    });
  }, []);

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
          <Carousel add={() => {}} carSelected={selectedCar} setCarSelected={setSelectedCar}/>
        </div>

        <TextArea
          label="Detalhe sua carona"
          placeholder="Detalhe um pouco da sua carona..."
        />

        <section className="w-full flex justify-end gap-8">
          <Button
            type="button"
            label="salvar rascunho"
            size="base"
            className="uppercase font-semibold px-3 lg:px-6"
            color="dark-blue"
          />
          <Button
            label="oferecer carona"
            size="base"
            className="uppercase font-semibold px-3 lg:px-6"
            color="green"
            type="submit"
          />
        </section>
      </div>
      {showNotification && <Notification/>}
    </Form>
  );
}

export default OfferRideForm;
