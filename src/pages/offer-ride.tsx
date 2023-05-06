import React from "react";
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

type Props = {};

const OfferRide = (props: Props) => {
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
    <div className="flex w-full h-screen items-center justify-center">
      <div className="bg-dark w-[64rem]	 h-fit rounded-lg px-14 py-16 space-y-12">
        <header className="flex gap-4 items-center">
          <Image className="w-20 h-20" src={Woman} alt="woman-avatar" />
          <Text label="Olá, Joana!" size="lg" weight="bold" />
          {/* <Image className="w-4 h-4" src={Star} alt="woman-avatar"/> */}
        </header>
        <Form
          className="flex gap-6 justify-between"
          ref={formRef}
          onSubmit={() => {}}
        >
          <div className="w-2/5 space-y-2">
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
            {createFields(fieldsLastRow, "flex items-end gap-4 space-y-2")}
            <div className="flex gap-4 items-center space-y-2">
              <div className="w-1/2 flex flex-col ">
                <NumericField />
              </div>
              <div>
                <Input
                  name="estimated_value"
                  label="VALOR ESTIMADO"
                  type="text"
                  color="extralight"
                  sizing="adjustable"
                  placeholder="R$ 8,90"
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 space-y-7">
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
                className="uppercase font-semibold"
                color="dark-blue"
              />
              <Button
                label="oferecer carona"
                size="base"
                className="uppercase font-semibold"
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
