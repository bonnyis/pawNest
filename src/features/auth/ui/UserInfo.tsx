import {} from "react";
import { useAuthStore } from "@/app/store/authStore";

interface UserInfoProps {
  setIsLoginModal: (val: boolean) => void;
}

const UserInfo = ({ setIsLoginModal }: UserInfoProps) => {
  const { isLogin, userId } = useAuthStore();
  return (
    <div className="p-5 border-b bg-gray-50">
      {isLogin ? (
        <div className="space-y-3">
          <span className="text-lg font-medium inline mr-2">안녕하세요</span>
          <span className="text-gray-700 text-lg font-medium ">
            <span className="py-1 font-bold text-lg">{userId}</span>
            <span className="text-lg font-medium"> 님!</span>
          </span>

          <a
            href="https://unbribably-unhilly-danyell.ngrok-free.dev/logout"
            target="_self"
            title="pawNest 로그아웃"
            className="block w-full text-center py-2 rounded-md bg-oliveGr text-white"
          >
            로그아웃
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-gray-700 text-lg font-medium">로그인 해주세요</p>
          <button
            type="button"
            onClick={() => {
              setIsLoginModal(true);
            }}
            className="block w-full text-center py-2 rounded-md bg-oliveGr text-white"
          >
            로그인
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
