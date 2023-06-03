import React, { useRef, useState } from 'react'
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from '@unform/core';
import { Text, Input, Button, Dropdown, Modal, Carousel, TextArea, NumericField, Checkbox } from "@/components";
import { OfferRideFormState } from '@/utils/types';
import { checkboxesOptions, fieldsLastRow } from '@/utils/offer-ride-constants';
import { formatDateTime } from '@/utils/masks';
import { createRide } from '@/services/ride';
import useFields from '@/hooks/useFields';
import { getUserCars } from '@/services/car';
import { fetchUfcgAddresses, fetchUserAddresses } from '@/services/address';

function OfferRideForm() {
  const { createFields } = useFields();

  const formRef = useRef<FormHandles>(null);
  const [checkboxes, setCheckboxes] = useState(checkboxesOptions);
  const [ufcgAddresses, setUfcgAddresses] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [ufcgAddressesSelected, setUfcgAddressesSelected] = useState({});
  const [userAddressesSelected, setUserAddressesSelected] = useState({});
  const [showModalConfirmation, setshowModalConfirmation] = useState(false);
  const [vacancies, setVacancies] = useState(0);
  const [onlyWomanChecked, setOnlyWomanChecked] = useState(true);

  const handleCloseConfirmation = () => setshowModalConfirmation(false);
  const handleOpenConfirmation = () => setshowModalConfirmation(true);

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
    const checkboxSelected = checkboxes.find((checkbox) => checkbox.checked);
    const body = {
      goingToCollege:
        checkboxSelected!.value === "going" && checkboxSelected!.checked,
      startId: checkboxes[0].checked
        ? userAddressesSelected
        : ufcgAddressesSelected,
      destinationId: checkboxes[0].checked
        ? ufcgAddressesSelected
        : userAddressesSelected,
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

  React.useEffect(() => {
    getUserCars().then((data) => console.log(data));
    fetchUserAddresses().then((data) => {
      const addressesFormated = data?.data.map((address: any) => ({
        label: address.nickname,
        value: address.addressId,
      }));
      setUserAddresses(addressesFormated);
    });
    fetchUfcgAddresses().then((data) => {
      const addressesFormated = data?.data.map((address: any) => ({
        label: address.nickname,
        value: address.addressId,
      }));
      setUfcgAddresses(addressesFormated);
    });
  }, []);

  return (
    <Form
          className="flex flex-col lg:flex-row lg:justify-between"
          ref={formRef}
          onSubmit={handleConfimation}
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
              label="Local de Origem"
              options={checkboxes[0].checked ? userAddresses : ufcgAddresses}
              onSelectOption={() =>
                checkboxes[0].checked
                  ? () => setUserAddressesSelected
                  : () => setUfcgAddressesSelected
              }
            />
            <Dropdown
              label="Local de Destino"
              options={checkboxes[0].checked ? ufcgAddresses : userAddresses}
              onSelectOption={() =>
                checkboxes[0].checked
                  ? () => setUfcgAddressesSelected
                  : () => setUserAddressesSelected
              }
            />
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
  )
}

export default OfferRideForm;