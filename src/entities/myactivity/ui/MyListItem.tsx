const MyListItem = ({ subTab }: any) => {
  return (
    <div className="divide-y divide-gray-50 md:w-full">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="p-6 hover:bg-gray-50 transition-colors flex justify-between items-center group"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {/* <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded uppercase">
                  {subTab === "post" ? "MY" : "LIKE"}
                </span> */}
              <h3 className="text-base font-semibold text-gray-900 truncategroup-hover:text-[#F4A261] transition-colors cursor-pointer">
                {subTab === "post"
                  ? `내가 작성한 ${item}번째 소중한 게시글 제목`
                  : `관심 등록한 ${item}번째 게시글 제목`}
              </h3>
            </div>
            <p className="text-sm text-gray-400 truncate pl-10">
              2026.03.17 · 조회 124 · 댓글 5
            </p>
          </div>

          {/* 더보기 버튼 (수정/삭제 등) */}
          <button className="ml-4 p-2 text-gray-300 hover:text-[#F4A261] hover:bg-white rounded-full transition-all">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyListItem;
