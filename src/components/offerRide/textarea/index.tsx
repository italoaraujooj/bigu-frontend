import React from "react";
import Text from "../../text";

type Props = {
  label: string;
  placeholder: string;
};

const TextArea = (props: Props) => {
  const { label, placeholder } = props;

  return (
    <div>
      <Text
        label={label}
        size="lg"
        className="mb-4"
        weight="bold"
      />
      <textarea
        rows={6}
        minLength={10}
        autoComplete="on"
        autoCorrect="on"
        placeholder={placeholder}
        name="ride_description"
        className="w-full rounded-lg px-6 py-6 my-[0.16rem] placeholder-placeholder"
      ></textarea>
    </div>
  );
};

export default TextArea;
