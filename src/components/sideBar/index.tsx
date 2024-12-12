import clsx from "clsx";
import Button from "../button";
import Back from "../../assets/CaretRight.svg";
import Image from "next/image";

type Props = {
    visible: boolean;
    handleClose: () => void;
    handleOpenRegister: () => void;
    openLoginModal: () => void;
};

export function SideBar(props: Props) {
    const {visible, handleClose, handleOpenRegister, openLoginModal} = props;

    return (
        <div
            className={clsx("transition-transform transform ease-in-out duration-500",
                `bg-white w-full h-full fixed top-0 right-0 py-14 px-14 space-y-4`,
                `${visible ? "translate-x-0" : "translate-x-full"}`)}
        >
            <Image
                className="w-10 h-10 cursor-pointer"
                src={Back}
                alt="voltar"
                onClick={handleClose}
            />
            <Button
                label="CADASTRAR"
                size="base"
                color="yellow"
                shape="rounded"
                onClick={handleOpenRegister}
            />
            <Button
                label="ENTRAR"
                size="base"
                color="yellow"
                shape="rounded"
                onClick={openLoginModal}
            />
        </div>
    )
}