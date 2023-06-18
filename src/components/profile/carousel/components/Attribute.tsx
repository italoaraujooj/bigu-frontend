import Text from "@/components/text";
import clsx from "clsx";
import React from "react";

type Props = {
  label: string;
  value: string;
  color: string;
};

export default function Attribute({ label, value, color }: Props) {
  return (
    <div className="space-y-2 text-center">
      <div className={clsx(`bg-${color}`, 'text-white px-4 py-2 rounded-md font-semibold')}>
        {label}
      </div>
      <Text label={value} color="gray" />
    </div>
  );
}
