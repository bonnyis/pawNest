import {} from "react";
import Button from "@/shared/ui/common/Button";

const LeaveMembership = () => {
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-blue-100 border border-blue-100 py-5">
        <h1 className="text-2xl font-bold text-center mb-3">
          ⚠️ 탈퇴 시 유의사항 ⚠️
        </h1>
        <p className="text-center px-2">
          탈퇴 시 계정은 복구할 수 없으며, 작성하신 게시글 및 활동은 모두
          삭제됩니다.
        </p>
      </div>
      <div className="p-7 mt-5">
        <div className="text-lg">
          <p
            className="leading-loose cursor-pointer"
            onClick={() => {
              document.getElementById("endOk")?.click();
            }}
          >
            <input type="checkbox" name="endOk" id="endOk" />
            <span className="ml-2">
              진행중인 보호활동이 종료됨을 확인했습니다.
            </span>
          </p>
          <p
            className="leading-loose cursor-pointer"
            onClick={() => {
              document.getElementById("noRecovey")?.click();
            }}
          >
            <input type="checkbox" name="noRecovey" id="noRecovey" />
            <span className="ml-2">탈퇴 후 복구 불가함을 이해했습니다.</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <Button variant="primary" size="md">
          탈퇴하기
        </Button>
      </div>
    </div>
  );
};

export default LeaveMembership;
