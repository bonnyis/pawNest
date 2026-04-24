import { useMissingBoardControl } from "../model/useMissingBoardControl";
import MissingForm from "@/entities/missing-form/ui/MissingForm";
import type { MissingBoardInputRequest } from "@/entities/missing-form/model/missingform.type";

// TODO: 게시글 등록 시 Invalid CORS Error 발생하여 로컬 테스트 불가
const MissingInsertForm = () => {
  const { useAddMissingBoard } = useMissingBoardControl();
  const { mutate } = useAddMissingBoard();

  const handleSubmit = (request: MissingBoardInputRequest, files: File[]) => {
    mutate({ params: request, files });
  };

  return <MissingForm onSubmit={handleSubmit} />;
};

export default MissingInsertForm;
