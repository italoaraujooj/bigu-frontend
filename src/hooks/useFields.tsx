import { OfferRideField } from "@/utils/types";
import clsx from "clsx";
import Input from "../components/input/input";

type Props = {};

function useFields() {
  const createFields = (fields: OfferRideField[], className?: string) => {
    return (
      <div className={clsx(className)}>
        {fields.map(
          ({
            name,
            label,
            type,
            color,
            sizing,
            placeholder,
            readOnly,
            mask,
          }) => (
            <Input
              key={name}
              name={name}
              label={label}
              type={type}
              color={color}
              sizing={sizing}
              placeholder={placeholder}
              readOnly={readOnly}
              mask={mask}
            />
          )
        )}
      </div>
    );
  };

  return {
    createFields,
  };
}

export default useFields;
