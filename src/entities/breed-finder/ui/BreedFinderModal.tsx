import { useEffect, useState } from "react";
import ContentsModal from "@/shared/ui/modal/ContentsModal";
import BreedFinderMain from "../../../features/breed-finder/ui/BreedFinderMain";
import BreedFinderResult from "../../../features/breed-finder/ui/BreedFinderResult";
import type { BreedFinderMainProps } from "../model/breed-finder.type";
import { useBreedFinderStore } from "@/app/store/breedFinderStore";
const BreedFinderModal = () => {
  const { modalFlag, updateModalFlag, updateBreedFinderImg } =
    useBreedFinderStore();

  const [contentsType, setContentsType] =
    useState<BreedFinderMainProps["contentsType"]>("main");

  const close = () => {
    updateModalFlag(false);
  };
  const updateType = (val: BreedFinderMainProps["contentsType"]) => {
    setContentsType(val);
  };
  const backSpace = () => {
    setContentsType("main");
    updateBreedFinderImg(null);
  };
  useEffect(() => {
    //  모달창 닫힐 경우 데이터 초기화
    if (modalFlag === false) {
      setContentsType("main");
    }
  }, [modalFlag]);

  return (
    <ContentsModal
      flag={modalFlag}
      onClose={close}
      back={contentsType === "result" ? backSpace : undefined}
    >
      {contentsType === "main" && (
        <BreedFinderMain
          contentsType={contentsType}
          updateContentsType={updateType}
        />
      )}
      {contentsType === "result" && (
        <BreedFinderResult
          contentsType={contentsType}
          updateContentsType={updateType}
        />
      )}
    </ContentsModal>
  );
};

export default BreedFinderModal;
