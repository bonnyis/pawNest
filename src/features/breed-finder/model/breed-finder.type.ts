export interface BreedFinderMainProps {
  contentsType: "main" | "result";
  updateContentsType: (val: BreedFinderMainProps["contentsType"]) => void;
}
