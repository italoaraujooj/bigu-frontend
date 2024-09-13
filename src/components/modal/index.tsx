import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "../button";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => any;
  noActions?: boolean;
  transparent?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, noActions, transparent, children }: any) => {
  const modalRoot = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    modalRoot.current = document.createElement("div");
    document.body.appendChild(modalRoot.current);

    return () => {
      if (modalRoot.current && modalRoot.current.parentNode === document.body) {
        document.body.removeChild(modalRoot.current);
      }
    };
  }, []);

  if (!modalRoot.current) {
    return null;
  }

  return isOpen
    ? ReactDOM.createPortal(
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black/70">
          <div className={clsx("modal py-10 px-12 rounded-md shadow-lg", transparent ? "transparent opacity-3 rounded-full" : "bg-white")}>
            <div className="modal-content">
              <main>{children}</main>
              <br />
              {!noActions && (
                <section className="flex items-center gap-4">
                  <Button
                    label="Cancelar"
                    size="sm"
                    className="uppercase font-semibold px-3 lg:px-6"
                    color="red"
                    onClick={onClose}
                  />
                  <Button
                    label="Confirmar"
                    size="sm"
                    className="uppercase font-semibold px-3 lg:px-6"
                    color="green"
                    type={!!onSubmit ? "button" : "submit"}
                    onClick={onSubmit}
                  />
                </section>
              )}
            </div>
          </div>
        </div>,
        modalRoot.current
      )
    : null;
};

export default Modal;
