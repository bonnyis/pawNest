import { useState } from "react";
import type { MyPostsContent } from "@/entities/myactivity/model/myActivity.type";
import { useControlComments } from "@/features/comments/model/useControlComment";
import { useAppStore } from "@/app/store/appStore";
import { useNavigate } from "react-router-dom";
interface MyListItemProps {
  subTab?: string;
  list: MyPostsContent | undefined;
}
// TODO: 마이페이지에서 더보기 클릭 시 해당 댓글이 포함된 게시글로 이동하는 기능 추가 (현재는 게시글민 이동가능)

const MyListItem = ({ subTab, list }: MyListItemProps) => {
  const navigate = useNavigate();
  const { updateIsConfirmOpen } = useAppStore();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { useDeleteComment } = useControlComments();
  const delteComment = useDeleteComment();
  const handleDelete = (id: number) => {
    delteComment.mutate(id, {
      onSuccess: () => {
        setIsMoreOpen(false);
      },
    });
  };
  const goDetail = (id: number) => {
    navigate(`/missing?id=${id}`);
  };
  const commentMore = () => {
    setIsMoreOpen(!isMoreOpen);
  };

  return (
    <div className="divide-y divide-gray-50 w-full">
      {list && (
        <div className="p-6 hover:bg-gray-50 transition-colors flex justify-between items-center group">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {/* <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded uppercase">
                  {subTab === "post" ? "MY" : "LIKE"}
                </span> */}
              <h3 className="text-base font-semibold text-gray-900 truncategroup-hover:text-[#F4A261] transition-colors cursor-pointer">
                {list.title}
              </h3>
            </div>
            <p className="text-sm text-gray-400 truncate ">
              2026.03.17 · 조회 124 · 댓글 5
            </p>
          </div>

          {/* 더보기 버튼 (수정/삭제 등) */}
          <button
            className="ml-4 p-2 text-gray-300 hover:text-[#F4A261] hover:bg-white rounded-full transition-all"
            onClick={() => commentMore()}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          {isMoreOpen && (
            <div className="relative" onClick={() => setIsMoreOpen(false)}>
              <div className="fixed inset-0 z-10 bg-black/0" />
              <div className="absolute top-[10px] right-[10px] z-10">
                <div className="flex flex-col border border-gray-+200 w-20 text-center rounded-md  shadow-lg bg-white">
                  <div className="p-3">
                    {subTab === "post" ? (
                      <button
                        type="button"
                        onClick={() => {
                          updateIsConfirmOpen({
                            flag: true,
                            message: "댓글을 삭제하시겠습니까?",
                            callback: () => handleDelete(list.boardId),
                          });
                        }}
                      >
                        삭제
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          goDetail(list.boardId);
                        }}
                      >
                        더보기
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyListItem;
