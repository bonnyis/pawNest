import {} from "react";
import Modal from "../modal/Modal";
import { useAppStore } from "@/app/store/appStore";
import Button from "./Button";
const Confirm = () => {
  const { isConfirm, updateIsConfirmOpen } = useAppStore();
  const { flag, message, callback } = isConfirm;
  const close = () => {
    updateIsConfirmOpen({
      flag: false,
    });
  };
  const callbackEvt = async () => {
    if (callback) {
      await callback();
    }
    await close();
  };
  return (
    flag && (
      <Modal className="" onClose={close}>
        <h2 className="text-2xl text-center font-bold mb-5">확인</h2>
        <p
          className="text-center text-xl mb-5"
          dangerouslySetInnerHTML={{ __html: message ?? "" }}
        ></p>
        <div className="flex justify-center items-center mb-3 gap-3 ">
          <Button variant={"cancel"} onClick={() => close()} size="md">
            취소
          </Button>

          <Button
            variant="confirm"
            size="md"
            onClick={() => {
              callback ? callbackEvt() : null;
            }}
          >
            확인
          </Button>
        </div>
      </Modal>
    )
  );
};

export default Confirm;
