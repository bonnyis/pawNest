import MissingForm from "@/entities/missing-form/ui/MissingForm";
import type { MissingBoardInputRequest } from "@/entities/missing-form/model/missingform.type";
import { useMissingBoardControl } from "../model/useMissingBoardControl";
import { useParams } from "react-router-dom";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";
import { useMissingDetail } from "@/features/missing-detail/model/useMissingDetail";

const MissingEditForm = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { data, isLoading } = useMissingDetail({
    boardId: String(boardId),
    enabled: boardId ? true : false,
  });
  const { useEditMissingBoard } = useMissingBoardControl();

  const { mutate } = useEditMissingBoard(String(boardId));
  const initalData: MissingBoardInputRequest | null = data
    ? {
        breed1: data.breed1,
        breed2: data.breed2,
        gender: data.gender,
        age: data.age,
        color: data.color,
        features: data.features,
        missingDate: new Date(data.missingDate),
        missingLocation: data.missingLocation,
        images: data.images ?? [],
      }
    : null;
  const onSubmit = (request: MissingBoardInputRequest, file: File[]) => {
    mutate({ boardId: String(boardId), params: request, files: file });
  };
  if (isLoading) return <LoadingSpinner />;
  return (
    <MissingForm onSubmit={onSubmit} isEdit={true} initialData={initalData} />
  );
};

export default MissingEditForm;
