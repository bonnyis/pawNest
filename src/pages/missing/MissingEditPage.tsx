import {} from "react";
import MissingEditForm from "@/features/missing-form/ui/MissingEditForm";

const MissingInsertPage = () => {
  return (
    <section className="max-w-[1480px] mx-auto">
      <div className="mt-4 p-5">
        <div className="flex items-center justify-items-center gap-2 mb-3">
          <span className="w-3 h-3 bg-black inline-block rounded-[50%]"></span>
          <h2 className="text-xl font-semibold inline">
            실종 동물 관련 정보 수정
          </h2>
        </div>

        <MissingEditForm />
      </div>
    </section>
  );
};

export default MissingInsertPage;
