import { useRef, useState } from "react";
import more from "@img/icons/more_vert.png";
import type { CommentListItem } from "../../../entities/comments/model/comment.type";
import { useControlComments } from "../model/useControlComment";
import Button from "@/shared/ui/common/Button";
import { useAppStore } from "@/app/store/appStore";

const CommentsItem = ({ list }: CommentListItem | any) => {
  const { updateIsConfirmOpen } = useAppStore();
  const [moreFlag, updateMoreFlag] = useState<boolean>(false);
  const [isModify, updateModify] = useState<boolean>(false);
  const modifyCommentRef = useRef<HTMLInputElement | null>(null);
  const { useDeleteComment, useModifyComment } = useControlComments();
  const deleteComment = useDeleteComment();
  const { mutate, isPending } = useModifyComment();
  const commentMore = () => {
    updateMoreFlag(!moreFlag);
  };
  const handleModify = (id: number) => {
    const content = modifyCommentRef.current?.value ?? list.content;
    mutate({ commentId: id, content });
  };
  const handleDelete = (id: number) => {
    deleteComment.mutate(id);
  };
  return (
    <div className="border-t-2">
      <ul className="list-none p-3">
        <li className="">
          <div className="flex justify-between ">
            <div className="grid gap-2">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold mr-10">{list?.userId}</h3>
                <span className="text-base text-gray-500">
                  {list?.createdAt}
                </span>
              </div>

              {isModify && !isPending ? (
                <p className="flex justify-evenly">
                  <input
                    type="text"
                    name="modifyComment"
                    id="modifyComment"
                    ref={modifyCommentRef}
                    defaultValue={list.content}
                    className="border rounded-md pl-3 w-4/5"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleModify(list.commentId)}
                  >
                    수정
                  </Button>
                </p>
              ) : (
                <p>{list?.content}</p>
              )}
            </div>
            {list && Boolean(list?.mine) ? (
              <button type="button" className="" onClick={() => commentMore()}>
                <img src={more} alt="더보기" />
              </button>
            ) : null}
          </div>
          {moreFlag && (
            <div className="relative">
              <div
                className="fixed inset-0 z-10 bg-black/0"
                onClick={() => updateMoreFlag(false)}
              />
              <div className="absolute top-0 right-[2%] z-10">
                <div className="flex flex-col border border-gray-+200 w-20 text-center rounded-md  shadow-lg bg-white">
                  <div
                    className="p-3  border-gray-200 border-b"
                    onClick={() => handleModify}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        updateModify(true);
                        updateMoreFlag(false);
                      }}
                    >
                      수정{" "}
                    </button>
                  </div>
                  <div
                    className="p-3"
                    onClick={() => {
                      updateIsConfirmOpen({
                        flag: true,
                        message: "삭제하시겠습니까?",
                        callback: () => handleDelete(list.commentId),
                      });
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        updateIsConfirmOpen({
                          flag: true,
                          message: "삭제하시겠습니까?",
                          callback: () => handleDelete(list.commentId),
                        });
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default CommentsItem;
