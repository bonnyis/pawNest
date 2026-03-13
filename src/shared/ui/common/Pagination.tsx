import {} from "react";
interface PaginationProps {
  currentPage: number;
  totalPage: number;
  pageSize?: number;
  onPageChange: (num: number) => void;
}
const Pagination = ({
  currentPage = 1,
  totalPage = 1,
  pageSize = 10,
  onPageChange,
}: PaginationProps) => {
  // 페이지 번호 배열 생성 (예: [1, 2, 3, 4, 5])
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 my-10">
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-md disabled:opacity-30 hover:bg-gray-50 transition-colors"
      >
        &lt;
      </button>

      {/* 페이지 번호 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-md border transition-all
            ${
              currentPage === page
                ? "bg-primary text-orgColor border-primary font-bold"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
            }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(Math.min(totalPage, currentPage + 1))}
        disabled={currentPage === totalPage}
        className="px-3 py-1 border rounded-md disabled:opacity-30 hover:bg-gray-50 transition-colors"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
