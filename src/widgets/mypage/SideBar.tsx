import React from "react";

const SideBar = () => {
  return (
    <div className="w-[200px] ">
      <div className="p-3 border-e rounded-e-xl">
        <h2 className="text-xl font-semibold ">마이페이지</h2>
        <div className="min-h-[600px]">
          <ul className="text-base">
            <li className="">내 활동</li>
            <li className="">회원탈퇴</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
