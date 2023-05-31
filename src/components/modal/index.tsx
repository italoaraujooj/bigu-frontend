
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }: any) => {
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
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black/50">
          <div className="modal">
            <button className="modal-close" onClick={onClose}>
              X
            </button>
            <div className="modal-content">{children}</div>
          </div>
        </div>,
        modalRoot.current
      )
    : null;
};

export default Modal;
