import { useEffect } from "react";
import closeBtn from "@img/icons/close_big.png";
import backspace from "@img/icons/backspace.png";

type ContentsModalProps = {
  flag: boolean;
  width?: number;
  height?: number | string;
  children: React.ReactNode;
  className?: string;
  back?: () => void;
  onClose: () => void;
};

const ContentsModal = ({
  flag,
  width = 650,
  height = 600,
  className = "",
  children,
  back,
  onClose,
}: ContentsModalProps) => {
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
    if (flag) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = original;
    };
  }, [flag]);
  return (
    flag && (
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/20 z-50`}
        onClick={() => onClose()}
      >
        <div
          style={{ width, height }}
          className={`w-[92vw] max-w-[650px] max-h-[90vh] bg-white rounded-xl p-5 sm:p-6 shadow-lg overflow-y-auto ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`w-full flex items-center mb-3 ${back ? "justify-between" : "justify-end"}`}
          >
            {back && (
              <button className="w-6" type="button" onClick={() => back()}>
                <img src={backspace} alt="뒤로가기" />
              </button>
            )}

            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center"
              onClick={() => onClose()}
            >
              <img src={closeBtn} alt="닫기" />
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default ContentsModal;
