import {} from "react";

interface Props {
  className?: string;
  message?: string;
}
const NoData = ({ message, className }: Props) => {
  return (
    <div
      className={`w-auto flex items-center justify-center min-h-40 ${className}`}
    >
      <p className="text-center text-gray-500 text-xl">
        {message ?? "조회되는 게시글이 없습니다."}
      </p>
    </div>
  );
};

export default NoData;
