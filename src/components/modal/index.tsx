import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "../button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, children }: any) => {
  const modalRoot = useRef(document.createElement("div"));

  useEffect(() => {
    const modalElement = modalRoot.current;
    document.body.appendChild(modalElement);

    return () => {
      document.body.removeChild(modalElement);
    };
  }, []);

  return isOpen
    ? ReactDOM.createPortal(
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black/70">
          <div className="modal bg-white py-10 px-12 rounded-md shadow-lg">
            <div className="modal-content">
              <main>{children}</main>
              <br />
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
            </div>
          </div>
        </div>,
        modalRoot.current
      )
    : null;
};

export default Modal;
