import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

interface ModalProps {
  children?: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    const current = el.current;

    if (!modalRoot) {
      return;
    }
    modalRoot!.appendChild(current);
    return () => void modalRoot!.removeChild(current);
  }, []);

  return createPortal(children, el.current);
};

export default Modal;
