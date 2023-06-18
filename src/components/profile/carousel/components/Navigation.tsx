import React from "react";

type Props = {
  length: number;
  goToIndex: (index: number) => void;
};

export default function Navigation({ length, goToIndex }: Props) {
  if (length <= 1) return null;

  return (
    <div className="w-full flex items-center justify-center space-x-2 my-4">
      {Array.from({ length })?.map((_, index) => (
        <button
          key={index}
          className="w-4 h-4 bg-gray rounded-full"
          onClick={() => goToIndex(index)}
          type="button"
        ></button>
      ))}
    </div>
  );
}
