import { ArrowCircleLeft } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";
import Text from "../text";

export default function GoBack() {
  return (
    <Link href="/dashboard" className="text-gray flex items-center gap-2 mb-4">
      <ArrowCircleLeft size={32} />
      <Text
        label="Voltar para tela inicial"
        className=" cursor-pointer hover:text-stone-400 "
        color="gray"
        size="xl"
      />
    </Link>
  );
}
