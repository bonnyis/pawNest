import {} from "react";

interface Props {
  className?: string;
  message?: string;
}
const NoData = ({ message, className }: Props) => {
  return (
    <div className={`w-auto flex justify-center items-center ${className}`}>
      <p className="text-center min-h-60 text-gray-500 font-lg">
        {message ?? "조회되는 게시글이 없습니다."}
      </p>
    </div>
  );
};

export default NoData;
