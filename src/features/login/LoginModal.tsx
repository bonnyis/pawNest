import ContentsModal from "@/shared/ui/modal/ContentsModal";
// import React, { useState } from "react";
import logoImg from "@img/LoginMainHomeLogo.png";
import kakao from "@img/kakao_login_medium_wide.png";
interface LoginModalProps {
  loginModal: boolean;
  setLoginModal: (val: boolean) => void;
}

const LoginModal = ({ loginModal, setLoginModal }: LoginModalProps) => {
  const close = () => {
    setLoginModal(false);
  };
  return (
    <ContentsModal flag={loginModal} onClose={close} height={300}>
      <div className="flex flex-col items-center gap-5 px-4 w-full mt-3">
        <img src={logoImg} alt="pawNest 대표 이미지" className="" />

        <div className="text-center">
          <h2 className="text-lg font-semibold">간편 로그인</h2>
          <p className="text-sm text-gray-500 mt-1 leading-loose">
            자주 사용하는 아이디로 간편하게 이용하실 수 있습니다.
          </p>
        </div>

        <button type="button">
          <img src={kakao} alt="카카오 간편 로그인" className="mx-auto" />
        </button>

        {/* <div className="flex justify-center gap-2 text-sm text-gray-500">
                  <span>아직 계정이 없으신가요?</span>
                  
          <span className="underline cursor-pointer hover:text-black">
            회원가입
          </span>
        </div> */}
      </div>
    </ContentsModal>
  );
};

export default LoginModal;
