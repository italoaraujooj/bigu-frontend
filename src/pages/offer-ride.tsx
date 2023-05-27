import React, { useContext } from "react";
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

type Props = {};

const OfferRide = (props: Props) => {
  const { user } = useContext(AuthContext)
  const formRef = React.useRef<FormHandles>(null);
  const { createFields } = useFields();
  const [checkboxes, setCheckboxes] = React.useState([
    {
      id: 1,
      label: "estou indo para a universidade",
      value: "going",
      checked: false,
    },
    {
      id: 2,
      label: "estou saindo da universidade",
      value: "leaving",
      checked: false,
    },
  ]);

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

  const handleSubmit: SubmitHandler<OfferRideFormState> = (data) => {
    console.log(data.origin_locale);
  };

  return (
    <div className="flex w-full items-center justify-center my-16">
      <div className="bg-dark w-[21rem] md:w-528 lg:w-[64rem] h-fit rounded-lg px-6 py-8 lg:px-14 lg:py-16 space-y-12 mx-8">
        <header className="flex gap-4 items-center">
          <Image className="w-20 h-20" src={Woman} alt="woman-avatar" />
          <Text label={`Ola, ${user?.fullName}!`} size="lg" weight="bold" />
        </header>
        <Form
          className="flex flex-col lg:flex-row  lg:justify-between"
          ref={formRef}
          onSubmit={() => {}}
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
            {createFields(fieldsFirstRow, "space-y-4")}
            {createFields(fieldsLastRow, "w-full flex items-end gap-4 space-y-2")}
            <div className="flex gap-4 items-center space-y-2">
              <div className="w-1/2 lg:w-3/4 flex flex-col ">
                <NumericField />
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
                onChange={() => setOnlyWomanChecked(prev => !prev)}
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
              />
            </section>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default OfferRide;
