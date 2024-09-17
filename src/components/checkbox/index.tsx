import Image from 'next/image'
import React from 'react'
import Unchecked from '../../assets/unchecked.png'
import Checked from '../../assets/check.png'
import Text from '../text'
import clsx from 'clsx'

type Props = {
  label: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
}

const Checkbox = (props: Props) => {
  const { checked, label, onChange, className = "" } = props;
  return (
    <button className={clsx(`relative flex items-center gap-2 h-12`, className)} onClick={onChange} type="button">
      { !checked ? <Image className="w-10 h-10 scale-100 duration-300 ease-out" src={Unchecked} alt="unchecked"/> :<Image className="w-8 h-8 m-1 scale-120 duration-300 ease-in" src={Checked} alt="unchecked"/>}
      <Text label={label} size="xs" className="sm:text-sm" />
    </button>
  )
}

export default Checkbox