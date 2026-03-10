import {} from "react";
import Modal from "../modal/Modal";
import { useAppStore } from "@/app/store/appStore";
const Alert = () => {
  const { isAlert, updateIsAlertOpen } = useAppStore();
  const close = () => {
    updateIsAlertOpen(false);
  };
  return (
    isAlert && (
      <Modal className="" onClose={close}>
        <p className="text-center text-xl">확인되었습니다.</p>
        <div className="flex justify-center items-center my-3">
          <p className="border p-2 rounded-lg border-green-100 bg-green-200">
            <button type="button" className="">
              확인
            </button>
          </p>
        </div>
      </Modal>
    )
  );
};

export default Alert;
