import {} from "react";
import Modal from "../modal/Modal";
import { useAppStore } from "@/app/store/appStore";
import Button from "./Button";
const Alert = () => {
  const { isAlert, updateIsAlertOpen } = useAppStore();
  const { message, flag } = isAlert;
  const closeAlert = () => {
    updateIsAlertOpen({
      flag: false,
      message: null,
    });
  };
  return (
    flag && (
      <Modal className="" onClose={closeAlert}>
        <h2 className="text-center text-2xl font-bold mb-3">알림</h2>
        <p
          className="text-center text-lg mb-3"
          dangerouslySetInnerHTML={{ __html: message ?? "" }}
        ></p>
        <div className="flex justify-center items-center my-3">
          <p className="">
            <Button variant="confirm" size="md" onClick={() => closeAlert()}>
              확인
            </Button>
          </p>
        </div>
      </Modal>
    )
  );
};

export default Alert;
