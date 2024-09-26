import React from 'react'
import NextLink from "next/link";
import clsx from 'clsx';
import Text from "../text";
type Props = {
    label: string;
    to: string;
    className: string;
    disabled?: boolean;
}

export default function Link({ label, to, className, disabled }: Props) {
  return (
    <NextLink href={to} className={clsx('text-medium text-gray', disabled && 'pointer-events-none text-[#71717a]', className)} >
        <Text
            label={label}
            className="py-2 text-gray text-base hover:text-[#a8a29e] uppercase font-medium bg-left-bottom bg-gradient-to-r from-amber-400 to-amber-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out underline-offset-8"
            color="gray"
            size="base"
            weight="medium"
          />
    </NextLink>
  )
}