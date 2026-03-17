import React, { useEffect, useState } from "react";
import MyActivity from "@/features/mypage/ui/MyActivity";
import LeaveMembership from "@/features/mypage/ui/LeaveMembership";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
const MypageIndex = () => {
  const navigation = useNavigate();
  const [searchParams, setSarchParams] = useSearchParams();
  const { pathname } = useLocation();
  const tab = searchParams.get("tab") ?? "activity";
  const [activeTab, setActiveTab] = useState(tab);

  const tabs = [
    { id: "activity", label: "내 활동" },
    { id: "leave", label: "회원탈퇴" },
  ];
  const goTab = (val: string) => {
    setSarchParams(`tab=${val}`);
    setActiveTab(val);
  };

  return (
    <section className="max-w-[1200px] mx-auto pt-10 px-4 md:px-6">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">마이페이지</h2>

        {/* 상단 가로 탭 네비게이션 */}
        <nav className="flex gap-8 border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => goTab(tab.id)}
              className={`pb-4 text-lg font-medium transition-all relative
                ${
                  activeTab === tab.id
                    ? "text-[#F4A261]"
                    : "text-gray-400 hover:text-[#A6A57A]"
                }`}
            >
              {tab.label}
              {/* 활성화 표시 언더라인 */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F4A261] rounded-full" />
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* 탭 내용 분기 처리 */}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* 서브 탭 및 필터 영역 */}
        <div className="p-6 border-b border-gray-50 flex flex-col w-full justify-between items-center gap-6">
          {tab === "activity" && <MyActivity />}
          {tab === "leave" && <LeaveMembership />}
        </div>
      </div>
    </section>
  );
};

export default MypageIndex;
