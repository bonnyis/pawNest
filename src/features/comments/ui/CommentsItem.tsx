import { useState } from "react";
import more from "@img/icons/more_vert.png";

const CommentsItem = ({ list }: any) => {
  console.log(list);
  const [moreFlag, updateMoreFlag] = useState<boolean>(false);

  const commentMore = () => {
    updateMoreFlag(!moreFlag);
  };

  return (
    <div className="border-t-2">
      <ul className="list-none p-3">
        <li className="">
          <div className="flex justify-between relative">
            <div className="grid gap-2">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold mr-10">{list?.writeId}</h3>
                <span className="text-base text-gray-500">
                  {list?.createdAt}
                </span>
              </div>
              <p className="">{list?.content}</p>
            </div>
            {list && Boolean(list?.mine) ? (
              <button type="button" className="" onClick={() => commentMore()}>
                <img src={more} alt="더보기" />
              </button>
            ) : null}
          </div>
          {moreFlag && (
            <>
              <div
                className="fixed inset-0 z-10 bg-black/0"
                onClick={() => updateMoreFlag(false)}
              />
              <div className="absolute right-[2%] z-10">
                <div className="flex flex-col border border-gray-+200 w-20 text-center rounded-md  shadow-lg bg-white">
                  <div className="p-3  border-gray-200 border-b">
                    <button type="button">수정 </button>
                  </div>
                  <div className="p-3">
                    <button type="button">삭제</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default CommentsItem;
