import {} from "react";
import more from "@img/icons/more_vert.png";

const MissingDetailCommentsItem = () => {
  return (
    <div className="border-t-2 ">
      <ul className="list-none p-3">
        <li className="">
          <div className="flex justify-between ">
            <div className="grid gap-2">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold mr-10">작성자명</h3>
                <span className="text-base text-gray-500">
                  2026.01.01 13:59
                </span>
              </div>
              <p className="">댓글댓글댓글댓글</p>
            </div>

            <button type="button" className="">
              <img src={more} alt="더보기" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MissingDetailCommentsItem;
