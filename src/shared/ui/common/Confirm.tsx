import {} from "react";
import Modal from "../modal/Modal";
import { useAppStore } from "@/app/store/appStore";

type ConfirmProps = {
  message: string;
  okCallback: () => void;
};
const Confirm = ({ message, okCallback }: ConfirmProps) => {
  const { isConfirm, updateIsConfirmOpen } = useAppStore();
  const close = () => {
    updateIsConfirmOpen(false);
  };
  return (
    isConfirm && (
      <Modal className="" onClose={close}>
        <p className="text-center text-xl">{message}</p>
        <div className="flex justify-center items-center my-3">
          <p className="border p-2 rounded-lg border-gray-300 bg-gray-400">
            <button type="button" className="" onClick={() => close()}>
              취소
            </button>
          </p>
          <p className="border p-2 rounded-lg border-green-100 bg-green-200">
            <button type="button" className="" onClick={() => okCallback()}>
              확인
            </button>
          </p>
        </div>
      </Modal>
    )
  );
};

export default Confirm;
