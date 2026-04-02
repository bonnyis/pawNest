import like from "@img/icons/star.png";
import like_fill from "@img/icons/star_fill.png";
import { useFavoriteToggle } from "../model/useFavoriteToggle";
import { useMissingDetailStore } from "@/app/store/missingDetailStore";
import { useAuthStore } from "@/app/store/authStore";
import { useAppStore } from "@/app/store/appStore";
const FavoriteBtn = ({ liked }: { liked: boolean }) => {
  const { detailBoardId } = useMissingDetailStore();
  const { isLogin } = useAuthStore();
  const { updateIsAlertOpen } = useAppStore();
  const { mutate } = useFavoriteToggle();
  const handleLike = () => {
    if (isLogin) {
      mutate(Number(detailBoardId));
    } else
      return updateIsAlertOpen({
        flag: true,
        message: "로그인 후 이용가능합니다.",
      });
  };

  return (
    <button
      type="button"
      className=""
      onClick={() => {
        handleLike();
      }}
    >
      {!liked ? (
        <img src={like} alt="관심글 저장하기" />
      ) : (
        <img src={like_fill} alt="관심글 저장 취소하기" />
      )}
    </button>
  );
};

export default FavoriteBtn;
