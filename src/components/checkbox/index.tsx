import Image from 'next/image'
import React from 'react'
import Unchecked from '../../assets/unchecked.png'
import Checked from '../../assets/check.png'
import Text from '../text'

type Props = {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox = (props: Props) => {
  const { checked, label, onChange } = props;
  return (
    <button className="relative flex items-center gap-2 h-12" onClick={onChange}>
      { !checked ? <Image className="w-10 h-10 scale-100 duration-300 ease-out" src={Unchecked} alt="unchecked"/> :<Image className="w-8 h-8 m-1 scale-120 duration-300 ease-in" src={Checked} alt="unchecked"/>}
      <Text label={label} size="sm" />
    </button>
  )
}

export default Checkbox