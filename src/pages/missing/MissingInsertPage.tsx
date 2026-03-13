import {} from "react";
import MissingInsertForm from "@/features/missing-insert/ui/MissingInsertForm";
const MissingInsertPage = () => {
  return (
    <section className="max-w-[1480px] mx-auto">
      <div className="mt-4 ">
        <div className="flex items-center justify-items-center gap-2">
          <span className="w-3 h-3 bg-black inline-block rounded-[50%]"></span>
          <h2 className="text-xl font-semibold inline">실종 동물 관련 정보</h2>
        </div>
        <div className="">
          <MissingInsertForm />
        </div>
      </div>
    </section>
  );
};

export default MissingInsertPage;
