import { useMissingBoardControl } from "../model/useMissingBoardControl";
import MissingForm from "@/entities/missing-form/ui/MissingForm";
import type { MissingBoardInputRequest } from "@/entities/missing-form/model/missingform.type";
const MissingInsertForm = () => {
  const { useAddMissingBoard } = useMissingBoardControl();
  const { mutate } = useAddMissingBoard();

  const handleSubmit = (request: MissingBoardInputRequest, files: File[]) => {
    mutate({ params: request, files });
  };

  return <MissingForm onSubmit={handleSubmit} />;
};

export default MissingInsertForm;
