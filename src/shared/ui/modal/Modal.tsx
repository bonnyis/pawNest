import { useEffect } from "react";

type ModalProps = {
  width?: number;
  height?: number | string;
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
};
// 알림과 확인창 모달창 베이스
const Modal = ({
  width = 280,
  height = "auto",
  className = "",
  children,
  onClose,
}: ModalProps) => {
  // ESC 키 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // body scroll lock
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, []);
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/40 z-50`}
      onClick={() => onClose()}
    >
      <div
        className={`max-w-[90vw] bg-white rounded-xl p-6 shadow-lg top-1/2 ${className}`}
        style={{ width, height }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
