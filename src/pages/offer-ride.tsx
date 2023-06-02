import React, { useContext, useState } from "react";
import Woman from "../assets/woman.png";
import Image from "next/image";
import Text from "@/components/text";
import Input from "@/components/input/input";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import Button from "@/components/button";
import Carousel from "@/components/offerRide/carousel";
import { fieldsFirstRow, fieldsLastRow } from "@/utils/offer-ride-constants";
import TextArea from "@/components/offerRide/textarea";
import NumericField from "@/components/offerRide/numericField";
import { OfferRideFormState } from "@/utils/types";
import useFields from "@/hooks/useFields";
import Checkbox from "@/components/checkbox";
import { AuthContext } from "@/context/AuthContext";
import { GetServerSideProps } from "next";
import { fetchUfcgAddresses, fetchUserAddresses } from "@/services/address";
import { formatDateTime } from "@/utils/masks";
import { getToken } from "@/utils/cookies";
import { hasCookie } from "cookies-next";
import { getUserCars } from "@/services/car";
import Dropdown from "@/components/dropdown";
import Modal from "@/components/modal";
import { createRide } from "@/services/ride";

type Props = {};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  try {
    const cars = await getUserCars();
    const addresses = await fetchUserAddresses();

    return {
      props: {
        cars,
        addresses,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Failed to fetch data",
      },
    };
  }
};

const OfferRide = ({ cars, addresses }: any) => {
  const { user } = useContext(AuthContext);
  const [ufcgAddresses, setUfcgAddresses] = React.useState([]);
  const [userAddresses, setUserAddresses] = React.useState([]);
  const [ufcgAddressesSelected, setUfcgAddressesSelected] = React.useState({});
  const [userAddressesSelected, setUserAddressesSelected] = React.useState({});

  const [showModalConfirmation, setshowModalConfirmation] = useState(false);

  const handleCloseConfirmation = () => setshowModalConfirmation(false);
  const handleOpenConfirmation = () => setshowModalConfirmation(true);

  React.useEffect(() => {
    getUserCars().then(data => console.log(data));
    fetchUserAddresses().then(data => {
      const addressesFormated = data?.data.map((address: any) => ({ label: address.nickname, value: address.addressId}));
      setUserAddresses(addressesFormated)
    });
    fetchUfcgAddresses().then(data => {
      const addressesFormated = data?.data.map((address: any) => ({ label: address.nickname, value: address.addressId}));
      setUfcgAddresses(addressesFormated)
    });
  }, [cars, addresses])

  const formRef = React.useRef<FormHandles>(null);
  const { createFields } = useFields();
  const [checkboxes, setCheckboxes] = React.useState([
    {
      id: 1,
      label: "estou indo para a universidade",
      value: "going",
      checked: true,
    },
    {
      id: 2,
      label: "estou saindo da universidade",
      value: "leaving",
      checked: false,
    },
  ]);
  const [vacancies, setVacancies] = React.useState(0);
  const [onlyWomanChecked, setOnlyWomanChecked] = React.useState(true);
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

    console.log(checkboxes);
    console.log(onlyWomanChecked);
    console.log(vacancies);
    console.log(data);
    console.log(data.origin_locale);
    // {
    //   "goingToCollege": true,
    //   "startAddressId": 0,
    //   "destinationAddressId": 0,
    //   "dateTime": "2023-06-01T11:59:06.931Z",
    //   "numSeats": 3,
    //   "price": 8.9,
    //   "toWomen": true,
    //   "carId": 0,
    //   "description": "string"
    // }
    const checkboxSelected = checkboxes.find((checkbox) => checkbox.checked);
    const body = {
      goingToCollege:
        checkboxSelected!.value === "going" && checkboxSelected!.checked,
      startId: checkboxes[0].checked ? userAddressesSelected : ufcgAddressesSelected,
      destinationId: checkboxes[0].checked ? ufcgAddressesSelected : userAddressesSelected,
      dateTime: formatDateTime(data?.date, data?.hours),
      numSeats: vacancies + 1,
      price: data.estimated_value,
      toWomen: onlyWomanChecked,
      carId: 1,
      description: "any description",
    };

    const response = await createRide(body);
    console.log(response);
    console.log(body);
  };

  const handleConfimation = () => {};

  console.log(ufcgAddresses);
  return (
    <div className="flex w-full items-center justify-center my-16">
      <div className="bg-dark w-[21rem] md:w-528 lg:w-[64rem] h-fit rounded-lg px-6 py-8 lg:px-14 lg:py-16 space-y-12 mx-8">
        <header className="flex gap-4 items-center">
          <Image className="w-20 h-20" src={Woman} alt="woman-avatar" />
          <Text label={`Ola, ${user?.fullName}!`} size="lg" weight="bold" />
        </header>
        <Form
          className="flex flex-col lg:flex-row lg:justify-between"
          ref={formRef}
          onSubmit={handleConfimation}
        >
          <div className="w-full lg:w-2/5 space-y-2">
            <section className="mb-7">
              <Checkbox
                label="estou indo para a universidade"
                checked={checkboxes[0].checked}
                onChange={() => handleCheckboxChange(1)}
              />
              <Checkbox
                label="estou saindo da universidade"
                checked={checkboxes[1].checked}
                onChange={() => {
                  handleCheckboxChange(2);
                }}
              />
            </section>
            <Dropdown label="Local de Origem" options={checkboxes[0].checked ? userAddresses : ufcgAddresses } onSelectOption={() => checkboxes[0].checked ? () => setUserAddressesSelected : () => setUfcgAddressesSelected} />
            <Dropdown label="Local de Destino" options={checkboxes[0].checked ? ufcgAddresses : userAddresses } onSelectOption={() => checkboxes[0].checked ? () => setUfcgAddressesSelected : () => setUserAddressesSelected} />
            {/* {createFields(fieldsFirstRow, "space-y-4")} */}
            {createFields(
              fieldsLastRow,
              "w-full flex items-end gap-4 space-y-2"
            )}
            <div className="flex gap-4 items-center space-y-2">
              <div className="w-1/2 lg:w-3/4 flex flex-col ">
                <NumericField
                  vacancies={vacancies}
                  setVacancies={setVacancies}
                />
              </div>
              <div className="w-1/2">
                <Input
                  name="estimated_value"
                  label="VALOR ESTIMADO"
                  type="text"
                  color="extralight"
                  sizing="adjustable"
                  placeholder="R$ 8,90"
                  readOnly={false}
                />
              </div>
            </div>
            <div>
              <Checkbox
                label="oferecer carona apenas para as mulheres"
                checked={onlyWomanChecked}
                onChange={() => setOnlyWomanChecked((prev) => !prev)}
                className="my-4 mb-6"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-7">
            <div>
              <Text
                label="Escolha um veículo"
                size="lg"
                className="mb-4"
                weight="bold"
              />
              <Carousel />
            </div>

            {/* textarea */}
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
                onClick={handleOpenConfirmation}
              />
            </section>
          </div>
          {showModalConfirmation && (
            <Modal
              isOpen={showModalConfirmation}
              onClose={handleCloseConfirmation}
            >
              <div className=" flex flex-col gap-3 justify-center items-center bg-white rounded-lg p-3">
                <p className=" text-xl font-semibold text-warmGray-800">
                  Tem certeza?
                </p>
                <div className="flex gap-2">
                <Button
                    label="Cancelar"
                    size="base"
                    className="uppercase font-semibold px-3 lg:px-6"
                    color="red"
                    onClick={handleCloseConfirmation}
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
            </Modal>
          )}
        </Form>
      </div>
    </div>
  );
};

export default OfferRide;
