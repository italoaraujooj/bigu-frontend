import React from 'react'
import NextLink from "next/link";
import clsx from 'clsx';
type Props = {
    label: string;
    to: string;
    className: string;
    disabled?: boolean;
}

export default function Link({ label, to, className, disabled }: Props) {
  return (
    <NextLink href={to} className={clsx('text-medium text-gray', disabled && 'pointer-events-none text-[#71717a]', className)} >
        { label }
    </NextLink>
  )
}