import { MouseEventHandler } from "react";


interface Props {
    handleClose: MouseEventHandler<HTMLDivElement>;
    show: boolean;
    children?: JSX.Element
}

function ModalSecondary({handleClose, show, children}: Props) {
  
return (
    <div>
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black/50">
            {children}
        </div>
    </div>
    
  )
}

export default ModalSecondary;

