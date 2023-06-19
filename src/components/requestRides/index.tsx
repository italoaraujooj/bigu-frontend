import clsx from "clsx";
import Image from "next/image";
import Back from "../../assets/CaretRight.svg";
import Button from "../button";
import Avatar from "../../assets/avatar.png"
type Props = {
    visible: boolean;
    handleClose: () => void;
};

function RidesRequests(props: Props) {
    const { visible, handleClose } = props;
    
    return (
        <div
            id="login"
            className={clsx(
                "transition ease-in-out delay-150 duration-500",
                `flex justify-center items-start h-screen fixed bg-white w-[100%] overflow-y-scroll pt-3 top-0 lg:right-0 lg:max-w-[30.125rem]`,
                visible ? "translate-x-0" : "translate-x-full"
            )}
        >
            <div className="flex flex-col justify-between gap-4">
                <Image
                    className="w-10 h-10 cursor-pointer"
                    src={Back}
                    alt="voltar"
                    onClick={handleClose}
                />
                <h1 className="font-['Poppins'] font-semibold text-2xl md:text-3xl">
                    Solicitações de carona
                </h1>
                <div className="flex justify-between bg-background rounded-lg p-4 bg-stone-200 border border-warmGray-400 border-solid">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center">
                            <Image className="w-8 h-8" src={Avatar} alt='ft'/>
                            <p className="font-[Poppins] font-medium">
                                Nome
                            </p>
                        </div>

                        <p className="font-[Poppins] font-medium">
                            Local
                        </p>

                        <p className="font-[Poppins] font-medium ">
                            Telefone
                        </p>

                    </div>
                    <div className="flex flex-col gap-2">
                        <Button
                            label="Aceitar"
                            size="res"
                            color="green"
                            className="uppercase"
                            shape="square"

                        />
                        <Button
                            label="Recusar"
                            size="res"
                            color="red"
                            className="uppercase"
                            shape="square"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RidesRequests;