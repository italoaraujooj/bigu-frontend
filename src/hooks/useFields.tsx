import { fieldsFirstRow } from "@/utils/offer-ride-constants";
import { OfferRideField } from "@/utils/types";
import Input from "../components/input/input";
import React from "react";
import clsx from "clsx";

type Props = {};

function useFields() {
  const createFields = (fields: OfferRideField[], className?: string) => {
    return (
      <div className={clsx(className)}>
        {fields.map(({ name, label, type, color, sizing, placeholder }) => (
          <Input
            key={name}
            name={name}
            label={label}
            type={type}
            color={color}
            sizing={sizing}
            placeholder={placeholder}
          />
        ))}
      </div>
    );
  };

  return {
    createFields,
  };
}

export default useFields;
