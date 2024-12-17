import {
  Button,
  Carousel,
  Checkbox,
  Dropdown,
  Input,
  NumericField,
  Text,
  TextArea,
} from "@/components";
import { AuthContext } from "@/context/AuthContext";
import useFields from "@/hooks/useFields";
import { fetchUserAddresses } from "@/services/address";
import { createRide, editRide, getRide } from "@/services/ride";
import { CarResponseDTO } from "@/types/ride";
import { formatDateTime, moneyMask } from "@/utils/masks";
import { checkboxesOptions, fieldsLastRow } from "@/utils/offer-ride-constants";
import { Address, OfferRideFormState } from "@/utils/types";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import Router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface FormatAddress {
  value: string;
  label: string;
}

type Props = {
  rideId?: string;
};

function OfferRideForm(props: Props) {
  const { rideId } = props;
  const [ride, setRide] = useState<any>();

  const { createFields } = useFields();

  const { user } = useContext(AuthContext);

  const formRef = useRef<FormHandles>(null);
  const [checkboxes, setCheckboxes] = useState(checkboxesOptions);
  const [userAddresses, setUserAddresses] = useState<FormatAddress[]>([]);
  const [ufcgAddressesSelected, setUfcgAddressesSelected] =
    useState<FormatAddress>({} as FormatAddress);
  const [userAddressesSelected, setUserAddressesSelected] =
    useState<FormatAddress>({} as FormatAddress);
  const [vacancies, setVacancies] = useState(0);
  const [onlyWomanChecked, setOnlyWomanChecked] = useState(true);
  const [selectedCar, setSelectedCar] = useState<CarResponseDTO>();
  const [description, setDescription] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  // Atualize o estado quando o valor de ride for carregado
  useEffect(() => {
    if (ride?.scheduledTime) {
      setScheduledTime(ride.scheduledTime);
    }
  }, [ride?.scheduledTime]);

  // Renderize o campo, seja com o valor ou vazio
  createFields(
    fieldsLastRow(scheduledTime),
    "w-full flex items-end gap-4 space-y-2"
  );

  const ufcgAddresses = [
    {
      value: "670c7741db1b1d5886b04cdb",
      label: "Entrada principal",
    },
    {
      value: "670c7815db1b1d5886b04cdc",
      label: "Entrada CEEI",
    },
    {
      value: "670c78ebdb1b1d5886b04cdd",
      label: "Entrada Humanas",
    },
    {
      value: "670c7957db1b1d5886b04cdf",
      label: "Entrada CCT",
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      const responseAddress = await fetchUserAddresses();
      if (responseAddress?.data) {
        const addressesFormated = responseAddress.data.userAddress.map(
          (address: Address) => ({
            label: address.nome,
            value: address.addressId,
          })
        );
        setUserAddresses(addressesFormated);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (rideId) {
      const loadData = async () => {
        const responseRide = await getRide(rideId);
        if (responseRide?.data) {
          setRide(responseRide?.data?.ride);
          setDescription(responseRide.data.ride.description);
          setScheduledTime(responseRide.data.ride.scheduledTime);
          if (!responseRide.data.ride.goingToCollege) {
            handleCheckboxChange(2);
          }
          setVacancies(responseRide.data.ride.numSeats - 1);
          const startAddressFormated = {
            label: responseRide.data.ride.startAddress.nome,
            value: responseRide.data.ride.startAddress.addressId,
          };
          const destinationAddressFormated = ufcgAddresses.find(
            (address) =>
              address.value ===
              responseRide?.data?.ride?.destinationAddress?.addressId
          );
          if (ride?.goingToCollege == true) {
            setUserAddressesSelected(startAddressFormated);
            if (destinationAddressFormated) {
              setUfcgAddressesSelected(destinationAddressFormated);
            }
          } else {
            if (destinationAddressFormated) {
              setUserAddressesSelected(destinationAddressFormated);
            }
            setUfcgAddressesSelected(startAddressFormated);
          }
        }
      };
      loadData();
    }
  }, [rideId]);

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
    const startAddress = checked
      ? userAddressesSelected?.value
      : ufcgAddressesSelected?.value;
    const destinationAddress = checked
      ? ufcgAddressesSelected?.value
      : userAddressesSelected?.value;

    const dateTime = formatDateTime(date, hours);
    const numSeats = vacancies + 1;
    const price = Number(
      String(estimated_value).split(" ")[1]?.replace(",", ".")
    );
    const toWomen = user?.sex === "F" ? onlyWomanChecked : false;
    const vehicleId = selectedCar?.vehicleId;
    const body = {
      driver: user?.userId,
      startAddress: startAddress,
      destinationAddress: destinationAddress,
      numSeats: numSeats,
      goingToCollege: value === "going" && checked,
      price: price,
      scheduledTime: dateTime,
      vehicle: vehicleId,
      description: description,
      toWomen: toWomen,
    };
    if (rideId) {
      try {
        const response = await editRide(rideId, body);
        if (response?.status == 200) {
          Router.push("/dashboard");
          toast.success("A carona foi editada com sucesso");
        }
      } catch (err: any) {
        toast.error(err.message);
      }
    } else {
      try {
        const response = await createRide(body);
        if (response?.status == 201) {
          Router.push("/dashboard");
          toast.success("A carona foi criada com sucesso");
        }
      } catch (err: any) {
        if (
          err.error ===
          "Você já tem uma carona marcada para esse horário ou para um horário próximo."
        ) {
          toast.error(err.error);
        } else {
          toast.error(err.message);
        }
      }
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
          selectedOption={
            checkboxes[0].checked
              ? userAddressesSelected
              : ufcgAddressesSelected
          }
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
          selectedOption={
            checkboxes[0].checked
              ? ufcgAddressesSelected
              : userAddressesSelected
          }
          onSelectOption={(selectedOption) =>
            checkboxes[0].checked
              ? setUfcgAddressesSelected(selectedOption)
              : setUserAddressesSelected(selectedOption)
          }
        />
        {createFields(
          fieldsLastRow(scheduledTime),
          "w-full flex items-end gap-4 space-y-2"
        )}
        <div className="flex gap-4 items-center space-y-2">
          <div className="w-full flex flex-col ">
            <NumericField vacancies={vacancies} setVacancies={setVacancies}/>
          </div>
          {/* <div className="w-1/2">
            <Input
              name="estimated_value"
              label="VALOR ESTIMADO"
              type="text"
              color="extralight"
              sizing="adjustable"
              placeholder="R$ 8,90"
              mask={moneyMask}
              readOnly={false}
              value={ride?.price}
            />
          </div> */}
        </div>
        {user?.sex === "F" && (
          <div>
            <Checkbox
              label="oferecer carona apenas para as mulheres"
              checked={onlyWomanChecked}
              onChange={() => setOnlyWomanChecked((prev) => !prev)}
              className="my-4 mb-6"
            />
          </div>
        )}
      </div>
      <div className="w-full lg:w-1/2 space-y-7">
        <div>
          <Text
            label="Escolha um veículo"
            size="lg"
            className="mb-4"
            weight="bold"
          />
          <Carousel add={() => {}} setCarSelected={setSelectedCar} />
        </div>

        <TextArea
          label="Detalhe sua carona"
          placeholder="Detalhe um pouco da sua carona..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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
