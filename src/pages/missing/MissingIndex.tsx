import MissingBoard from "@/features/missing-list/ui/MissingBoard";
import MissingDetailModal from "@/features/missing-detail/ui/MissingDetailModal";
const MissingIndex = () => {
  return (
    <section className="max-w-[1480px] mx-auto">
      <MissingBoard />
      {/* 상세 */}
      <MissingDetailModal />
    </section>
  );
};

export default MissingIndex;
