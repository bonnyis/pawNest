import share from "@img/icons/share.png";
import { handleShare } from "@/features/share-post/model/webShare";
import type { ShareProps } from "../model/sharePost.type";

const SharePostBtn = ({ title, text, url }: ShareProps) => {
  return (
    <button
      type="button"
      className="ml-2"
      onClick={() => {
        console.log("!");
        handleShare({
          title,
          text,
          url,
        });
      }}
    >
      <img src={share} alt="공유하기" />
    </button>
  );
};

export default SharePostBtn;
